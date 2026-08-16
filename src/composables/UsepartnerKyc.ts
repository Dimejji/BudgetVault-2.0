import { ref, computed } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export interface KYCSubmission {
  id: string
  partner_id: string
  submission_number: number
  legal_business_name: string
  business_registration_number: string
  tax_identification_number: string
  business_address: string
  director_full_name: string
  director_id_type: 'nin' | 'passport' | 'drivers_license' | 'voters_card'
  director_id_number: string
  director_bvn: string
  status: 'submitted' | 'under_review' | 'approved' | 'rejected'
  rejection_reason: string | null
  reviewed_by: string | null
  reviewed_at: string | null
  created_at: string
}

export interface KYCDocument {
  id: string
  kyc_submission_id: string
  document_type: 'cac_certificate' | 'valid_id' | 'proof_of_address' | 'bank_statement' | 'tax_clearance' | 'memorandum_of_association' | 'other'
  storage_path: string
  file_name: string
  mime_type: string
  uploaded_at: string
  verified: boolean
  verified_by: string | null
  verified_at: string | null
}

export interface BankAccount {
  id: string
  partner_id: string
  bank_name: string
  bank_code: string
  account_number: string
  account_name: string
  is_verified: boolean
  verification_method: 'name_enquiry' | 'manual' | null
  verified_at: string | null
  is_active: boolean
  created_at: string
}

export interface KYCFormData {
  legal_business_name: string
  business_registration_number: string
  tax_identification_number: string
  business_address: string
  director_full_name: string
  director_id_type: 'nin' | 'passport' | 'drivers_license' | 'voters_card'
  director_id_number: string
  director_bvn: string
}

export interface BankAccountData {
  bank_name: string
  bank_code: string
  account_number: string
  account_name: string
}

export function usePartnerKYC(partnerId: string) {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  // Fetch current KYC status
  const fetchKYCStatus = async () => {
    loading.value = true
    error.value = null

    try {
      const { data: partner, error: partnerError } = await supabase
        .from('partners')
        .select('kyc_status, kyc_approved_at')
        .eq('id', partnerId)
        .single()

      if (partnerError) throw partnerError

      return partner
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch KYC status'
      return null
    } finally {
      loading.value = false
    }
  }

  // Fetch current submission
  const fetchCurrentSubmission = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await supabase
        .from('partner_kyc_submissions')
        .select('*')
        .eq('partner_id', partnerId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (queryError && queryError.code !== 'PGRST116') throw queryError

      return data as KYCSubmission | null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch submission'
      return null
    } finally {
      loading.value = false
    }
  }

  // Fetch KYC documents
  const fetchKYCDocuments = async (submissionId: string) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await supabase
        .from('partner_kyc_documents')
        .select('*')
        .eq('kyc_submission_id', submissionId)
        .order('uploaded_at', { ascending: false })

      if (queryError) throw queryError

      return (data || []) as KYCDocument[]
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch documents'
      return []
    } finally {
      loading.value = false
    }
  }

  // Fetch bank accounts
  const fetchBankAccounts = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await supabase
        .from('partner_bank_accounts')
        .select('*')
        .eq('partner_id', partnerId)
        .order('created_at', { ascending: false })

      if (queryError) throw queryError

      return (data || []) as BankAccount[]
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch bank accounts'
      return []
    } finally {
      loading.value = false
    }
  }

  // Create or update KYC submission
  const submitKYCForm = async (formData: KYCFormData) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      // Get next submission number
      const { data: lastSubmission } = await supabase
        .from('partner_kyc_submissions')
        .select('submission_number')
        .eq('partner_id', partnerId)
        .order('submission_number', { ascending: false })
        .limit(1)
        .single()

      const nextSubmissionNumber = (lastSubmission?.submission_number || 0) + 1

      // Insert new submission
      const { data, error: insertError } = await supabase
        .from('partner_kyc_submissions')
        .insert([
          {
            partner_id: partnerId,
            submission_number: nextSubmissionNumber,
            ...formData,
            status: 'submitted',
          },
        ])
        .select()
        .single()

      if (insertError) throw insertError

      // Update partner KYC status to submitted
      const { error: updateError } = await supabase
        .from('partners')
        .update({ kyc_status: 'submitted' })
        .eq('id', partnerId)

      if (updateError) throw updateError

      success.value = true
      return data as KYCSubmission
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to submit KYC form'
      return null
    } finally {
      loading.value = false
    }
  }

  // Upload KYC document
  const uploadKYCDocument = async (
    submissionId: string,
    file: File,
    documentType: KYCDocument['document_type']
  ) => {
    loading.value = true
    error.value = null

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${partnerId}/${submissionId}/${documentType}-${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('kyc-documents')
        .upload(fileName, file, { upsert: false })

      if (uploadError) throw uploadError

      // Create document record
      const { data, error: insertError } = await supabase
        .from('partner_kyc_documents')
        .insert([
          {
            kyc_submission_id: submissionId,
            document_type: documentType,
            storage_path: uploadData.path,
            file_name: file.name,
            mime_type: file.type,
          },
        ])
        .select()
        .single()

      if (insertError) throw insertError

      success.value = true
      return data as KYCDocument
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to upload document'
      return null
    } finally {
      loading.value = false
    }
  }

  // Delete KYC document
  const deleteKYCDocument = async (documentId: string, storagePath: string) => {
    loading.value = true
    error.value = null

    try {
      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from('kyc-documents')
        .remove([storagePath])

      if (deleteError) throw deleteError

      // Delete record
      const { error: dbError } = await supabase
        .from('partner_kyc_documents')
        .delete()
        .eq('id', documentId)

      if (dbError) throw dbError

      success.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete document'
    } finally {
      loading.value = false
    }
  }

  // Add bank account
  const addBankAccount = async (accountData: BankAccountData) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const { data, error: insertError } = await supabase
        .from('partner_bank_accounts')
        .insert([
          {
            partner_id: partnerId,
            ...accountData,
            is_verified: false,
            is_active: true,
          },
        ])
        .select()
        .single()

      if (insertError) throw insertError

      success.value = true
      return data as BankAccount
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add bank account'
      return null
    } finally {
      loading.value = false
    }
  }

  // Verify bank account (via name enquiry)
  const verifyBankAccount = async (accountId: string) => {
    loading.value = true
    error.value = null

    try {
      // In production, you'd call a bank verification API here
      // For now, we'll mark as manually verified
      const { error: updateError } = await supabase
        .from('partner_bank_accounts')
        .update({
          is_verified: true,
          verification_method: 'manual',
          verified_at: new Date().toISOString(),
        })
        .eq('id', accountId)

      if (updateError) throw updateError

      success.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to verify bank account'
    } finally {
      loading.value = false
    }
  }

  // Delete bank account
  const deleteBankAccount = async (accountId: string) => {
    loading.value = true
    error.value = null

    try {
      const { error: deleteError } = await supabase
        .from('partner_bank_accounts')
        .delete()
        .eq('id', accountId)

      if (deleteError) throw deleteError

      success.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete bank account'
    } finally {
      loading.value = false
    }
  }

  // Check KYC completion status
  const getKYCCompletionStatus = async () => {
    try {
      const submission = await fetchCurrentSubmission()
      if (!submission) return { isComplete: false, hasSubmission: false }

      const documents = await fetchKYCDocuments(submission.id)
      const bankAccounts = await fetchBankAccounts()

      const requiredDocuments = [
        'cac_certificate',
        'valid_id',
        'proof_of_address',
        'bank_statement',
      ]
      const uploadedDocTypes = new Set(documents.map(d => d.document_type))
      const hasAllDocuments = requiredDocuments.every(doc => uploadedDocTypes.has(doc as any))

      const hasVerifiedBankAccount = bankAccounts.some(acc => acc.is_verified && acc.is_active)

      return {
        isComplete: hasAllDocuments && hasVerifiedBankAccount && submission.status === 'approved',
        hasSubmission: true,
        submission,
        documents,
        bankAccounts,
        documentProgress: {
          total: requiredDocuments.length,
          uploaded: requiredDocuments.filter(doc => uploadedDocTypes.has(doc as any)).length,
        },
        bankAccountProgress: {
          total: 1,
          verified: hasVerifiedBankAccount ? 1 : 0,
        },
      }
    } catch (err) {
      console.error('Error checking KYC completion:', err)
      return null
    }
  }

  return {
    loading,
    error,
    success,
    fetchKYCStatus,
    fetchCurrentSubmission,
    fetchKYCDocuments,
    fetchBankAccounts,
    submitKYCForm,
    uploadKYCDocument,
    deleteKYCDocument,
    addBankAccount,
    verifyBankAccount,
    deleteBankAccount,
    getKYCCompletionStatus,
  }
}