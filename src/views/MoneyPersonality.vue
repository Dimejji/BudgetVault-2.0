<script setup>
import PageHeader from '../components/PageHeader.vue'
import BasePanel from '../components/BasePanel.vue'
import Pill from '../components/Pill.vue'
</script>

<template>
  <div>
    <PageHeader eyebrow="Intelligence" title="Money Personality" subtitle="A simple picture of how you tend to make money decisions.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Retake assessment</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-[14px]">
      <div class="bg-white border border-bvline rounded-[18px] shadow-card p-[18px] text-center">
        <div
          class="relative w-[150px] h-[150px] rounded-full mx-auto"
          style="background:conic-gradient(#168064 0 34%,#f4bf08 34% 58%,#4f79ff 58% 82%,#d84f83 82% 100%)"
        >
          <div class="absolute inset-0 m-auto w-[112px] h-[112px] bg-white rounded-full grid place-items-center">
            <span class="text-[18px] font-black text-[#17382e]">Builder</span>
          </div>
        </div>
        <h2 class="mt-[15px] mb-[6px] text-[20px]">The Steady Builder</h2>
        <p class="text-[13px] text-bvmuted">You prefer progress you can see, protected commitments, and practical goals over risky jumps.</p>
      </div>

      <BasePanel title="Your money signals" meta="Current">
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Planning</div><div class="text-[9px] text-bvmuted mt-[3px]">You usually plan before spending.</div></div>
          <Pill variant="green">Strong</Pill>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Consistency</div><div class="text-[9px] text-bvmuted mt-[3px]">Your saving habit is improving.</div></div>
          <Pill variant="green">Growing</Pill>
        </div>
        <div class="flex justify-between items-center py-3">
          <div><div class="text-[11px] font-extrabold">Impulse control</div><div class="text-[9px] text-bvmuted mt-[3px]">Small purchases can add up.</div></div>
          <Pill variant="gold">Watch</Pill>
        </div>
      </BasePanel>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-[12px] mt-[14px]">
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">Best strength</h3>
        <p class="text-[10px] text-bvmuted m-0 leading-[1.55]">Protecting important commitments before flexible spending.</p>
      </div>
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">Watch-out</h3>
        <p class="text-[10px] text-bvmuted m-0 leading-[1.55]">Convenience spending when the month feels comfortable.</p>
      </div>
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">Coach suggestion</h3>
        <p class="text-[10px] text-bvmuted m-0 leading-[1.55]">Use weekly limits so good intentions become repeatable behaviour.</p>
      </div>
    </div>
  </div>
</template>
