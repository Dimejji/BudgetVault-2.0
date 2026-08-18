<script setup>
import PageHeader from '../components/PageHeader.vue'
import Metric from '../components/Metric.vue'
import BasePanel from '../components/BasePanel.vue'

const bars = [42, 48, 53, 61, 58, 66, 72, 69, 78, 83, 88, 94]
const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
</script>

<template>
  <div>
    <PageHeader eyebrow="Intelligence" title="Year-End Review" subtitle="Turn a year's money activity into a clear story.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Export review</button>
        <button class="border border-bvgold bg-bvgold text-[#17382e] rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Share summary</button>
      </template>
    </PageHeader>

    <div class="bg-gradient-to-br from-bvgreen to-bvgreen2 rounded-[20px] text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
      <div>
        <div class="text-[11px] uppercase tracking-[.12em] font-extrabold text-[#9cebd0]">2026 progress</div>
        <h2 class="m-0 mt-1 text-[24px]">You built stronger money habits.</h2>
        <p class="text-[#bfe1d6] text-[10px] leading-[1.5] mt-[7px] max-w-lg">Your spending is more visible, your savings are more intentional, and your upcoming commitments are easier to plan for.</p>
      </div>
      <div class="w-[92px] h-[92px] rounded-full border-[7px] border-[#e9bf2b] grid place-items-center text-[23px] font-black shrink-0">82</div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-[10px] mt-[14px]">
      <Metric label="Total saved" value="₦684,000" valueClass="text-[#168064]" />
      <Metric label="Goals completed" value="5 / 7" />
      <Metric label="Budget adherence" value="82%" />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-[14px] mt-[14px]">
      <BasePanel title="Monthly savings trend" meta="Jan–Dec">
        <div class="flex items-end gap-[9px] h-[160px] px-2 pt-[15px] border-b border-bvline">
          <i v-for="(h, i) in bars" :key="i" class="block w-full bg-[#1a8064] rounded-t-[6px]" :style="{ height: h + '%' }" />
        </div>
        <div class="flex gap-[9px] mt-[7px]">
          <span v-for="(l, i) in labels" :key="i" class="flex-1 text-center text-[8px] text-bvmuted">{{ l }}</span>
        </div>
      </BasePanel>

      <BasePanel title="Your year in numbers" meta="Highlights">
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]"><span class="text-[9px] text-bvmuted">Largest goal completed</span><b>₦200,000</b></div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]"><span class="text-[9px] text-bvmuted">Best saving month</span><b>December</b></div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]"><span class="text-[9px] text-bvmuted">Most common expense</span><b>Food</b></div>
        <div class="flex justify-between items-center py-3"><span class="text-[9px] text-bvmuted">Bills settled on time</span><b>96%</b></div>
      </BasePanel>
    </div>
  </div>
</template>
