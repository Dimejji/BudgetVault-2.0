<script setup>
defineProps({
  label: String,
  value: String,
  valueClass: { type: String, default: '' },
})
</script>

<template>
  <div class="bg-[#f8faf9] border border-[#edf0ee] rounded-[14px] p-[14px]">
    <small class="block text-[8px] uppercase tracking-[0.08em] text-bvmuted">{{ label }}</small>
    <strong class="block text-[18px] mt-[6px]" :class="valueClass">{{ value }}</strong>
  </div>
</template>
