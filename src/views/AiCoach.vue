<script setup>
import { ref, nextTick, watch } from 'vue'
import { useAppStore } from '../stores/app'

const app = useAppStore()
const inputText = ref('')
const messagesBox = ref(null)

function ask(q) {
  app.coachAsk(q)
}

function send() {
  const q = inputText.value.trim()
  if (!q) return
  inputText.value = ''
  ask(q)
}

watch(
  () => app.aiMessages.length,
  async () => {
    await nextTick()
    if (messagesBox.value) messagesBox.value.scrollTop = messagesBox.value.scrollHeight
  }
)
</script>

<template>
  <div class="bg-bvcream -m-[14px] md:-m-[30px] p-[14px] md:p-[30px] min-h-full">
    <div class="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-bvgreen via-bvgreen2 to-[#0d7059] text-white p-6">
      <div class="text-[#9cebd0] text-[11px] uppercase tracking-[.12em] font-extrabold">AI Coach</div>
      <h1 class="text-[24px] md:text-[30px] mt-[5px] mb-2 max-w-2xl">Your money, explained in plain language.</h1>
      <p class="text-[#c9e6dc] max-w-2xl text-[12px] leading-[1.6] m-0">Ask BudgetVault about your spending, budget, savings goals or upcoming commitments. Your coach helps you understand what is happening and what you could do next.</p>
      <div class="flex flex-wrap gap-[7px] mt-[10px]">
        <button class="border border-white/[.22] bg-white/[.08] text-white rounded-full px-[10px] py-[7px] text-[8px]" @click="ask('How am I doing this month?')">How am I doing?</button>
        <button class="border border-white/[.22] bg-white/[.08] text-white rounded-full px-[10px] py-[7px] text-[8px]" @click="ask('Where am I spending too much?')">Find overspending</button>
        <button class="border border-white/[.22] bg-white/[.08] text-white rounded-full px-[10px] py-[7px] text-[8px]" @click="ask('Can I afford my next goal?')">Check a goal</button>
        <button class="border border-white/[.22] bg-white/[.08] text-white rounded-full px-[10px] py-[7px] text-[8px]" @click="ask('Help me plan next month')">Plan next month</button>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-[1.15fr_.85fr] gap-[14px] mt-[14px]">
      <section class="bg-white border border-[#e4e2db] rounded-[17px] p-[18px] shadow-[0_5px_18px_rgba(24,35,44,.04)] flex flex-col">
        <h3 class="text-[13px] m-0 mb-3">Talk to your coach</h3>
        <div ref="messagesBox" class="min-h-[300px] max-h-[400px] overflow-y-auto flex flex-col gap-[10px] py-2">
          <div v-for="(m, i) in app.aiMessages" :key="i" class="flex gap-[10px]" :class="m.role === 'user' ? 'justify-end' : ''">
            <div v-if="m.role === 'coach'" class="w-8 h-8 rounded-[11px] grid place-items-center bg-[#dff7ee] text-[#087257] font-black shrink-0">✦</div>
            <div
              class="max-w-[86%] rounded-[13px] px-[13px] py-[11px] text-[10px] leading-[1.6]"
              :class="m.role === 'user' ? 'bg-[#0b5b48] text-white' : 'bg-[#f3f6f4] text-[#30404a]'"
            >
              {{ m.text }}
            </div>
          </div>
        </div>
        <div class="flex gap-2 border-t border-[#eceae4] pt-3 mt-auto">
          <input
            v-model="inputText"
            class="flex-1 border border-[#deddd6] rounded-[10px] px-3 py-[10px] text-[10px] outline-none"
            placeholder="e.g. Can I save ₦100,000 this month?"
            @keydown.enter="send"
          />
          <button class="border-0 bg-[#0b5b48] text-white rounded-[10px] px-[13px] py-[10px] text-[9px] font-extrabold" @click="send">Ask</button>
        </div>
        <div class="text-[8px] text-[#8b918f] leading-[1.5] mt-[11px]">Coach suggestions are educational guidance based on the information available in your BudgetVault. They are not financial, investment or lending advice.</div>
      </section>

      <section class="bg-white border border-[#e4e2db] rounded-[17px] p-[18px] shadow-[0_5px_18px_rgba(24,35,44,.04)]">
        <h3 class="text-[13px] m-0 mb-3">What your money is saying</h3>
        <div class="p-3 rounded-xl bg-[#f2faf7] border border-[#d8eee6] mb-2">
          <b class="text-[10px]">You're on track with savings</b>
          <p class="text-[9px] text-[#68757d] leading-[1.5] mt-[5px] m-0">You've saved ₦18,000 this month. Keeping your current pace could put you around ₦216,000 ahead over a full year.</p>
        </div>
        <div class="p-3 rounded-xl bg-[#f2faf7] border border-[#d8eee6] mb-2">
          <b class="text-[10px]">Your flexible spending needs attention</b>
          <p class="text-[9px] text-[#68757d] leading-[1.5] mt-[5px] m-0">Food, transport and small purchases are taking a larger share of your available money than your planned budget.</p>
        </div>
        <div class="p-3 rounded-xl bg-[#f2faf7] border border-[#d8eee6]">
          <b class="text-[10px]">One upcoming commitment</b>
          <p class="text-[9px] text-[#68757d] leading-[1.5] mt-[5px] m-0">Your next major planned payment is close enough that the coach recommends protecting that amount before discretionary spending.</p>
        </div>
        <div class="grid grid-cols-2 gap-2 mt-[9px]">
          <div class="p-3 rounded-xl bg-[#f8f7f3] border border-[#e9e7e0]">
            <small class="block text-[#80888d] text-[8px] uppercase">Budget health</small>
            <strong class="block mt-[5px] text-[16px] text-[#087257]">Good</strong>
          </div>
          <div class="p-3 rounded-xl bg-[#f8f7f3] border border-[#e9e7e0]">
            <small class="block text-[#80888d] text-[8px] uppercase">Savings pace</small>
            <strong class="block mt-[5px] text-[16px]">15%</strong>
          </div>
        </div>
      </section>
    </div>

    <section class="bg-white border border-[#e4e2db] rounded-[17px] p-[18px] shadow-[0_5px_18px_rgba(24,35,44,.04)] mt-[14px]">
      <h3 class="text-[13px] m-0 mb-3">Start with a question</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button class="bg-[#f8f8f5] border border-[#e7e6df] rounded-xl p-3 text-left" @click="ask('Break down my spending this month')">
          <b class="block text-[10px] mb-1">Break down my spending</b>
          <span class="text-[8px] text-[#7b858c] leading-[1.4]">See the categories shaping your month.</span>
        </button>
        <button class="bg-[#f8f8f5] border border-[#e7e6df] rounded-xl p-3 text-left" @click="ask('Give me a realistic savings plan')">
          <b class="block text-[10px] mb-1">Create a realistic savings plan</b>
          <span class="text-[8px] text-[#7b858c] leading-[1.4]">Turn your current income and commitments into a practical target.</span>
        </button>
        <button class="bg-[#f8f8f5] border border-[#e7e6df] rounded-xl p-3 text-left" @click="ask('What should I cut first?')">
          <b class="block text-[10px] mb-1">What should I cut first?</b>
          <span class="text-[8px] text-[#7b858c] leading-[1.4]">Find flexible areas before touching essentials.</span>
        </button>
        <button class="bg-[#f8f8f5] border border-[#e7e6df] rounded-xl p-3 text-left" @click="ask('Explain my budget simply')">
          <b class="block text-[10px] mb-1">Explain my budget simply</b>
          <span class="text-[8px] text-[#7b858c] leading-[1.4]">Get a plain-language explanation of your setup.</span>
        </button>
      </div>
    </section>
  </div>
</template>
