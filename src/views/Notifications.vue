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
    <PageHeader eyebrow="Intelligence" title="Notifications" subtitle="The things you should know, when they matter.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none" @click="app.showToast('All notifications marked as read')">Mark all read</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
      <Metric label="Unread" value="4" valueClass="text-[#c76b18]" />
      <Metric label="Action needed" value="2" />
      <Metric label="Reminders" value="6" />
    </div>

    <BasePanel title="Today" meta="4 unread" class="mt-[14px]">
      <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
        <div><div class="text-[11px] font-extrabold">Electricity bill due soon</div><div class="text-[9px] text-bvmuted mt-[3px]">₦28,500 due in 3 days.</div></div>
        <Pill variant="gold">Action</Pill>
      </div>
      <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
        <div><div class="text-[11px] font-extrabold">Your savings goal is on track</div><div class="text-[9px] text-bvmuted mt-[3px]">Emergency Fund reached 72%.</div></div>
        <Pill variant="green">Good</Pill>
      </div>
      <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
        <div><div class="text-[11px] font-extrabold">Large transaction detected</div><div class="text-[9px] text-bvmuted mt-[3px]">₦18,400 at Shoprite.</div></div>
        <Pill variant="red">Review</Pill>
      </div>
      <div class="flex justify-between items-center py-3">
        <div><div class="text-[11px] font-extrabold">Weekly budget check-in</div><div class="text-[9px] text-bvmuted mt-[3px]">You have ₦31,800 safe to spend.</div></div>
        <Pill variant="blue">Insight</Pill>
      </div>
    </BasePanel>
  </div>
</template>
