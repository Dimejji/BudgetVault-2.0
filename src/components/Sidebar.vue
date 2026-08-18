<script setup>
import { useAppStore } from '../stores/app'
const app = useAppStore()

const overview = [
  { id: 'dashboard', icon: '⌂', label: 'Dashboard' },
  { id: 'banks', icon: '▤', label: 'Banks & Cards' },
]
const planTrack = [
  { id: 'smart-vaults', icon: '◈', label: 'Smart Vaults' },
  { id: 'budget-planner', icon: '▣', label: 'Budget Planner' },
  { id: 'expense-tracking', icon: '↔', label: 'Expense Tracking' },
  { id: 'bill-settlement', icon: '★', label: 'Bill Settlement' },
  { id: 'goals', icon: '◎', label: 'Goals & Dreams' },
]
const intelligence = [
  { id: 'notifications', icon: '🔔', label: 'Notifications' },
  { id: 'money-calendar', icon: '▦', label: 'Money Calendar' },
  { id: 'financial-gps', icon: '◉', label: 'Financial GPS' },
  { id: 'subscriptions', icon: '◌', label: 'Subscriptions' },
  { id: 'money-personality', icon: '◍', label: 'Money Personality' },
  { id: 'ai-coach', icon: '✦', label: 'AI Coach' },
  { id: 'year-end-review', icon: '▥', label: 'Year-End Review' },
]
const collab = [
  { id: 'couple', icon: '💞', label: 'Couple Vault' },
  { id: 'business', icon: '💼', label: 'Business Vault' },
  { id: 'student', icon: '🎓', label: 'Student Vault' },
]
</script>

<template>
  <!-- backdrop for mobile -->
  <div
    v-if="app.sidebarOpen"
    class="fixed inset-0 bg-black/35 z-[15] md:hidden"
    @click="app.closeSidebar()"
  />

  <aside
    class="fixed inset-y-0 left-0 w-[270px] bg-bvgreen text-[#d8eee7] flex flex-col z-20 transition-transform duration-250 md:translate-x-0"
    :class="app.sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-[98px] px-6 flex items-center gap-3 border-b border-white/[.08] shrink-0">
      <div class="w-[34px] h-[34px] bg-bvgold text-[#16382e] rounded-lg grid place-items-center font-black">V</div>
      <div>
        <strong class="block text-white text-[18px]">BudgetVault</strong>
        <small class="text-[#73c9ae] text-[10px] tracking-[.06em]">FINANCIAL OPERATING SYSTEM</small>
      </div>
    </div>

    <nav class="px-3 py-[18px] overflow-auto flex-1">
      <div class="mb-[18px]">
        <div class="text-[10px] text-[#76aa9b] uppercase tracking-[.14em] px-[13px] pb-2">Overview</div>
        <a
          v-for="item in overview"
          :key="item.id"
          href="#"
          class="flex items-center gap-3 no-underline text-[#cce3dc] px-[13px] py-[11px] rounded-xl my-[3px] text-[13px] font-semibold hover:bg-[#17624e] hover:text-white"
          :class="app.currentView === item.id ? 'bg-[#17624e] text-white' : ''"
          @click.prevent="app.show(item.id)"
        >
          <span class="w-[22px] text-center text-[15px]">{{ item.icon }}</span>{{ item.label }}
        </a>
      </div>

      <div class="mb-[18px]">
        <div class="text-[10px] text-[#76aa9b] uppercase tracking-[.14em] px-[13px] pb-2">Plan &amp; Track</div>
        <a
          v-for="item in planTrack"
          :key="item.id"
          href="#"
          class="flex items-center gap-3 no-underline text-[#cce3dc] px-[13px] py-[11px] rounded-xl my-[3px] text-[13px] font-semibold hover:bg-[#17624e] hover:text-white"
          :class="app.currentView === item.id ? 'bg-[#17624e] text-white' : ''"
          @click.prevent="app.show(item.id)"
        >
          <span class="w-[22px] text-center text-[15px]">{{ item.icon }}</span>{{ item.label }}
        </a>
      </div>

      <div class="mb-[18px]">
        <div class="text-[10px] text-[#76aa9b] uppercase tracking-[.14em] px-[13px] pb-2">Intelligence</div>
        <a
          v-for="item in intelligence"
          :key="item.id"
          href="#"
          class="flex items-center gap-3 no-underline text-[#cce3dc] px-[13px] py-[11px] rounded-xl my-[3px] text-[13px] font-semibold hover:bg-[#17624e] hover:text-white"
          :class="app.currentView === item.id ? 'bg-[#17624e] text-white' : ''"
          @click.prevent="app.show(item.id)"
        >
          <span class="w-[22px] text-center text-[15px]">{{ item.icon }}</span>{{ item.label }}
        </a>
      </div>

      <div class="mb-[18px]">
        <div class="text-[10px] text-[#76aa9b] uppercase tracking-[.14em] px-[13px] pb-2">Collaboration</div>
        <button
          class="flex items-center gap-3 text-[#cce3dc] px-[13px] py-[11px] rounded-xl my-[3px] text-[13px] font-semibold w-full text-left hover:bg-[#17624e] hover:text-white"
          :class="app.collabOpen ? 'bg-[#17624e] text-white' : ''"
          @click="app.toggleCollab()"
        >
          <span class="w-[22px] text-center text-[15px]">💞</span>Collaboration
          <span class="ml-auto text-[12px] transition-transform duration-200" :class="app.collabOpen ? 'rotate-180' : ''">⌄</span>
        </button>
        <div v-show="app.collabOpen" class="pl-[25px]">
          <button
            v-for="item in collab"
            :key="item.id"
            class="w-full text-left bg-transparent text-[#a9c7bf] px-3 py-[9px] rounded-lg text-[11px] hover:bg-[#104b3d] hover:text-white"
            :class="app.currentView === item.id ? 'bg-[#104b3d] text-white' : ''"
            @click="app.show(item.id)"
          >
            {{ item.icon }} {{ item.label }}
          </button>
        </div>
      </div>
    </nav>

    <div class="border-t border-white/[.08] p-4 flex gap-[10px] items-center shrink-0">
      <div class="w-[38px] h-[38px] rounded-full bg-[#1c6b56] grid place-items-center">👤</div>
      <div>
        <strong class="text-[12px] text-white block">o.e.oladimeji</strong>
        <span class="text-[10px] text-[#76c4ad]">Account Owner</span>
      </div>
    </div>
  </aside>
</template>
