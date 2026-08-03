// src/stores/authStore.js
import { defineStore } from 'pinia'
import { DEMO_PARTNER, DEMO_PASSWORD, simulateDelay } from '@/lib/mockData'

const SESSION_KEY = 'quidly_partner_session'
const PARTNERS_KEY = 'quidly_registered_partners'

function readPartners() {
  const raw = localStorage.getItem(PARTNERS_KEY)
  return raw ? JSON.parse(raw) : [{ ...DEMO_PARTNER, password: DEMO_PASSWORD }]
}

function writePartners(list) {
  localStorage.setItem(PARTNERS_KEY, JSON.stringify(list))
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    partner: JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'),
    environment: 'sandbox', // sandbox | live
  }),
  getters: {
    isAuthenticated: (state) => !!state.partner,
  },
  actions: {
    async register(form) {
      await simulateDelay(1100)
      const partners = readPartners()

      if (partners.some((p) => p.email.toLowerCase() === form.email.toLowerCase())) {
        throw new Error('An account with this email already exists.')
      }

      const newPartner = {
        id: `ptn_${Date.now()}`,
        companyName: form.companyName,
        contactName: form.contactName,
        email: form.email,
        phone: form.phone,
        businessType: form.businessType,
        password: form.password,
        createdAt: new Date().toISOString(),
      }

      partners.push(newPartner)
      writePartners(partners)

      const { password, ...safePartner } = newPartner
      this.partner = safePartner
      localStorage.setItem(SESSION_KEY, JSON.stringify(safePartner))
      return safePartner
    },

    async login({ email, password }) {
      await simulateDelay(900)
      const partners = readPartners()
      const found = partners.find((p) => p.email.toLowerCase() === email.toLowerCase())

      if (!found || found.password !== password) {
        throw new Error('Incorrect email or password.')
      }

      const { password: _pw, ...safePartner } = found
      this.partner = safePartner
      localStorage.setItem(SESSION_KEY, JSON.stringify(safePartner))
      return safePartner
    },

    logout() {
      this.partner = null
      localStorage.removeItem(SESSION_KEY)
    },

    setEnvironment(env) {
      this.environment = env
    },
  },
})