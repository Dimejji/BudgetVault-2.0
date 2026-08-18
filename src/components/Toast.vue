<script setup>
import { useAppStore } from '../stores/app'
const app = useAppStore()
</script>

<template>
  <div
    class="fixed right-[22px] bottom-[22px] bg-bvgreen text-white px-[15px] py-[12px] rounded-xl text-[10px] shadow-[0_12px_30px_rgba(0,0,0,.18)] transition-all duration-250 z-[60]"
    :class="app.toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px] pointer-events-none'"
  >
    {{ app.toast.message }}
  </div>
</template>
