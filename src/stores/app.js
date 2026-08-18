import { defineStore } from 'pinia'

const COLLAB_VIEWS = ['couple', 'business', 'student']

function coachReply(question) {
  const x = question.toLowerCase()
  if (x.includes('overspending') || x.includes('cut first')) {
    return 'Start with flexible spending rather than essentials. Review food, transport and small recurring purchases first, then set a weekly limit that protects your upcoming commitments.'
  }
  if (x.includes('goal') || x.includes('save')) {
    return 'You are currently saving about 15% in this demo. A ₦100,000 goal is possible only if the amount left after essentials and planned commitments supports it. Reserve the target first, then spend from what remains.'
  }
  if (x.includes('next month') || x.includes('plan')) {
    return 'For next month, reserve fixed commitments, choose one savings target, then divide the remaining flexible money into weekly limits.'
  }
  if (x.includes('doing')) {
    return 'Overall, your budget looks healthy in this demo: savings are moving in the right direction, but flexible spending deserves attention.'
  }
  if (x.includes('break down')) {
    return 'Think of your money in three layers: essentials and commitments first, savings second, and flexible spending last. Your current pattern suggests the flexible layer is the easiest place to create room.'
  }
  return 'Based on the information currently shown in your BudgetVault, protect essential commitments first, keep your savings target realistic, and use the remaining balance for flexible spending.'
}

export const useAppStore = defineStore('app', {
  state: () => ({
    currentView: 'dashboard',
    sidebarOpen: false,
    collabOpen: false,
    toast: { visible: false, message: '' },
    toastTimer: null,
    aiMessages: [
      {
        role: 'coach',
        text: "Hi! I'm your BudgetVault Coach. I can help you make sense of your money without making the numbers feel complicated. What would you like to understand?",
      },
    ],
  }),
  getters: {
    isCollabView: (state) => COLLAB_VIEWS.includes(state.currentView),
  },
  actions: {
    show(viewId) {
      this.currentView = viewId
      if (COLLAB_VIEWS.includes(viewId)) {
        this.collabOpen = true
      }
      this.sidebarOpen = false
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    closeSidebar() {
      this.sidebarOpen = false
    },
    toggleCollab() {
      this.collabOpen = !this.collabOpen
    },
    showToast(message) {
      this.toast.message = message
      this.toast.visible = true
      clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => {
        this.toast.visible = false
      }, 2200)
    },
    demoConnect(label) {
      window.alert(`${label} — demo flow opened. Production authentication should hand off to an authorized bank/payment-provider flow.`)
    },
    coachAsk(question) {
      if (!question.trim()) return
      this.aiMessages.push({ role: 'user', text: question })
      setTimeout(() => {
        this.aiMessages.push({ role: 'coach', text: coachReply(question) })
      }, 450)
    },
  },
})
