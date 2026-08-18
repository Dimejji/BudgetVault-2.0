<script setup>
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import StatCard from '../components/StatCard.vue'
import BasePanel from '../components/BasePanel.vue'
import ProgressTrack from '../components/ProgressTrack.vue'

const app = useAppStore()
</script>

<template>
  <div>
    <PageHeader eyebrow="Plan & Track" title="Expense Tracking" subtitle="Know where every naira went.">
      <template #actions>
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">Filter</button>
        <button class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none" @click="app.showToast('Expense form opened')">＋ Add expense</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] mb-[14px]">
      <StatCard label="Spent this month" value="₦132,400" valueClass="text-bvorange" meta="31% of income" />
      <StatCard label="Transactions" value="48" meta="This month" />
      <StatCard label="Largest category" value="Food" meta="₦42,800" />
      <StatCard label="Compared to plan" value="−₦8,600" valueClass="text-[#168064]" meta="Under budget" />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-[14px]">
      <BasePanel title="Recent transactions" meta="48 total">
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Shoprite</div><div class="text-[9px] text-bvmuted mt-[3px]">Food · Today, 6:14 PM</div></div>
          <b class="text-[#bd5d18]">−₦18,400</b>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Uber</div><div class="text-[9px] text-bvmuted mt-[3px]">Transport · Today, 3:02 PM</div></div>
          <b class="text-[#bd5d18]">−₦4,800</b>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
          <div><div class="text-[11px] font-extrabold">Netflix</div><div class="text-[9px] text-bvmuted mt-[3px]">Subscriptions · Yesterday</div></div>
          <b class="text-[#bd5d18]">−₦5,000</b>
        </div>
        <div class="flex justify-between items-center py-3">
          <div><div class="text-[11px] font-extrabold">Salary</div><div class="text-[9px] text-bvmuted mt-[3px]">Income · Yesterday</div></div>
          <b class="text-[#188064]">+₦420,000</b>
        </div>
      </BasePanel>

      <BasePanel title="Category pulse" meta="May">
        <div class="flex justify-between items-center py-2"><span class="text-[9px] text-bvmuted">Food</span><b>₦42,800</b></div>
        <ProgressTrack :percent="72" />
        <div class="flex justify-between items-center py-2 mt-2"><span class="text-[9px] text-bvmuted">Transport</span><b>₦24,300</b></div>
        <ProgressTrack :percent="51" />
        <div class="flex justify-between items-center py-2 mt-2"><span class="text-[9px] text-bvmuted">Shopping</span><b>₦18,600</b></div>
        <ProgressTrack :percent="39" />
      </BasePanel>
    </div>
  </div>
</template>
