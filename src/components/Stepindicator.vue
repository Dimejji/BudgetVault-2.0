<template>
  <div class="flex flex-col items-center">
    <!-- Step Circle -->
    <div
      :class="[
        'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-3 transition-all duration-200',
        completed
          ? 'bg-white text-blue-600 ring-2 ring-white'
          : active
            ? 'bg-blue-500 text-white ring-2 ring-white'
            : 'bg-blue-300 bg-opacity-40 text-white ring-2 ring-white ring-opacity-40',
      ]"
    >
      <svg v-if="completed" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      <span v-else>{{ index + 1 }}</span>
    </div>

    <!-- Step Label -->
    <div :class="['text-center', active ? 'text-white font-semibold' : 'text-blue-100 text-sm']">
      {{ step.label }}
    </div>

    <!-- Connector Line (visible on desktop for all but last) -->
    <div
      v-if="index < 3"
      :class="[
        'w-1 h-6 mt-2 hidden md:block',
        completed ? 'bg-white' : 'bg-blue-300 bg-opacity-40',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
interface Step {
  id: number
  label: string
  icon: string
}

interface Props {
  step: Step
  index: number
  active: boolean
  completed: boolean
}

defineProps<Props>()
</script>