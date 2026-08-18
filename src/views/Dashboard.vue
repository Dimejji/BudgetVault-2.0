<script setup>
import StatCard from '../components/StatCard.vue'
import BasePanel from '../components/BasePanel.vue'
import ProgressTrack from '../components/ProgressTrack.vue'
</script>

<template>
  <div>
    <header class="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
      <div>
        <div class="text-[11px] uppercase tracking-[.12em] font-extrabold text-bvgreen2">Monday, May 11, 2026</div>
        <h1 class="mt-1 mb-[5px] text-[26px] md:text-[30px] tracking-tight font-bold">Good evening, Oladimeji.</h1>
        <div class="text-[13px] text-bvmuted">
          Here's your financial picture today. You have <b>20 days</b> left in your current budget cycle.
        </div>
      </div>
      <div class="flex gap-[9px] w-full md:w-auto">
        <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">✎ Edit Budget</button>
        <button class="border border-bvgold bg-bvgold text-[#17382e] rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none">⚡ Settle Budget</button>
      </div>
    </header>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] mb-[18px]">
      <StatCard label="Monthly income" value="₦850,000" meta="Next income in 8 days" />
      <StatCard label="Allocated" value="₦650,000" valueClass="text-[#168064]">
        <template #meta><span class="text-[#1b8a6a] font-bold">76%</span> of income planned</template>
      </StatCard>
      <StatCard label="Spent this cycle" value="₦286,400" valueClass="text-bvorange" meta="₦363,600 remaining" />
      <StatCard label="Safe to spend" value="₦18,500" valueClass="text-[#168064]" meta="Today without affecting goals" :highlight="true" />
    </section>

    <div class="grid grid-cols-1 xl:grid-cols-[1.45fr_.8fr] gap-[18px]">
      <div class="grid gap-[18px]">
        <BasePanel title="Financial GPS" meta="Cycle health · On track">
          <div class="grid grid-cols-1 sm:grid-cols-[145px_1fr] gap-[22px] items-center">
            <div class="relative w-[138px] h-[138px] rounded-full mx-auto sm:mx-0" style="background:conic-gradient(#1a8a69 0 71%,#e9eeeb 71% 100%)">
              <div class="absolute inset-0 m-auto w-[104px] h-[104px] bg-white rounded-full grid place-items-center text-center">
                <div>
                  <strong class="block text-[23px]">71%</strong>
                  <span class="text-[9px] text-bvmuted uppercase">On track</span>
                </div>
              </div>
            </div>
            <div>
              <h3 class="m-0 mb-[5px] text-[19px]">Your plan is healthy.</h3>
              <p class="text-[12px] text-bvmuted leading-[1.55] mb-[13px]">
                You are spending below your planned pace. Keeping today's spending under <b>₦18,500</b> protects your savings and upcoming commitments.
              </p>
              <ProgressTrack :percent="71" color="#1a8a69" />
              <div class="flex gap-[18px] mt-[11px] text-[10px] text-bvmuted">
                <span><b>₦286.4k</b> spent</span>
                <span><b>₦363.6k</b> remaining</span>
              </div>
            </div>
          </div>
        </BasePanel>

        <BasePanel>
          <template #head>
            <h2 class="text-[17px] font-bold m-0">Smart Vaults</h2>
            <button class="bg-transparent border-0 text-bvgreen2 font-extrabold text-[11px]">Manage all →</button>
          </template>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
            <div class="p-[15px] border border-[#edf0ee] rounded-[15px] bg-[#fbfcfb]">
              <div class="flex justify-between items-center">
                <div class="w-8 h-8 rounded-[10px] bg-bvmint grid place-items-center text-bvgreen2">🏠</div>
                <span class="text-[#1b8a6a] font-bold text-[11px]">72%</span>
              </div>
              <strong class="text-[12px] block mt-2">Rent</strong>
              <small class="text-[10px] text-bvmuted block">₦1.2m goal</small>
              <div class="text-[17px] font-extrabold mt-[3px]">₦864,000</div>
              <ProgressTrack :percent="72" color="#1a8064" height="5px" />
            </div>
            <div class="p-[15px] border border-[#edf0ee] rounded-[15px] bg-[#fbfcfb]">
              <div class="flex justify-between items-center">
                <div class="w-8 h-8 rounded-[10px] bg-bvmint grid place-items-center text-bvgreen2">🎓</div>
                <span class="text-[#1b8a6a] font-bold text-[11px]">48%</span>
              </div>
              <strong class="text-[12px] block mt-2">School Fees</strong>
              <small class="text-[10px] text-bvmuted block">₦600k goal</small>
              <div class="text-[17px] font-extrabold mt-[3px]">₦288,000</div>
              <ProgressTrack :percent="48" color="#1a8064" height="5px" />
            </div>
            <div class="p-[15px] border border-[#edf0ee] rounded-[15px] bg-[#fbfcfb]">
              <div class="flex justify-between items-center">
                <div class="w-8 h-8 rounded-[10px] bg-bvmint grid place-items-center text-bvgreen2">🌴</div>
                <span class="text-[#1b8a6a] font-bold text-[11px]">31%</span>
              </div>
              <strong class="text-[12px] block mt-2">December Trip</strong>
              <small class="text-[10px] text-bvmuted block">₦450k goal</small>
              <div class="text-[17px] font-extrabold mt-[3px]">₦139,500</div>
              <ProgressTrack :percent="31" color="#1a8064" height="5px" />
            </div>
          </div>
        </BasePanel>

        <section class="bg-gradient-to-br from-bvgreen to-bvgreen2 text-white rounded-[22px] shadow-card p-[21px]">
          <div class="flex justify-between items-center mb-[17px]">
            <h2 class="text-white text-[17px] font-bold m-0">✦ AI Coach</h2>
            <span class="text-[#9bd6c4] text-[11px]">Fresh insight</span>
          </div>
          <p class="text-[13px] leading-[1.6] text-[#d9eee8] m-0">
            <strong class="text-white">Your transport spending is 18% higher than your usual pace.</strong>
            You can still stay within budget if you keep the next two weeks below ₦21,000.
          </p>
          <div class="flex flex-wrap gap-2 mt-[15px]">
            <button class="border border-white/[.18] bg-white/[.08] text-white rounded-[10px] px-[11px] py-[9px] text-[10px] font-bold">Ask Coach</button>
            <button class="border border-white/[.18] bg-white/[.08] text-white rounded-[10px] px-[11px] py-[9px] text-[10px] font-bold">View forecast</button>
            <button class="border border-white/[.18] bg-white/[.08] text-white rounded-[10px] px-[11px] py-[9px] text-[10px] font-bold">Why this changed?</button>
          </div>
        </section>

        <BasePanel>
          <template #head>
            <h2 class="text-[17px] font-bold m-0">Recent activity</h2>
            <button class="bg-transparent border-0 text-bvgreen2 font-extrabold text-[11px]">View all →</button>
          </template>
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <div class="flex items-center gap-[10px]">
              <div class="w-8 h-8 rounded-[10px] bg-[#f1f5f3] grid place-items-center">🛒</div>
              <div><strong class="text-[11px] block">Supermarket</strong><small class="text-[10px] text-bvmuted">Today · Food & groceries</small></div>
            </div>
            <b class="text-[#bd5d18]">−₦18,200</b>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <div class="flex items-center gap-[10px]">
              <div class="w-8 h-8 rounded-[10px] bg-[#f1f5f3] grid place-items-center">⛽</div>
              <div><strong class="text-[11px] block">Fuel Station</strong><small class="text-[10px] text-bvmuted">Yesterday · Transport</small></div>
            </div>
            <b class="text-[#bd5d18]">−₦12,500</b>
          </div>
          <div class="flex justify-between items-center py-3">
            <div class="flex items-center gap-[10px]">
              <div class="w-8 h-8 rounded-[10px] bg-[#f1f5f3] grid place-items-center">↗</div>
              <div><strong class="text-[11px] block">Salary</strong><small class="text-[10px] text-bvmuted">May 1 · Income</small></div>
            </div>
            <b class="text-[#188064]">+₦850,000</b>
          </div>
        </BasePanel>
      </div>

      <div class="grid gap-[18px] content-start">
        <BasePanel title="Daily Snapshot" meta="Today">
          <div class="grid grid-cols-2 gap-[10px]">
            <div class="p-[13px] rounded-[14px] bg-[#f8faf9]"><small class="text-[9px] text-bvmuted uppercase">Income</small><strong class="block text-[15px] mt-[5px]">₦850k</strong><p class="text-[10px] text-bvmuted mt-1">Monthly</p></div>
            <div class="p-[13px] rounded-[14px] bg-[#f8faf9]"><small class="text-[9px] text-bvmuted uppercase">Spent</small><strong class="block text-[15px] mt-[5px]">₦18.2k</strong><p class="text-[10px] text-bvmuted mt-1">Today</p></div>
            <div class="p-[13px] rounded-[14px] bg-[#f8faf9]"><small class="text-[9px] text-bvmuted uppercase">Saved</small><strong class="block text-[15px] mt-[5px]">₦42k</strong><p class="text-[10px] text-bvmuted mt-1">This cycle</p></div>
            <div class="p-[13px] rounded-[14px] bg-[#f8faf9]"><small class="text-[9px] text-bvmuted uppercase">Safe spend</small><strong class="block text-[15px] mt-[5px]">₦18.5k</strong><p class="text-[10px] text-bvmuted mt-1">Today</p></div>
          </div>
        </BasePanel>

        <BasePanel>
          <template #head>
            <h2 class="text-[17px] font-bold m-0">Budget plan</h2>
            <button class="bg-transparent border-0 text-bvgreen2 font-extrabold text-[11px]">Adjust →</button>
          </template>
          <div class="flex justify-between py-3 border-b border-[#eff0ed]">
            <div><span class="text-[11px] text-bvmuted">Needs</span><div class="w-[130px]"><ProgressTrack :percent="78" height="6px" /></div></div>
            <strong class="text-[12px]">₦312k / ₦400k</strong>
          </div>
          <div class="flex justify-between py-3 border-b border-[#eff0ed]">
            <div><span class="text-[11px] text-bvmuted">Wants</span><div class="w-[130px]"><ProgressTrack :percent="42" height="6px" /></div></div>
            <strong class="text-[12px]">₦84k / ₦200k</strong>
          </div>
          <div class="flex justify-between py-3">
            <div><span class="text-[11px] text-bvmuted">Savings</span><div class="w-[130px]"><ProgressTrack :percent="58" height="6px" /></div></div>
            <strong class="text-[12px]">₦174k / ₦300k</strong>
          </div>
        </BasePanel>

        <BasePanel>
          <template #head>
            <h2 class="text-[17px] font-bold m-0">Upcoming money</h2>
            <button class="bg-transparent border-0 text-bvgreen2 font-extrabold text-[11px]">Calendar →</button>
          </template>
          <div class="flex items-center gap-[14px]">
            <div class="w-[54px] h-[54px] rounded-[13px] bg-bvmint grid place-items-center text-center text-bvgreen2">
              <div><small class="text-[8px] uppercase block">MAY</small><b class="text-[18px]">15</b></div>
            </div>
            <div><strong class="text-[12px]">Rent Vault allocation</strong><p class="text-[10px] text-bvmuted mt-1">Scheduled · ₦100,000</p></div>
          </div>
          <div class="h-px bg-[#eef0ed] my-[17px]" />
          <div class="flex items-center gap-[14px]">
            <div class="w-[54px] h-[54px] rounded-[13px] bg-bvmint grid place-items-center text-center text-bvgreen2">
              <div><small class="text-[8px] uppercase block">MAY</small><b class="text-[18px]">20</b></div>
            </div>
            <div><strong class="text-[12px]">Electricity bill</strong><p class="text-[10px] text-bvmuted mt-1">Due · estimated ₦32,000</p></div>
          </div>
        </BasePanel>
      </div>
    </div>
  </div>
</template>
