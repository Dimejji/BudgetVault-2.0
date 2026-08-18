<script setup>
defineProps({
  title: String,
  meta: String,
})
</script>

<template>
  <section class="bg-white border border-bvline rounded-[22px] shadow-card p-[21px]">
    <div v-if="title || $slots.head" class="flex justify-between items-center mb-[17px]">
      <slot name="head">
        <h2 class="text-[17px] font-bold m-0">{{ title }}</h2>
        <span class="text-[11px] text-bvmuted">{{ meta }}</span>
      </slot>
    </div>
    <slot />
  </section>
</template>
