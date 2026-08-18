<script setup>
import VaultShell from '../components/VaultShell.vue'
</script>

<template>
  <VaultShell
    theme="business"
    icon="💼"
    eyebrow="Business Vault"
    title="Your business, clearly separated."
    subtitle="A focused workspace for freelancers, founders and business teams to manage revenue, expenses, tax and cash flow."
    badge="Business workspace"
  >
    <template #tabs>
      <button class="border border-[#237a60] bg-white/10 text-white rounded-[10px] px-[11px] py-2 text-[10px] font-bold">Overview</button>
      <button class="border border-white/[.11] bg-white/[.035] text-[#a9b8c9] rounded-[10px] px-[11px] py-2 text-[10px] font-bold">Cash flow</button>
      <button class="border border-white/[.11] bg-white/[.035] text-[#a9b8c9] rounded-[10px] px-[11px] py-2 text-[10px] font-bold">Invoices</button>
      <button class="border border-white/[.11] bg-white/[.035] text-[#a9b8c9] rounded-[10px] px-[11px] py-2 text-[10px] font-bold">Tax</button>
    </template>

    <template #kpis>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Business income</small>
        <strong class="block mt-[7px] text-[20px] text-[#27c896]">₦620,000</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">This month</p>
      </div>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Expenses</small>
        <strong class="block mt-[7px] text-[20px]">₦210,000</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">Operating costs</p>
      </div>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Net profit</small>
        <strong class="block mt-[7px] text-[20px] text-[#27c896]">₦410,000</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">66% margin</p>
      </div>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Tax reserve</small>
        <strong class="block mt-[7px] text-[20px] text-[#eec44a]">₦30,750</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">7.5% set aside</p>
      </div>
    </template>

    <template #main>
      <section class="bg-[#0b1828]/[.54] border border-white/[.09] rounded-[15px] p-[17px]">
        <h3 class="m-0 mb-[14px] text-[12px] text-[#f3f6fa]">Business cash flow</h3>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div><b class="text-[11px]">Client revenue</b><div class="text-[#8296ad]">Invoices + direct payments</div></div>
          <b class="text-[#27c896]">+₦445,000</b>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div><b class="text-[11px]">Operating expenses</b><div class="text-[#8296ad]">Tools, transport, supplies</div></div>
          <b class="text-[#ef704b]">−₦126,000</b>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] text-[10px]">
          <div><b class="text-[11px]">Owner draw</b><div class="text-[#8296ad]">Personal allocation</div></div>
          <b>−₦84,000</b>
        </div>
        <div class="rounded-xl p-3 text-[10px] leading-[1.5] mt-[10px] bg-[#102d27] border border-[#235447] text-[#acd9cc]">Business money stays visible here so personal spending doesn't blur your operating picture.</div>
        <div class="flex gap-2 flex-wrap mt-[13px]">
          <button class="bg-white text-[#10202e] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">＋ Add income</button>
          <button class="border border-white/[.12] bg-white/[.055] text-[#eaf0f6] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">Record expense</button>
          <button class="border border-white/[.12] bg-white/[.055] text-[#eaf0f6] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">Move to tax reserve</button>
        </div>
      </section>

      <section class="bg-[#0b1828]/[.54] border border-white/[.09] rounded-[15px] p-[17px]">
        <h3 class="m-0 mb-[14px] text-[12px] text-[#f3f6fa]">Invoices needing attention</h3>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div><b class="text-[11px]">Zenith Studios</b><div class="text-[#8296ad]">Due today</div></div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#163e34] text-[#55d9ae]">₦120k paid</span>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div><b class="text-[11px]">Kobo Retail</b><div class="text-[#8296ad]">Due in 3 days</div></div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#403616] text-[#eec44a]">₦85k pending</span>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] text-[10px]">
          <div><b class="text-[11px]">Lumen Agency</b><div class="text-[#8296ad]">Due Aug 24</div></div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#403616] text-[#eec44a]">₦240k pending</span>
        </div>
        <div class="flex gap-2 flex-wrap mt-[13px]">
          <button class="bg-white text-[#10202e] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">Manage invoices</button>
          <button class="border border-white/[.12] bg-white/[.055] text-[#eaf0f6] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">＋ New invoice</button>
        </div>
      </section>
    </template>

    <template #footer>
      <section class="bg-[#0b1828]/[.54] border border-white/[.09] rounded-[15px] p-[17px] mt-3">
        <div class="flex justify-between items-center mb-2">
          <h3 class="m-0 text-[12px] text-[#f3f6fa]">Business team</h3>
          <span class="text-[10px] text-[#8296ad]">3 collaborators</span>
        </div>
        <div class="flex items-center justify-between gap-3 py-3">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full grid place-items-center border-2 border-[#13263c] text-[10px] font-extrabold bg-[#1b3d35] text-[#62dcb6]">AO</div>
            <div class="w-8 h-8 rounded-full grid place-items-center border-2 border-[#13263c] -ml-[7px] text-[10px] font-extrabold bg-[#1b3d35] text-[#62dcb6]">KM</div>
            <div class="w-8 h-8 rounded-full grid place-items-center border-2 border-[#13263c] -ml-[7px] text-[10px] font-extrabold bg-[#1b3d35] text-[#62dcb6]">LA</div>
            <span class="text-[10px] text-[#91a3b7] ml-[9px]">Owner · Finance · Operations</span>
          </div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#163e34] text-[#55d9ae]">Workspace active</span>
        </div>
      </section>
    </template>
  </VaultShell>
</template>
