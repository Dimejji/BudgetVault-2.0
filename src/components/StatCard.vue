<script setup>
defineProps({
  label: String,
  value: String,
  meta: String,
  highlight: { type: Boolean, default: false },
  valueClass: { type: String, default: '' },
})
</script>

<template>
  <div
    class="bg-white border rounded-[19px] p-[18px] shadow-card min-h-[124px]"
    :class="highlight ? 'border-[1.5px] border-[#f0cf51]' : 'border-bvline'"
  >
    <div class="text-[10px] uppercase tracking-[0.1em] text-[#84908c]">{{ label }}</div>
    <div class="text-[25px] font-extrabold my-[10px]" :class="valueClass">{{ value }}</div>
    <div class="text-[11px] text-bvmuted">
      <slot name="meta">{{ meta }}</slot>
    </div>
  </div>
</template>
