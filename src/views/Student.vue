<script setup>
import VaultShell from '../components/VaultShell.vue'
</script>

<template>
  <VaultShell
    theme="student"
    icon="🎓"
    eyebrow="Student Vault"
    title="Stay on top of school and everyday money."
    subtitle="A simpler financial workspace for students — allowance, school fees, transport, food, goals and the spending you can safely make today."
    badge="Student mode"
  >
    <template #tabs>
      <button class="border border-[#3d74a8] bg-white/10 text-white rounded-[10px] px-[11px] py-2 text-[10px] font-bold">My overview</button>
      <button class="border border-white/[.11] bg-white/[.035] text-[#a9b8c9] rounded-[10px] px-[11px] py-2 text-[10px] font-bold">School</button>
      <button class="border border-white/[.11] bg-white/[.035] text-[#a9b8c9] rounded-[10px] px-[11px] py-2 text-[10px] font-bold">Allowance</button>
      <button class="border border-white/[.11] bg-white/[.035] text-[#a9b8c9] rounded-[10px] px-[11px] py-2 text-[10px] font-bold">Goals</button>
    </template>

    <template #kpis>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Monthly allowance</small>
        <strong class="block mt-[7px] text-[20px] text-[#61adff]">₦120,000</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">Expected this month</p>
      </div>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Safe to spend</small>
        <strong class="block mt-[7px] text-[20px] text-[#20ae86]">₦8,500</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">Today</p>
      </div>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">School fund</small>
        <strong class="block mt-[7px] text-[20px]">₦76,000</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">Reserved</p>
      </div>
      <div class="bg-white/[.045] border border-white/[.09] rounded-[14px] p-[15px]">
        <small class="block text-[#8194a9] text-[9px] uppercase tracking-[.08em]">Saved this month</small>
        <strong class="block mt-[7px] text-[20px] text-[#61adff]">₦18,000</strong>
        <p class="m-0 mt-1 text-[9px] text-[#8295a9]">15% of allowance</p>
      </div>
    </template>

    <template #main>
      <section class="bg-[#0b1828]/[.54] border border-white/[.09] rounded-[15px] p-[17px]">
        <h3 class="m-0 mb-[14px] text-[12px] text-[#f3f6fa]">My student budget</h3>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div class="min-w-[50%]">
            <b class="text-[11px]">School &amp; materials</b>
            <div class="text-[#8296ad]">₦76k / ₦100k</div>
            <div class="h-[6px] bg-[#1a2b42] rounded-full mt-[7px] overflow-hidden"><i class="block h-full rounded-full bg-[#4f9fff]" style="width:76%" /></div>
          </div>
          <b>₦76k</b>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div class="min-w-[50%]">
            <b class="text-[11px]">Transport</b>
            <div class="text-[#8296ad]">₦18k / ₦25k</div>
            <div class="h-[6px] bg-[#1a2b42] rounded-full mt-[7px] overflow-hidden"><i class="block h-full rounded-full bg-[#4f9fff]" style="width:72%" /></div>
          </div>
          <b>₦18k</b>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] text-[10px]">
          <div class="min-w-[50%]">
            <b class="text-[11px]">Food</b>
            <div class="text-[#8296ad]">₦12.5k / ₦30k</div>
            <div class="h-[6px] bg-[#1a2b42] rounded-full mt-[7px] overflow-hidden"><i class="block h-full rounded-full bg-[#4f9fff]" style="width:42%" /></div>
          </div>
          <b>₦12.5k</b>
        </div>
        <div class="rounded-xl p-3 text-[10px] leading-[1.5] mt-[10px] bg-[#142f50] border border-[#2b527b] text-[#b4cbe3]">Your school fund is protected first. That makes the remaining balance easier to understand and spend confidently.</div>
        <div class="flex gap-2 flex-wrap mt-[13px]">
          <button class="bg-white text-[#10202e] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">＋ Add student goal</button>
          <button class="border border-white/[.12] bg-white/[.055] text-[#eaf0f6] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">Edit budget</button>
        </div>
      </section>

      <section class="bg-[#0b1828]/[.54] border border-white/[.09] rounded-[15px] p-[17px]">
        <h3 class="m-0 mb-[14px] text-[12px] text-[#f3f6fa]">Campus commitments</h3>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div><b class="text-[11px]">Semester fees</b><div class="text-[#8296ad]">Aug 28</div></div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#1a3657] text-[#71b5ff]">₦85k</span>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] border-b border-white/[.075] text-[10px]">
          <div><b class="text-[11px]">Textbooks</b><div class="text-[#8296ad]">Sep 2</div></div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#1a3657] text-[#71b5ff]">₦24k</span>
        </div>
        <div class="flex justify-between items-center gap-4 py-[11px] text-[10px]">
          <div><b class="text-[11px]">Accommodation</b><div class="text-[#8296ad]">Sep 15</div></div>
          <span class="px-2 py-[5px] rounded-full text-[8px] font-extrabold bg-[#403616] text-[#eec44a]">₦150k</span>
        </div>
        <div class="flex gap-2 flex-wrap mt-[13px]">
          <button class="bg-white text-[#10202e] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">View school calendar</button>
        </div>
      </section>
    </template>

    <template #footer>
      <section class="bg-[#0b1828]/[.54] border border-white/[.09] rounded-[15px] p-[17px] mt-3">
        <div class="flex justify-between items-center mb-2">
          <h3 class="m-0 text-[12px] text-[#f3f6fa]">Student money check-in</h3>
          <span class="text-[10px] text-[#8296ad]">This week</span>
        </div>
        <div class="flex justify-between items-center py-[11px] border-b border-white/[.075] text-[10px]"><span>Spent on campus</span><b>₦17,400</b></div>
        <div class="flex justify-between items-center py-[11px] border-b border-white/[.075] text-[10px]"><span>Saved toward goals</span><b class="text-[#61adff]">₦6,000</b></div>
        <div class="flex justify-between items-center py-[11px] text-[10px]"><span>Remaining weekly allowance</span><b class="text-[#20ae86]">₦14,200</b></div>
        <div class="flex gap-2 flex-wrap mt-[10px]">
          <button class="bg-white text-[#10202e] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">See my spending</button>
          <button class="border border-white/[.12] bg-white/[.055] text-[#eaf0f6] rounded-[9px] px-[11px] py-[9px] text-[9px] font-bold">Ask money coach</button>
        </div>
      </section>
    </template>
  </VaultShell>
</template>
