<script setup>
import { useAppStore } from '../stores/app'
import BasePanel from '../components/BasePanel.vue'

const app = useAppStore()
</script>

<template>
  <div>
    <header class="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
      <div>
        <div class="text-[11px] uppercase tracking-[.12em] font-extrabold text-bvgreen2">Bank &amp; Cards</div>
        <h1 class="mt-1 mb-[5px] text-[26px] md:text-[30px] tracking-tight font-bold">Connect your money to your plan.</h1>
        <div class="text-[13px] text-bvmuted max-w-xl">Wema Bank is the primary connection in this demo. Other banks can enter the wider connection flow.</div>
      </div>
      <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px]" @click="app.show('dashboard')">← Dashboard</button>
    </header>

    <div class="grid grid-cols-1 xl:grid-cols-[1.2fr_.8fr] gap-[18px]">
      <BasePanel>
        <template #head>
          <div>
            <h2 class="text-[17px] font-bold m-0">Wema Bank</h2>
            <span class="text-[11px] text-bvmuted">Primary bank connection</span>
          </div>
          <span class="text-[9px] font-extrabold px-2 py-[6px] rounded-full bg-[#dff7ed] text-[#167456]">Preferred</span>
        </template>

        <div class="rounded-[20px] p-[23px] text-white min-h-[230px]" style="background:linear-gradient(135deg,#084d3c,#0b624d)">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-[9px] font-extrabold">
              <div class="w-[34px] h-[34px] bg-[#fff200] text-[#17332a] rounded-[9px] grid place-items-center font-black">W</div>
              Wema Bank
            </div>
            <div class="text-[10px] bg-white/10 px-[10px] py-[7px] rounded-full text-[#c8f5e4]">● Ready to connect</div>
          </div>
          <div class="text-[9px] text-[#a9d8c9] uppercase tracking-[.1em] mt-[35px]">Available balance · demo</div>
          <div class="text-[31px] font-extrabold mt-1">₦420,000.00</div>
          <div class="flex justify-between mt-5 text-[11px]">
            <span>Account<br /><b>•••• 4821</b></span>
            <span class="text-right">Status<br /><b class="text-[#bff3df]">Verification required</b></span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-[9px] mt-[15px]">
          <div class="p-[13px] bg-[#f8faf9] border border-[#edf0ee] rounded-[13px] flex justify-between text-[11px] text-[#56645f]">Bank connection <span class="text-[9px] font-extrabold px-2 py-[6px] rounded-full bg-[#dff7ed] text-[#167456]">Not linked</span></div>
          <div class="p-[13px] bg-[#f8faf9] border border-[#edf0ee] rounded-[13px] flex justify-between text-[11px] text-[#56645f]">Ownership <span class="text-[9px] font-extrabold px-2 py-[6px] rounded-full bg-[#dff7ed] text-[#167456]">Pending</span></div>
          <div class="p-[13px] bg-[#f8faf9] border border-[#edf0ee] rounded-[13px] flex justify-between text-[11px] text-[#56645f]">Auto savings <span class="text-[9px] font-extrabold px-2 py-[6px] rounded-full bg-[#dff7ed] text-[#167456]">Off</span></div>
          <div class="p-[13px] bg-[#f8faf9] border border-[#edf0ee] rounded-[13px] flex justify-between text-[11px] text-[#56645f]">Transaction sync <span class="text-[9px] font-extrabold px-2 py-[6px] rounded-full bg-[#dff7ed] text-[#167456]">Waiting</span></div>
        </div>

        <div class="flex flex-col sm:flex-row gap-[9px] mt-4">
          <button class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px]" @click="app.demoConnect('Wema Bank')">Connect Wema Bank</button>
          <button class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px]" @click="app.demoConnect('Wema debit card')">Link Wema card</button>
        </div>
      </BasePanel>

      <aside class="bg-white border border-bvline shadow-card rounded-[20px] p-[21px]">
        <h3 class="m-0 mb-[6px] text-[17px]">Why connect?</h3>
        <p class="text-[12px] text-bvmuted leading-[1.55]">Connect your bank so BudgetVault can bring your financial picture together and support planning, safe-to-spend, savings and automation workflows.</p>

        <div class="mt-[15px] rounded-[18px] text-white p-[19px]" style="background:linear-gradient(135deg,#142b27,#0a5140)">
          <div class="w-[38px] h-[27px] rounded-[6px] bg-[#d8ba43] mb-[22px]" />
          <div class="text-[15px] tracking-[3px]">•••• •••• •••• 4821</div>
          <div class="flex justify-between mt-[17px] text-[10px]">
            <div><span class="text-[#a8c6be] text-[8px] block uppercase">Cardholder</span>DEMO USER</div>
            <div><span class="text-[#a8c6be] text-[8px] block uppercase">Valid thru</span>••/••</div>
          </div>
        </div>
        <button class="w-full mt-3 border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px]" @click="app.demoConnect('Wema debit card')">Add / link Wema card</button>

        <div class="mt-4 bg-[#fffaf0] border border-[#f4e8bd] p-[14px] rounded-[14px]">
          <strong class="text-[12px]">Bank with another institution?</strong>
          <p class="text-[10px] my-1 mb-[10px]">Keep Wema as the primary experience and use this CTA for the broader supported-bank connection flow.</p>
          <button class="border border-bvline bg-white rounded-[11px] px-[10px] py-2 font-bold text-[12px]" @click="() => window.alert('Demo: open supported banks selector')">Connect another bank →</button>
        </div>
      </aside>
    </div>
  </div>
</template>
