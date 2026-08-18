<script setup>
import PageHeader from '../components/PageHeader.vue'
import Metric from '../components/Metric.vue'
import BasePanel from '../components/BasePanel.vue'
import Pill from '../components/Pill.vue'
</script>

<template>
  <div>
    <PageHeader eyebrow="Intelligence" title="Subscriptions" subtitle="See the recurring charges quietly shaping your month.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Find duplicates</button>
        <button class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">＋ Add subscription</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
      <Metric label="Monthly recurring" value="₦23,900" valueClass="text-[#c76b18]" />
      <Metric label="Active services" value="7" />
      <Metric label="Potential savings" value="₦7,500" valueClass="text-[#168064]" />
    </div>

    <BasePanel title="Recurring payments" meta="Next 30 days" class="mt-[14px]">
      <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
        <div><div class="text-[11px] font-extrabold">Netflix</div><div class="text-[9px] text-bvmuted mt-[3px]">Entertainment · Renews May 30</div></div>
        <div class="flex items-center gap-2"><b>₦5,000</b><Pill variant="green">Active</Pill></div>
      </div>
      <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
        <div><div class="text-[11px] font-extrabold">Google One</div><div class="text-[9px] text-bvmuted mt-[3px]">Storage · Renews Jun 2</div></div>
        <div class="flex items-center gap-2"><b>₦3,500</b><Pill variant="green">Active</Pill></div>
      </div>
      <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
        <div><div class="text-[11px] font-extrabold">Spotify</div><div class="text-[9px] text-bvmuted mt-[3px]">Music · Renews Jun 4</div></div>
        <div class="flex items-center gap-2"><b>₦3,500</b><Pill variant="blue">Active</Pill></div>
      </div>
      <div class="flex justify-between items-center py-3">
        <div><div class="text-[11px] font-extrabold">Unused service</div><div class="text-[9px] text-bvmuted mt-[3px]">No activity detected for 45 days.</div></div>
        <div class="flex items-center gap-2"><b>₦7,500</b><Pill variant="red">Review</Pill></div>
      </div>
    </BasePanel>
  </div>
</template>
