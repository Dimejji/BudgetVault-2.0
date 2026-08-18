<script setup>
import PageHeader from '../components/PageHeader.vue'
import BasePanel from '../components/BasePanel.vue'

const days = [
  { d: 1 }, { d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }, { d: 6 }, { d: 7 },
  { d: 8 }, { d: 9, tag: 'Salary', variant: 'event' }, { d: 10 }, { d: 11 }, { d: 12 }, { d: 13, tag: 'Rent', variant: 'gold' }, { d: 14 },
  { d: 15 }, { d: 16 }, { d: 17, tag: 'Save', variant: 'event' }, { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 },
  { d: 22 }, { d: 23 }, { d: 24 }, { d: 25, tag: 'Salary', variant: 'event' }, { d: 26 }, { d: 27, tag: 'Power', variant: 'gold' }, { d: 28 },
  { d: 29 }, { d: 30 }, { d: 31 },
]

function cellClass(day) {
  if (day.variant === 'event') return 'border-[#b9dfd1] bg-[#f2faf7]'
  if (day.variant === 'gold') return 'border-[#f2d57b] bg-[#fffaf0]'
  return 'border-[#eceee9] bg-white'
}
</script>

<template>
  <div>
    <PageHeader eyebrow="Intelligence" title="Money Calendar" subtitle="See your financial month before it happens.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Month</button>
        <button class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">＋ Add event</button>
      </template>
    </PageHeader>

    <BasePanel title="May 2026" meta="₦98,500 upcoming commitments">
      <div class="grid grid-cols-7 gap-[6px]">
        <div v-for="day in days" :key="day.d" class="border rounded-[9px] min-h-[58px] p-[7px] text-[8px]" :class="cellClass(day)">
          <b class="text-[10px]">{{ day.d }}</b>
          <div v-if="day.tag">{{ day.tag }}</div>
        </div>
      </div>
    </BasePanel>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-[12px] mt-[14px]">
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">Money in</h3>
        <p class="text-[10px] text-bvmuted m-0">Salary and expected inflows.</p>
        <strong class="block text-[20px] mt-[10px] text-[#168064]">₦420,000</strong>
      </div>
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">Money out</h3>
        <p class="text-[10px] text-bvmuted m-0">Planned commitments.</p>
        <strong class="block text-[20px] mt-[10px] text-[#c76b18]">₦98,500</strong>
      </div>
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">Protected</h3>
        <p class="text-[10px] text-bvmuted m-0">Vault allocations already reserved.</p>
        <strong class="block text-[20px] mt-[10px]">₦84,000</strong>
      </div>
    </div>
  </div>
</template>
