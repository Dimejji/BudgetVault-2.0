<script setup>
defineProps({
  percent: { type: [Number, String], required: true },
  color: { type: String, default: '#168064' },
  height: { type: String, default: '8px' },
})
</script>

<template>
  <div class="rounded-full bg-[#edf0ee] overflow-hidden" :style="{ height }">
    <i class="block h-full rounded-full" :style="{ width: percent + '%', background: color }" />
  </div>
</template>
