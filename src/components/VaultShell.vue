<script setup>
defineProps({
  theme: { type: String, required: true }, // 'couple' | 'business' | 'student'
  icon: String,
  eyebrow: String,
  title: String,
  subtitle: String,
  badge: String,
})

const bgMap = {
  couple: 'linear-gradient(145deg,#10233a 0%,#14243a 62%,#30253c 100%)',
  business: 'linear-gradient(145deg,#081727 0%,#0d1e31 62%,#182b31 100%)',
  student: 'linear-gradient(145deg,#0b1b31 0%,#102a4b 60%,#152c50 100%)',
}
const borderMap = {
  couple: '#2a3b55',
  business: '#243951',
  student: '#294b70',
}
const markMap = {
  couple: 'bg-[#4a2941] text-[#ff9fc1]',
  business: 'bg-[#16392f] text-[#4be0ae]',
  student: 'bg-[#183c65] text-[#71b5ff]',
}
</script>

<template>
  <div class="relative overflow-hidden rounded-[24px] p-[18px] md:p-[28px] min-h-[650px] text-[#e9f0f7]" :style="{ background: bgMap[theme], border: `1px solid ${borderMap[theme]}` }">
    <div class="relative z-10">
      <div class="flex flex-col sm:flex-row items-start justify-between gap-5 mb-[22px]">
        <div class="flex gap-[14px] items-start">
          <div class="w-12 h-12 rounded-[15px] grid place-items-center text-[21px] shrink-0" :class="markMap[theme]">{{ icon }}</div>
          <div>
            <div class="text-[10px] uppercase tracking-[.12em] font-extrabold" :class="theme === 'couple' ? 'text-[#f38bb4]' : theme === 'business' ? 'text-[#27c896]' : 'text-[#61adff]'">{{ eyebrow }}</div>
            <h1 class="mt-[3px] text-[24px] md:text-[28px] tracking-tight font-bold">{{ title }}</h1>
            <div class="max-w-2xl text-[13px] text-[#a9b8c9] mt-1">{{ subtitle }}</div>
          </div>
        </div>
        <div class="border border-white/[.12] bg-white/[.05] rounded-full px-[11px] py-2 text-[9px] font-extrabold whitespace-nowrap uppercase tracking-[.08em]">{{ badge }}</div>
      </div>

      <div class="flex gap-[7px] flex-wrap mb-4">
        <slot name="tabs" />
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-[11px] mb-3">
        <slot name="kpis" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1.25fr_.75fr] gap-3">
        <slot name="main" />
      </div>

      <slot name="footer" />
    </div>
  </div>
</template>
