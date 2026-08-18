<script setup>
defineProps({
  eyebrow: String,
  title: String,
  subtitle: String,
})
</script>

<template>
  <header class="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
    <div>
      <div class="text-[11px] uppercase tracking-[.12em] font-extrabold text-bvgreen2">{{ eyebrow }}</div>
      <h1 class="mt-1 mb-[5px] text-[26px] md:text-[30px] tracking-tight font-bold">{{ title }}</h1>
      <div class="text-[13px] text-bvmuted max-w-xl">{{ subtitle }}</div>
    </div>
    <div class="flex gap-[9px] w-full md:w-auto">
      <slot name="actions" />
    </div>
  </header>
</template>
