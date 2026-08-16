<template>
  <div
    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
    :class="documentVerified ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'"
  >
    <svg
      class="w-3 h-3"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        v-if="documentVerified"
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clip-rule="evenodd"
      />
      <path
        v-else
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-5 6a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
        clip-rule="evenodd"
      />
    </svg>
    <span>{{ formatDocumentType(document.document_type) }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Document {
  id: string
  document_type: string
  verified: boolean
  verified_at?: string
}

interface Props {
  document: Document
}

defineProps<Props>()

const documentVerified = computed(() => {
  return props.document.verified
})

const formatDocumentType = (type: string): string => {
  const map: Record<string, string> = {
    'cac_certificate': 'CAC',
    'valid_id': 'Valid ID',
    'proof_of_address': 'Address',
    'bank_statement': 'Bank Statement',
    'tax_clearance': 'Tax Clearance',
    'memorandum_of_association': 'MOA',
    'other': 'Other',
  }
  return map[type] || type
}
</script>