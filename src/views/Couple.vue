<script setup>
import VaultShell from '../components/VaultShell.vue'
</script>

<template>
  <VaultShell
    theme="couple"
    icon="💞"
    eyebrow="Couple Vault"
    title="Build your money life together."
    subtitle="A private shared space for household budgets, contributions, bills and the goals you both care about."
    badge="Shared by 2"
  >
    <template #tabs>
      <button class="border border-[#8d4267] bg-white/10 text-white rounded-[10px] px-[11px] py-2 text-[10px] font-bold">Our overview</button>
      <button class="border border-white/[.11] bg-white/[.035] text-[#a9b8c9] rounded-[10px] px-[11px] py-2 text-[10px] font-bold">Contributions</button>
      <button class="border border-white/[.11] bg-white/[.035] text-[#a9b8c9] rounded-[10px] px-[11px] py-2 text-[10px] font-bold">Shared goals</button>
      <button class="border border-white/[.11] bg-white/[.035] text-[#a9b8c9] rounded-[10px] px-[11px] py-2 text-[10px] font-bold">Bills</button>
    </template>

    <template #kpis>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Household budget</small>
        <strong class="block mt-[7px] text-[20px]">₦320,000</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">This month</p>
      </div>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Joint savings</small>
        <strong class="block mt-[7px] text-[20px] text-[#f38bb4]">₦150,000</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">Wedding goal</p>
      </div>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Combined contributed</small>
        <strong class="block mt-[7px] text-[20px]">₦150,000</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">47% of budget</p>
      </div>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Shared bills</small>
        <strong class="block mt-[7px] text-[20px] text-[#f3b6cf]">₦180,000</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">3 upcoming</p>
      </div>
    </template>

    <template #main>
      <section class="bg-[#0b1828]/[.54] border border-white/[.09] rounded-[15px] p-[17px]">
        <h3 class="m-0 mb-[14px] text-[12px] text-[#f3f6fa]">How we're contributing</h3>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div class="flex-1">
            <b class="text-[11px]">Emmanuel</b>
            <div class="text-[#8296ad]">Personal contribution</div>
            <div class="h-[6px] bg-[#1a2b42] rounded-full mt-[7px] overflow-hidden"><i class="block h-full rounded-full bg-[#d85d91]" style="width:64%" /></div>
          </div>
          <b class="text-[#f38bb4]">₦90,000</b>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] text-[10px]">
          <div class="flex-1">
            <b class="text-[11px]">Ada</b>
            <div class="text-[#8296ad]">Personal contribution</div>
            <div class="h-[6px] bg-[#1a2b42] rounded-full mt-[7px] overflow-hidden"><i class="block h-full rounded-full bg-[#d85d91]" style="width:43%" /></div>
          </div>
          <b class="text-[#f38bb4]">₦60,000</b>
        </div>
        <div class="rounded-xl p-3 text-[10px] leading-[1.5] mt-[10px] bg-[#342338] border border-[#5b3650] text-[#d8b5c7]">Both partners can see the shared picture while keeping personal finances separate.</div>
        <div class="flex gap-2 flex-wrap mt-[13px]">
          <button class="bg-white text-[#10202e] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">＋ Add contribution</button>
          <button class="border border-white/[.12] bg-white/[.055] text-[#eaf0f6] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">Request contribution</button>
        </div>
      </section>

      <section class="bg-[#0b1828]/[.54] border border-white/[.09] rounded-[15px] p-[17px]">
        <h3 class="m-0 mb-[14px] text-[12px] text-[#f3f6fa]">Shared goals</h3>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div><b class="text-[11px]">Wedding Fund</b><div class="text-[#8296ad]">₦500,000 goal</div></div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#44283a] text-[#f39abb]">30%</span>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div><b class="text-[11px]">Emergency Fund</b><div class="text-[#8296ad]">₦300,000 goal</div></div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#163e34] text-[#55d9ae]">54%</span>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] text-[10px]">
          <div><b class="text-[11px]">December Trip</b><div class="text-[#8296ad]">₦250,000 goal</div></div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#403616] text-[#eec44a]">22%</span>
        </div>
        <div class="flex gap-2 flex-wrap mt-[13px]">
          <button class="bg-white text-[#10202e] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">＋ Create shared goal</button>
        </div>
      </section>
    </template>

    <template #footer>
      <section class="bg-[#0b1828]/[.54] border border-white/[.09] rounded-[15px] p-[17px] mt-3">
        <div class="flex justify-between items-center mb-2">
          <h3 class="m-0 text-[12px] text-[#f3f6fa]">Our next bills</h3>
          <span class="text-[10px] text-[#8296ad]">Household commitments</span>
        </div>
        <div class="flex justify-between items-center py-[11px] border-b border-white/[.075] text-[10px]"><span>Rent</span><b>₦120,000 · Aug 25</b></div>
        <div class="flex justify-between items-center py-[11px] border-b border-white/[.075] text-[10px]"><span>Groceries</span><b>₦60,000 · Aug 22</b></div>
        <div class="flex justify-between items-center py-[11px] text-[10px]"><span>Internet</span><b>₦18,000 · Aug 28</b></div>
        <div class="flex items-center justify-between gap-3 py-3 mt-1">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full grid place-items-center border-2 border-[#13263c] text-[10px] font-extrabold bg-[#563047] text-[#ffb1ca]">E</div>
            <div class="w-8 h-8 rounded-full grid place-items-center border-2 border-[#13263c] -ml-[7px] text-[10px] font-extrabold bg-[#563047] text-[#ffb1ca]">A</div>
            <span class="text-[10px] text-[#91a3b7] ml-[9px]">Emmanuel &amp; Ada</span>
          </div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#44283a] text-[#f39abb]">Together</span>
        </div>
      </section>
    </template>
  </VaultShell>
</template>
