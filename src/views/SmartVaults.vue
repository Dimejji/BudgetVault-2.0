<script setup>
import PageHeader from '../components/PageHeader.vue'
import Metric from '../components/Metric.vue'
import BasePanel from '../components/BasePanel.vue'
import ProgressTrack from '../components/ProgressTrack.vue'
import Pill from '../components/Pill.vue'
</script>

<template>
  <div>
    <PageHeader eyebrow="Plan & Track" title="Smart Vaults" subtitle="Give every naira a job before it disappears.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">＋ New vault</button>
        <button class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Auto-allocate</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
      <Metric label="Total protected" value="₦286,000" valueClass="text-[#168064]" />
      <Metric label="Active vaults" value="6" />
      <Metric label="Next release" value="Jun 1" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-[12px] mt-[14px]">
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">Emergency Fund</h3>
        <p class="text-[10px] text-bvmuted leading-[1.55] m-0">Keep a protected buffer for unexpected costs.</p>
        <ProgressTrack :percent="72" />
        <div class="flex justify-between items-center pt-3">
          <span class="text-[9px] text-bvmuted">₦144,000 of ₦200,000</span>
          <Pill variant="green">72%</Pill>
        </div>
      </div>
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">Monthly Savings</h3>
        <p class="text-[10px] text-bvmuted leading-[1.55] m-0">Automatic allocation toward your monthly savings target.</p>
        <ProgressTrack :percent="58" />
        <div class="flex justify-between items-center pt-3">
          <span class="text-[9px] text-bvmuted">₦58,000 of ₦100,000</span>
          <Pill variant="gold">58%</Pill>
        </div>
      </div>
      <div class="bg-white border border-bvline rounded-[18px] p-[18px] shadow-card">
        <h3 class="m-0 mb-[6px] text-[14px]">School / Family</h3>
        <p class="text-[10px] text-bvmuted leading-[1.55] m-0">A protected fund for a known upcoming commitment.</p>
        <ProgressTrack :percent="84" />
        <div class="flex justify-between items-center pt-3">
          <span class="text-[9px] text-bvmuted">₦84,000 of ₦100,000</span>
          <Pill variant="blue">84%</Pill>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-[14px] mt-[14px]">
      <BasePanel title="Vault activity" meta="Today">
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Emergency Fund</div><div class="text-[9px] text-bvmuted mt-[3px]">Auto-allocation</div></div>
          <b>+₦20,000</b>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Monthly Savings</div><div class="text-[9px] text-bvmuted mt-[3px]">Manual deposit</div></div>
          <b>+₦10,000</b>
        </div>
        <div class="flex justify-between items-center py-3">
          <div><div class="text-[11px] font-extrabold">School / Family</div><div class="text-[9px] text-bvmuted mt-[3px]">Reserved for upcoming bill</div></div>
          <Pill variant="green">Protected</Pill>
        </div>
      </BasePanel>

      <BasePanel title="Vault rules" meta="Smart">
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]"><span class="text-[9px] text-bvmuted">Protect essentials first</span><Pill variant="green">On</Pill></div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]"><span class="text-[9px] text-bvmuted">Auto-save after income</span><Pill variant="green">On</Pill></div>
        <div class="flex justify-between items-center py-3"><span class="text-[9px] text-bvmuted">Release before due date</span><Pill variant="gold">Review</Pill></div>
      </BasePanel>
    </div>
  </div>
</template>
