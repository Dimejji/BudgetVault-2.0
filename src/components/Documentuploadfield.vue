<template>
  <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
    <div class="flex items-start justify-between mb-4">
      <div>
        <h4 class="font-semibold text-gray-900">{{ documentType.label }}</h4>
        <p class="text-sm text-gray-600">{{ documentType.description }}</p>
      </div>
      <div
        v-if="uploadedDoc"
        class="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full"
      >
        <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span class="text-xs font-semibold text-green-700">Uploaded</span>
      </div>
    </div>

    <!-- Upload Area -->
    <div
      v-if="!uploadedDoc"
      class="text-center py-8"
      @drop.prevent="handleDrop"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      :class="isDragging ? 'bg-blue-50' : 'bg-gray-50'"
    >
      <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>

      <p class="text-gray-600 mb-2">
        <span class="font-semibold">Click to upload</span>
        {{ ' or drag and drop' }}
      </p>
      <p class="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>

      <input
        ref="fileInput"
        type="file"
        @change="handleFileSelect"
        accept=".pdf,.jpg,.jpeg,.png,.gif"
        class="hidden"
      />

      <v-btn
        color="primary"
        size="small"
        class="mt-4"
        @click="$refs.fileInput?.click()"
      >
        Select File
      </v-btn>
    </div>

    <!-- Uploaded Document -->
    <div v-if="uploadedDoc" class="space-y-3">
      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
            </svg>
          </div>
          <div>
            <p class="font-medium text-gray-900 text-sm">{{ uploadedDoc.file_name }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(uploadedDoc.uploaded_at) }}</p>
          </div>
        </div>
        <v-btn
          icon
          size="small"
          variant="text"
          color="error"
          @click="handleDelete"
          :loading="isDeleting"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </v-btn>
      </div>

      <!-- Verification Status -->
      <div
        v-if="uploadedDoc.verified"
        class="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        Verified by admin
      </div>
      <div
        v-else
        class="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        Pending verification
      </div>

      <!-- Upload Another -->
      <v-btn
        size="small"
        variant="outlined"
        block
        @click="resetUpload"
      >
        Replace File
      </v-btn>
    </div>

    <!-- Loading State -->
    <div v-if="isUploading" class="space-y-3">
      <v-progress-linear
        indeterminate
        color="primary"
      />
      <p class="text-center text-sm text-gray-600">Uploading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface DocumentType {
  id: string
  label: string
  description: string
}

interface Props {
  documentType: DocumentType
  submissionId: string
  uploadedDocs: any[]
}

const emit = defineEmits<{
  upload: [documentType: string, file: File]
  delete: [documentId: string, storagePath: string]
}>()

const props = defineProps<Props>()

const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)
const isUploading = ref(false)
const isDeleting = ref(false)

const uploadedDoc = computed(() => {
  return props.uploadedDocs.find(doc => doc.document_type === props.documentType.id)
})

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    handleFile(file)
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  if (file) {
    handleFile(file)
  }
}

const handleFile = async (file: File) => {
  // Validate file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    alert('File size must be less than 10MB')
    return
  }

  // Validate file type
  const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif']
  if (!validTypes.includes(file.type)) {
    alert('Please upload a PDF or image file (PNG, JPG, GIF)')
    return
  }

  isUploading.value = true
  try {
    emit('upload', props.documentType.id, file)
  } finally {
    isUploading.value = false
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const handleDelete = async () => {
  if (!uploadedDoc.value) return

  if (!confirm('Are you sure you want to delete this document?')) {
    return
  }

  isDeleting.value = true
  try {
    emit('delete', uploadedDoc.value.id, uploadedDoc.value.storage_path)
  } finally {
    isDeleting.value = false
  }
}

const resetUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>