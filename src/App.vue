<script setup>
import { computed } from 'vue'
import { useAppStore } from './stores/app'
import Sidebar from './components/Sidebar.vue'
import Toast from './components/Toast.vue'

import Dashboard from './views/Dashboard.vue'
import Banks from './views/Banks.vue'
import Business from './views/Business.vue'
import Couple from './views/Couple.vue'
import Student from './views/Student.vue'
import SmartVaults from './views/SmartVaults.vue'
import BudgetPlanner from './views/BudgetPlanner.vue'
import ExpenseTracking from './views/ExpenseTracking.vue'
import BillSettlement from './views/BillSettlement.vue'
import Goals from './views/Goals.vue'
import Notifications from './views/Notifications.vue'
import MoneyCalendar from './views/MoneyCalendar.vue'
import FinancialGps from './views/FinancialGps.vue'
import Subscriptions from './views/Subscriptions.vue'
import MoneyPersonality from './views/MoneyPersonality.vue'
import YearEndReview from './views/YearEndReview.vue'
import AiCoach from './views/AiCoach.vue'

const app = useAppStore()

const viewMap = {
  dashboard: Dashboard,
  banks: Banks,
  business: Business,
  couple: Couple,
  student: Student,
  'smart-vaults': SmartVaults,
  'budget-planner': BudgetPlanner,
  'expense-tracking': ExpenseTracking,
  'bill-settlement': BillSettlement,
  goals: Goals,
  notifications: Notifications,
  'money-calendar': MoneyCalendar,
  'financial-gps': FinancialGps,
  subscriptions: Subscriptions,
  'money-personality': MoneyPersonality,
  'year-end-review': YearEndReview,
  'ai-coach': AiCoach,
}

const activeComponent = computed(() => viewMap[app.currentView] || Dashboard)
</script>

<template>
  <div class="min-h-screen flex bg-bvcream">
    <Sidebar />

    <main class="w-full md:ml-[270px] md:w-[calc(100%-270px)] p-[14px] md:p-[30px] min-w-0">
      <!-- mobile topbar -->
      <div class="flex md:hidden items-center justify-between mb-[14px]">
        <strong class="text-[15px]">BudgetVault</strong>
        <button
          class="border-0 bg-[#17624e] text-white rounded-[10px] w-[42px] h-[42px] text-[18px]"
          @click="app.toggleSidebar()"
        >
          ☰
        </button>
      </div>

      <component :is="activeComponent" />
    </main>

    <Toast />
  </div>
</template>
