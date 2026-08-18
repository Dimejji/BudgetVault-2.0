<script setup>
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import StatCard from '../components/StatCard.vue'
import BasePanel from '../components/BasePanel.vue'
import ProgressTrack from '../components/ProgressTrack.vue'
import Metric from '../components/Metric.vue'

const app = useAppStore()
</script>

<template>
  <div>
    <PageHeader eyebrow="Plan & Track" title="Budget Planner" subtitle="Build a plan you can actually follow.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Edit budget</button>
        <button class="border border-bvgold bg-bvgold text-[#17382e] rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">✨ Generate plan</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] mb-[14px]">
      <StatCard label="Monthly income" value="₦420,000" meta="Confirmed" />
      <StatCard label="Essentials" value="₦196,000" valueClass="text-bvorange" meta="47% of income" />
      <StatCard label="Savings" value="₦84,000" valueClass="text-[#168064]" meta="20% target" />
      <StatCard label="Flexible" value="₦140,000" meta="₦35,000 weekly" :highlight="true" />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-[1.15fr_.85fr] gap-[16px]">
      <BasePanel title="Monthly allocation" meta="May 2026">
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Housing & utilities</div><div class="text-[9px] text-bvmuted mt-[3px]">Essential</div></div>
          <div class="text-right"><b>₦120,000</b><div class="w-[130px]"><ProgressTrack :percent="76" height="6px" /></div></div>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Food</div><div class="text-[9px] text-bvmuted mt-[3px]">Essential</div></div>
          <div class="text-right"><b>₦46,000</b><div class="w-[130px]"><ProgressTrack :percent="58" height="6px" /></div></div>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Transport</div><div class="text-[9px] text-bvmuted mt-[3px]">Essential</div></div>
          <div class="text-right"><b>₦30,000</b><div class="w-[130px]"><ProgressTrack :percent="43" height="6px" /></div></div>
        </div>
        <div class="flex justify-between items-center py-3">
          <div><div class="text-[11px] font-extrabold">Savings</div><div class="text-[9px] text-bvmuted mt-[3px]">Protected</div></div>
          <div class="text-right"><b>₦84,000</b><div class="w-[130px]"><ProgressTrack :percent="70" height="6px" /></div></div>
        </div>
      </BasePanel>

      <BasePanel title="Weekly guardrails" meta="Next 7 days">
        <Metric label="Safe to spend" value="₦31,800" valueClass="text-[#168064]" />
        <div class="flex gap-2 flex-wrap mt-3">
          <button class="border border-bvline bg-white rounded-[10px] px-3 py-[9px] font-bold text-[10px]" @click="app.showToast('Weekly limit updated')">Set weekly limit</button>
          <button class="border border-bvline bg-white rounded-[10px] px-3 py-[9px] font-bold text-[10px]" @click="app.showToast('Budget copied to next month')">Copy next month</button>
        </div>
        <p class="text-[13px] text-bvmuted mt-[14px]">The planner protects fixed commitments first, then gives you a clear weekly number for flexible spending.</p>
      </BasePanel>
    </div>
  </div>
</template>
