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
    <PageHeader eyebrow="Intelligence" title="Financial GPS" subtitle="Know where you are, where you're going, and what to adjust.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Change destination</button>
        <button class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Run check-in</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-[14px]">
      <BasePanel title="Your financial route" meta="May 2026">
        <div class="relative h-[280px] rounded-[18px] border border-[#dfe5e1] overflow-hidden" style="background:radial-gradient(circle at 25% 28%,rgba(22,128,100,.18) 0 2px,transparent 3px),radial-gradient(circle at 65% 38%,rgba(79,121,255,.2) 0 3px,transparent 4px),radial-gradient(circle at 47% 70%,rgba(244,191,8,.28) 0 3px,transparent 4px),linear-gradient(135deg,#eef4f0,#f9f7ef)">
          <div class="absolute inset-[18%_9%] border-2 border-dashed border-[#b9ccc3] rounded-[40%_55%_35%_50%] -rotate-[8deg]" />
          <div class="absolute left-[18%] top-[27%] px-[9px] py-[7px] rounded-[9px] bg-white border border-[#dfe5e1] shadow text-[8px] font-extrabold">You · Budget health</div>
          <div class="absolute left-[58%] top-[32%] px-[9px] py-[7px] rounded-[9px] bg-white border border-[#dfe5e1] shadow text-[8px] font-extrabold">Goal · ₦200k</div>
          <div class="absolute left-[40%] top-[66%] px-[9px] py-[7px] rounded-[9px] bg-white border border-[#dfe5e1] shadow text-[8px] font-extrabold">Bill · May 28</div>
        </div>
      </BasePanel>

      <BasePanel title="Route guidance" meta="3 moves">
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Protect the next bill</div><div class="text-[9px] text-bvmuted mt-[3px]">Keep ₦28,500 untouched.</div></div>
          <Pill variant="gold">Now</Pill>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Hold weekly spend</div><div class="text-[9px] text-bvmuted mt-[3px]">Stay below ₦35,000.</div></div>
          <Pill variant="blue">This week</Pill>
        </div>
        <div class="flex justify-between items-center py-3">
          <div><div class="text-[11px] font-extrabold">Top up emergency fund</div><div class="text-[9px] text-bvmuted mt-[3px]">₦20,000 gets you closer.</div></div>
          <Pill variant="green">Next</Pill>
        </div>
      </BasePanel>
    </div>

    <BasePanel title="Progress toward your destination" meta="71%" class="mt-[14px]">
      <ProgressTrack :percent="71" />
      <div class="flex gap-2 flex-wrap mt-3">
        <button class="border border-bvline bg-white rounded-[10px] px-3 py-[9px] font-bold text-[10px]" @click="app.showToast('Route recalculated')">Recalculate</button>
        <button class="border border-bvline bg-white rounded-[10px] px-3 py-[9px] font-bold text-[10px]" @click="app.showToast('Goal details opened')">View destination</button>
      </div>
    </BasePanel>
  </div>
</template>
