<script setup>
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import Metric from '../components/Metric.vue'
import BasePanel from '../components/BasePanel.vue'
import Pill from '../components/Pill.vue'

const app = useAppStore()
</script>

<template>
  <div>
    <PageHeader eyebrow="Plan & Track" title="Bill Settlement" subtitle="See what is due, protect it, and settle on time.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Manage billers</button>
        <button class="border border-bvgold bg-bvgold text-[#17382e] rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none" @click="app.showToast('Settlement flow opened')">Settle selected</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
      <Metric label="Due this month" value="₦98,500" valueClass="text-[#c76b18]" />
      <Metric label="Already settled" value="₦64,000" valueClass="text-[#168064]" />
      <Metric label="Next due" value="May 28" />
    </div>

    <BasePanel title="Upcoming bills" meta="Auto reminders on" class="mt-[14px]">
      <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
        <div><div class="text-[11px] font-extrabold">Electricity</div><div class="text-[9px] text-bvmuted mt-[3px]">Due May 28 · Eko Disco</div></div>
        <div class="flex items-center gap-2"><b>₦28,500</b><Pill variant="gold">Due soon</Pill></div>
      </div>
      <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
        <div><div class="text-[11px] font-extrabold">Internet</div><div class="text-[9px] text-bvmuted mt-[3px]">Due Jun 2 · Monthly</div></div>
        <div class="flex items-center gap-2"><b>₦15,000</b><Pill variant="green">Scheduled</Pill></div>
      </div>
      <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
        <div><div class="text-[11px] font-extrabold">Rent</div><div class="text-[9px] text-bvmuted mt-[3px]">Due Jun 5 · Housing</div></div>
        <div class="flex items-center gap-2"><b>₦55,000</b><Pill variant="blue">Protected</Pill></div>
      </div>
      <div class="flex justify-between items-center py-3">
        <div><div class="text-[11px] font-extrabold">Water</div><div class="text-[9px] text-bvmuted mt-[3px]">Due Jun 9 · Utilities</div></div>
        <div class="flex items-center gap-2"><b>₦8,500</b><Pill variant="green">Reminder set</Pill></div>
      </div>
    </BasePanel>
  </div>
</template>
