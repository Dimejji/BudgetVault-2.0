<script setup>
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import BasePanel from '../components/BasePanel.vue'
import ProgressTrack from '../components/ProgressTrack.vue'
import Pill from '../components/Pill.vue'

const app = useAppStore()
</script>

<template>
  <div>
    <PageHeader eyebrow="Plan & Track" title="Goals & Dreams" subtitle="Turn the things you want into visible progress.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Explore goals</button>
        <button class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none" @click="app.showToast('New goal created')">＋ New goal</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-[12px]">
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">Emergency Fund</h3>
        <p class="text-[10px] text-bvmuted m-0">Safety buffer for the unexpected.</p>
        <strong class="text-[22px] block mt-[14px]">₦144,000</strong>
        <ProgressTrack :percent="72" />
        <div class="text-[10px] text-bvmuted mt-[6px]">72% of ₦200,000</div>
      </div>
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">New Laptop</h3>
        <p class="text-[10px] text-bvmuted m-0">Save toward a productive upgrade.</p>
        <strong class="text-[22px] block mt-[14px]">₦180,000</strong>
        <ProgressTrack :percent="60" />
        <div class="text-[10px] text-bvmuted mt-[6px]">60% of ₦300,000</div>
      </div>
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">December Trip</h3>
        <p class="text-[10px] text-bvmuted m-0">Make travel a planned expense, not a surprise.</p>
        <strong class="text-[22px] block mt-[14px]">₦90,000</strong>
        <ProgressTrack :percent="36" />
        <div class="text-[10px] text-bvmuted mt-[6px]">36% of ₦250,000</div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-[14px] mt-[14px]">
      <BasePanel title="Goal timeline" meta="2026">
        <div class="relative ml-[7px] pl-[18px]">
          <div class="absolute left-0 top-1 bottom-1 w-[2px] bg-[#dfe7e3]" />
          <div class="relative pb-4">
            <div class="absolute -left-[22px] top-[3px] w-2 h-2 rounded-full bg-[#168064] border-[3px] border-[#e5f4ee]" />
            <b class="text-[10px]">Emergency Fund reaches 75%</b>
            <p class="text-[9px] text-bvmuted mt-1 leading-[1.5]">Expected in 2 weeks at your current savings pace.</p>
          </div>
          <div class="relative pb-4">
            <div class="absolute -left-[22px] top-[3px] w-2 h-2 rounded-full bg-[#168064] border-[3px] border-[#e5f4ee]" />
            <b class="text-[10px]">Laptop fund reaches ₦200,000</b>
            <p class="text-[9px] text-bvmuted mt-1 leading-[1.5]">Expected in August if you maintain monthly contributions.</p>
          </div>
          <div class="relative">
            <div class="absolute -left-[22px] top-[3px] w-2 h-2 rounded-full bg-[#168064] border-[3px] border-[#e5f4ee]" />
            <b class="text-[10px]">Trip fund review</b>
            <p class="text-[9px] text-bvmuted mt-1 leading-[1.5]">Review in September before increasing travel allocation.</p>
          </div>
        </div>
      </BasePanel>

      <BasePanel title="Goal habits" meta="Coach">
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]"><span class="text-[9px] text-bvmuted">Automatic contributions</span><Pill variant="green">3 active</Pill></div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]"><span class="text-[9px] text-bvmuted">Goals on track</span><Pill variant="green">2 of 3</Pill></div>
        <div class="flex justify-between items-center py-3"><span class="text-[9px] text-bvmuted">Needs attention</span><Pill variant="gold">1</Pill></div>
      </BasePanel>
    </div>
  </div>
</template>
