<template>
    <MainLayout>
         <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-8 md:py-12">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <div class="p-2 bg-blue-100 rounded-lg">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">KYC Verification</h1>
      </div>
      <p class="text-gray-600 ml-11">Complete your compliance profile to access API keys</p>
    </div>

    <!-- Main Content -->
    <div class="mx-auto">
      <!-- Status Alert -->
      <div v-if="kycStatus" class="mb-8">
        <KYCStatusCard :status="kycStatus" :approved-date="partner?.kyc_approved_at" />
      </div>

      <!-- Multi-step Form -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Steps Navigation -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-500 px-6 md:px-8 py-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StepIndicator
              v-for="(step, index) in steps"
              :key="step.id"
              :step="step"
              :index="index"
              :active="currentStep === index"
              :completed="index < currentStep || isStepComplete(index)"
            />
          </div>
        </div>

        <!-- Form Content -->
        <div class="p-6 md:p-8">
          <v-progress-linear
            v-if="loading"
            indeterminate
            color="primary"
            class="mb-6"
          />

          <!-- Error Message -->
          <v-alert
            v-if="error"
            type="error"
            class="mb-6"
            closable
            @click:close="error = null"
          >
            {{ error }}
          </v-alert>

          <!-- Success Message -->
          <v-alert
            v-if="success"
            type="success"
            class="mb-6"
            closable
            @click:close="success = false"
          >
            {{ successMessage }}
          </v-alert>

          <!-- Step Content -->
          <div v-if="!allStepsComplete">
            <!-- Step 1: Business Information -->
            <div v-if="currentStep === 0" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Business Information</h2>
                <p class="text-gray-600">Provide your business details</p>
              </div>

              <form @submit.prevent="submitBusinessInfo" class="space-y-5">
                <v-text-field
                  v-model="businessForm.legal_business_name"
                  label="Legal Business Name *"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                  class="rounded-lg"
                />

                <v-text-field
                  v-model="businessForm.business_registration_number"
                  label="Business Registration Number (CAC) *"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                />

                <v-text-field
                  v-model="businessForm.tax_identification_number"
                  label="Tax Identification Number (TIN) *"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                />

                <v-textarea
                  v-model="businessForm.business_address"
                  label="Business Address *"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                  rows="3"
                />

                <div class="flex gap-4 pt-4">
                  <v-btn
                    color="primary"
                    size="large"
                    type="submit"
                    :loading="loading"
                    class="flex-1"
                  >
                    Continue
                  </v-btn>
                </div>
              </form>
            </div>

            <!-- Step 2: Director Information -->
            <div v-if="currentStep === 1" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Director/Signatory Information</h2>
                <p class="text-gray-600">Details of the business director or authorized signatory</p>
              </div>

              <form @submit.prevent="submitDirectorInfo" class="space-y-5">
                <v-text-field
                  v-model="directorForm.director_full_name"
                  label="Full Name *"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                />

                <v-select
                  v-model="directorForm.director_id_type"
                  label="ID Type *"
                  :items="idTypes"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                />

                <v-text-field
                  v-model="directorForm.director_id_number"
                  label="ID Number *"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                />

                <v-text-field
                  v-model="directorForm.director_bvn"
                  label="Bank Verification Number (BVN) *"
                  :rules="[required, bvnLength]"
                  variant="outlined"
                  density="comfortable"
                  hint="11-digit BVN"
                />

                <div class="flex gap-4 pt-4">
                  <v-btn
                    variant="outlined"
                    size="large"
                    class="flex-1"
                    @click="currentStep--"
                  >
                    Back
                  </v-btn>
                  <v-btn
                    color="primary"
                    size="large"
                    type="submit"
                    :loading="loading"
                    class="flex-1"
                  >
                    Continue
                  </v-btn>
                </div>
              </form>
            </div>

            <!-- Step 3: Documents -->
            <div v-if="currentStep === 2" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Upload Documents</h2>
                <p class="text-gray-600">Upload required compliance documents</p>
              </div>

              <div class="space-y-6">
                <DocumentUploadField
                  v-for="docType in requiredDocuments"
                  :key="docType.id"
                  :document-type="docType"
                  :submission-id="currentSubmission?.id || ''"
                  :uploaded-docs="uploadedDocuments"
                  @upload="handleDocumentUpload"
                  @delete="handleDocumentDelete"
                />

                <div v-if="uploadedDocuments.length > 0" class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div class="flex items-center gap-2 text-blue-900 font-medium">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    {{ uploadedDocuments.length }} / {{ requiredDocuments.length }} documents uploaded
                  </div>
                </div>

                <div class="flex gap-4 pt-4">
                  <v-btn
                    variant="outlined"
                    size="large"
                    class="flex-1"
                    @click="currentStep--"
                  >
                    Back
                  </v-btn>
                  <v-btn
                    color="primary"
                    size="large"
                    class="flex-1"
                    @click="currentStep++"
                  >
                    Continue
                  </v-btn>
                </div>
              </div>
            </div>

            <!-- Step 4: Bank Account -->
            <div v-if="currentStep === 3" class="space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Bank Account Verification</h2>
                <p class="text-gray-600">Add your payout account for settlement</p>
              </div>

              <!-- Existing Bank Accounts -->
              <div v-if="bankAccounts.length > 0" class="space-y-4">
                <div class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Saved Accounts</div>
                <BankAccountCard
                  v-for="account in bankAccounts"
                  :key="account.id"
                  :account="account"
                  :loading="loading"
                  @verify="handleVerifyBank"
                  @delete="handleDeleteBank"
                />
              </div>

              <!-- Add New Bank Account -->
              <form @submit.prevent="submitBankAccount" class="space-y-5 pt-4 border-t">
                <div class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Add New Account</div>

                <v-text-field
                  v-model="bankForm.bank_name"
                  label="Bank Name *"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                />

                <v-text-field
                  v-model="bankForm.bank_code"
                  label="Bank Code (NIBSS) *"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                  hint="3-digit NIBSS code"
                />

                <v-text-field
                  v-model="bankForm.account_number"
                  label="Account Number *"
                  :rules="[required, accountNumberLength]"
                  variant="outlined"
                  density="comfortable"
                  hint="10-digit account number"
                />

                <v-text-field
                  v-model="bankForm.account_name"
                  label="Account Name *"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                />

                <div class="flex gap-4 pt-4">
                  <v-btn
                    variant="outlined"
                    size="large"
                    class="flex-1"
                    @click="currentStep--"
                  >
                    Back
                  </v-btn>
                  <v-btn
                    color="primary"
                    size="large"
                    type="submit"
                    :loading="loading"
                    class="flex-1"
                  >
                    Add Account
                  </v-btn>
                </div>
              </form>
            </div>
          </div>

          <!-- All Steps Complete -->
          <div v-if="allStepsComplete" class="text-center py-12">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">KYC Submission Complete!</h3>
            <p class="text-gray-600 mb-6">Your submission has been sent for review. We'll notify you when approved.</p>
            
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-8 text-left">
              <div class="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">What's Next</div>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <span class="text-blue-600">✓</span>
                  Submission sent for review (typically 24-48 hours)
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-blue-600">✓</span>
                  We'll verify your documents and information
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-blue-600">✓</span>
                  Once approved, you can generate API keys
                </li>
              </ul>
            </div>

            <v-btn
              color="primary"
              size="large"
              to="/dashboard"
              class="mb-4"
            >
              Back to Dashboard
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Help Section -->
      <div class="mt-8 bg-white rounded-xl shadow-md p-6 md:p-8">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="flex gap-3">
            <div class="text-2xl">📧</div>
            <div>
              <p class="font-semibold text-gray-900">Email Support</p>
              <p class="text-sm text-gray-600">support@quidly.com</p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="text-2xl">💬</div>
            <div>
              <p class="font-semibold text-gray-900">Live Chat</p>
              <p class="text-sm text-gray-600">Available 9am - 6pm WAT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </MainLayout>
 
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePartnerKYC } from '@/composables/UsepartnerKyc'
import Kycstatuscard from '@/components/Kycstatuscard.vue'
import StepIndicator from '@/components/Stepindicator.vue'
import Documentuploadfield from '@/components/Documentuploadfield.vue'
import Bankaccountcard from '@/components/Bankaccountcard.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)


// Get partner ID from user or route params
const partnerId = ref('')
const currentStep = ref(0)

const {
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
} = usePartnerKYC(partnerId.value)

// Form states
const businessForm = ref({
  legal_business_name: '',
  business_registration_number: '',
  tax_identification_number: '',
  business_address: '',
})

const directorForm = ref({
  director_full_name: '',
  director_id_type: 'nin' as const,
  director_id_number: '',
  director_bvn: '',
})

const bankForm = ref({
  bank_name: '',
  bank_code: '',
  account_number: '',
  account_name: '',
})

// Data
const kycStatus = ref<string | null>(null)
const partner = ref<any>(null)
const currentSubmission = ref<any>(null)
const uploadedDocuments = ref<any[]>([])
const bankAccounts = ref<any[]>([])
const successMessage = ref('')
const allStepsComplete = ref(false)

// UI Constants
const steps = [
  { id: 1, label: 'Business', icon: 'mdiBuilding' },
  { id: 2, label: 'Director', icon: 'mdiAccount' },
  { id: 3, label: 'Documents', icon: 'mdiFileDocument' },
  { id: 4, label: 'Bank', icon: 'mdiBank' },
]

const idTypes = [
  { title: 'National ID (NIN)', value: 'nin' },
  { title: 'Passport', value: 'passport' },
  { title: 'Driver\'s License', value: 'drivers_license' },
  { title: 'Voter\'s Card', value: 'voters_card' },
]

const requiredDocuments = [
  { id: 'cac_certificate', label: 'CAC Certificate', description: 'Corporate Affairs Commission certificate' },
  { id: 'valid_id', label: 'Valid ID', description: 'Passport, NIN, or Driver\'s License' },
  { id: 'proof_of_address', label: 'Proof of Address', description: 'Utility bill or bank statement' },
  { id: 'bank_statement', label: 'Bank Statement', description: 'Recent 3 months statement' },
]

// Validation rules
const required = (v: any) => !!v || 'This field is required'
const bvnLength = (v: string) => !v || v.length === 11 || 'BVN must be 11 digits'
const accountNumberLength = (v: string) => !v || v.length === 10 || 'Account number must be 10 digits'

// Methods
const isStepComplete = (index: number) => {
  if (index === 0) return currentSubmission.value?.legal_business_name
  if (index === 1) return currentSubmission.value?.director_full_name
  if (index === 2) return uploadedDocuments.value.length >= requiredDocuments.length
  if (index === 3) return bankAccounts.value.some((acc: any) => acc.is_verified)
  return false
}

const submitBusinessInfo = async () => {
     currentStep.value++
//   try {
//     const submission = await submitKYCForm({
//       ...businessForm.value,
//       director_full_name: '',
//       director_id_type: 'nin',
//       director_id_number: '',
//       director_bvn: '',
//     })

//     if (submission) {
//       currentSubmission.value = submission
//       successMessage.value = 'Business information saved'
     
//     }
//   } catch (err) {
//     console.error('Error submitting business info:', err)
//   }
}

const submitDirectorInfo = async () => {
     currentStep.value++
//   try {
//     if (!currentSubmission.value) return

//     // Update existing submission with director info
//     const { error: updateError } = await supabase
//       .from('partner_kyc_submissions')
//       .update({
//         director_full_name: directorForm.value.director_full_name,
//         director_id_type: directorForm.value.director_id_type,
//         director_id_number: directorForm.value.director_id_number,
//         director_bvn: directorForm.value.director_bvn,
//       })
//       .eq('id', currentSubmission.value.id)

//     if (updateError) throw updateError

//     successMessage.value = 'Director information saved'
//     currentStep.value++
//   } catch (err) {
//     error.value = err instanceof Error ? err.message : 'Failed to save director info'
//   }
}

const submitBankAccount = async () => {
    currentStep.value++
//   try {
//     const account = await addBankAccount(bankForm.value)
//     if (account) {
//       bankAccounts.value.push(account)
//       bankForm.value = {
//         bank_name: '',
//         bank_code: '',
//         account_number: '',
//         account_name: '',
//       }
//       successMessage.value = 'Bank account added'
//     }
//   } catch (err) {
//     console.error('Error adding bank account:', err)
//   }
}

const handleDocumentUpload = async (documentType: string, file: File) => {
  if (!currentSubmission.value) return

  const doc = await uploadKYCDocument(
    currentSubmission.value.id,
    file,
    documentType as any
  )

  if (doc) {
    uploadedDocuments.value.push(doc)
    successMessage.value = 'Document uploaded successfully'
  }
}

const handleDocumentDelete = async (documentId: string, storagePath: string) => {
  await deleteKYCDocument(documentId, storagePath)
  uploadedDocuments.value = uploadedDocuments.value.filter(d => d.id !== documentId)
}

const handleVerifyBank = async (accountId: string) => {
  await verifyBankAccount(accountId)
  const index = bankAccounts.value.findIndex(acc => acc.id === accountId)
  if (index !== -1) {
    bankAccounts.value[index].is_verified = true
    bankAccounts.value[index].verified_at = new Date().toISOString()
  }
  successMessage.value = 'Bank account verified'
}

const handleDeleteBank = async (accountId: string) => {
  await deleteBankAccount(accountId)
  bankAccounts.value = bankAccounts.value.filter(acc => acc.id !== accountId)
}

// Initialize
// onMounted(async () => {
//   // Get partner ID from user session or route
//   const { data: { user } } = await supabase.auth.getUser()
//   if (user?.id) {
//     partnerId.value = user.id
//   }

//   // Load initial data
//   const status = await fetchKYCStatus()
//   if (status) {
//     kycStatus.value = status.kyc_status
//     partner.value = status
//   }

//   const submission = await fetchCurrentSubmission()
//   if (submission) {
//     currentSubmission.value = submission
//     businessForm.value = {
//       legal_business_name: submission.legal_business_name,
//       business_registration_number: submission.business_registration_number,
//       tax_identification_number: submission.tax_identification_number,
//       business_address: submission.business_address,
//     }
//     directorForm.value = {
//       director_full_name: submission.director_full_name,
//       director_id_type: submission.director_id_type,
//       director_id_number: submission.director_id_number,
//       director_bvn: submission.director_bvn,
//     }

//     const docs = await fetchKYCDocuments(submission.id)
//     uploadedDocuments.value = docs
//   }

//   const accounts = await fetchBankAccounts()
//   bankAccounts.value = accounts

//   const completion = await getKYCCompletionStatus()
//   if (completion?.isComplete) {
//     allStepsComplete.value = true
//   }
// })
</script>

<style scoped>
:deep(.v-text-field .v-field) {
  @apply rounded-lg;
}

:deep(.v-select .v-field) {
  @apply rounded-lg;
}

:deep(.v-textarea .v-field) {
  @apply rounded-lg;
}
</style>