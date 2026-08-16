<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4" :class="statusBorderColor">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-lg font-bold text-gray-900">{{ submission.legal_business_name }}</h3>
          <p class="text-sm text-gray-600 mt-1">{{ submission.director_full_name }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ partner?.email }}</p>
        </div>

        <div class="flex items-center gap-2">
          <!-- Status Badge -->
          <v-chip
            :color="statusColor"
            text-color="white"
            size="small"
            class="font-semibold"
          >
            {{ formatStatus(submission.status) }}
          </v-chip>

          <!-- Days Since Submission -->
          <div class="text-right">
            <p class="text-xs text-gray-500">{{ daysSinceSubmission }} days ago</p>
          </div>
        </div>
      </div>

      <!-- Key Info Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 py-4 border-y border-gray-200">
        <div>
          <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">CAC Number</p>
          <p class="font-mono text-sm text-gray-900">{{ submission.business_registration_number }}</p>
        </div>

        <div>
          <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">TIN</p>
          <p class="font-mono text-sm text-gray-900">{{ submission.tax_identification_number }}</p>
        </div>

        <div>
          <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Director ID</p>
          <p class="font-mono text-sm text-gray-900">{{ submission.director_id_type }} - {{ submission.director_id_number }}</p>
        </div>

        <div>
          <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Submission #</p>
          <p class="font-mono text-sm text-gray-900">#{{ submission.submission_number }}</p>
        </div>
      </div>

      <!-- Documents Status -->
      <div class="mb-4 p-3 bg-gray-50 rounded-lg">
        <p class="text-xs font-semibold text-gray-700 mb-2 uppercase">Documents Uploaded</p>
        <div class="flex flex-wrap gap-2">
          <DocumentStatusBadge
            v-for="doc in documents"
            :key="doc.id"
            :document="doc"
          />
        </div>
        <p v-if="documents.length === 0" class="text-xs text-gray-500 italic">No documents uploaded</p>
      </div>

      <!-- Rejection Reason (if applicable) -->
      <div v-if="submission.rejection_reason" class="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
        <p class="text-xs font-semibold text-red-900 mb-1">Rejection Reason</p>
        <p class="text-sm text-red-800">{{ submission.rejection_reason }}</p>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <v-btn
          size="small"
          variant="text"
          color="primary"
          @click="$emit('view-details')"
        >
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
          </svg>
          View Details
        </v-btn>

        <v-btn
          v-if="submission.status === 'submitted' || submission.status === 'under_review'"
          size="small"
          color="success"
          variant="tonal"
          @click="showApproveDialog = true"
          :loading="loading"
        >
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          Approve
        </v-btn>

        <v-btn
          v-if="submission.status === 'submitted' || submission.status === 'under_review'"
          size="small"
          color="error"
          variant="tonal"
          @click="showRejectDialog = true"
          :loading="loading"
        >
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Reject
        </v-btn>
      </div>
    </div>

    <!-- Approve Dialog -->
    <v-dialog v-model="showApproveDialog" max-width="500">
      <v-card>
        <v-card-title class="bg-green-600 text-white">Approve Submission</v-card-title>

        <v-card-text class="pt-6">
          <p class="text-gray-700 mb-4">
            Approve KYC submission for <span class="font-semibold">{{ submission.legal_business_name }}</span>?
          </p>

          <v-textarea
            v-model="approvalNotes"
            label="Admin Notes (Optional)"
            variant="outlined"
            density="comfortable"
            rows="3"
            placeholder="e.g., Documents verified, all checks passed..."
          />
        </v-card-text>

        <v-card-actions class="bg-gray-50 p-4 gap-2">
          <v-btn
            variant="text"
            @click="showApproveDialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            color="success"
            @click="confirmApprove"
            :loading="loading"
          >
            Confirm Approval
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Reject Dialog -->
    <v-dialog v-model="showRejectDialog" max-width="500">
      <v-card>
        <v-card-title class="bg-red-600 text-white">Reject Submission</v-card-title>

        <v-card-text class="pt-6">
          <p class="text-gray-700 mb-4">
            Reject KYC submission for <span class="font-semibold">{{ submission.legal_business_name }}</span>?
          </p>

          <v-textarea
            v-model="rejectionReason"
            label="Rejection Reason *"
            variant="outlined"
            density="comfortable"
            rows="3"
            placeholder="Explain why the submission is being rejected..."
            :rules="[v => !!v || 'Rejection reason is required']"
          />

          <p class="text-xs text-gray-600 mt-3">
            Partner will be notified and can resubmit with corrections.
          </p>
        </v-card-text>

        <v-card-actions class="bg-gray-50 p-4 gap-2">
          <v-btn
            variant="text"
            @click="showRejectDialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            color="error"
            @click="confirmReject"
            :disabled="!rejectionReason"
            :loading="loading"
          >
            Confirm Rejection
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DocumentStatusBadge from './DocumentStatusBadge.vue'

interface Props {
  submission: any
  partner: any
  documents: any[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<{
  approve: [submissionId: string, notes: string]
  reject: [submissionId: string, reason: string]
  viewDetails: []
}>()

// State
const showApproveDialog = ref(false)
const showRejectDialog = ref(false)
const approvalNotes = ref('')
const rejectionReason = ref('')

// Computed
const statusColor = computed(() => {
  const colors: Record<string, string> = {
    submitted: 'blue',
    under_review: 'amber',
    approved: 'green',
    rejected: 'red',
  }
  return colors[props.submission.status] || 'gray'
})

const statusBorderColor = computed(() => {
  const colors: Record<string, string> = {
    submitted: 'border-blue-500',
    under_review: 'border-amber-500',
    approved: 'border-green-500',
    rejected: 'border-red-500',
  }
  return colors[props.submission.status] || 'border-gray-300'
})

const daysSinceSubmission = computed(() => {
  const date = new Date(props.submission.created_at)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  return diff
})

// Methods
const formatStatus = (status: string) => {
  const map: Record<string, string> = {
    submitted: 'Submitted',
    under_review: 'Under Review',
    approved: 'Approved',
    rejected: 'Rejected',
  }
  return map[status] || status
}

const confirmApprove = () => {
  emit('approve', props.submission.id, approvalNotes.value)
  showApproveDialog.value = false
  approvalNotes.value = ''
}

const confirmReject = () => {
  if (!rejectionReason.value.trim()) return
  emit('reject', props.submission.id, rejectionReason.value)
  showRejectDialog.value = false
  rejectionReason.value = ''
}
</script>