<script setup>
defineProps({
  title: String,
  sub: String,
})
</script>

<template>
  <div class="flex items-center justify-between gap-3 py-3 border-b border-[#eff0ed] last:border-b-0">
    <div>
      <div class="text-[11px] font-extrabold">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="sub || $slots.sub" class="text-[9px] text-bvmuted mt-[3px]">
        <slot name="sub">{{ sub }}</slot>
      </div>
    </div>
    <div class="flex items-center gap-2 shrink-0">
      <slot />
    </div>
  </div>
</template>
