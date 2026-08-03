// src/lib/mockData.js

export const DEMO_PARTNER = {
  id: 'ptn_demo_001',
  companyName: 'Lagos Live Events',
  contactName: 'Demo Partner',
  email: 'demo@quidly.dev',
  phone: '+2348012345678',
  businessType: 'Event Organizer',
  createdAt: '2026-05-12T10:00:00Z',
}

export const DEMO_PASSWORD = 'demo1234'

export const mockApiKeys = {
  sandboxKey: 'sk_sandbox_9f8a2c1b7e4d5f6a8b9c0d1e2f3a4b5c',
  liveKey: 'sk_live_2b7e9f1a4c8d6e5f0a3b1c9d8e7f6a5b',
  status: 'active', // active | revoked
}

export const mockStats = {
  totalPayments: 482,
  successfulPayments: 451,
  failedPayments: 31,
  ticketsSold: 1204,
  revenue: 8_420_500, // NGN
}

export const mockRecentOrders = [
  { reference: 'QD-ORD-88213', customer: 'Ifeoma Chukwu', amount: 15000, status: 'successful', createdAt: '2026-08-02T18:22:00Z' },
  { reference: 'QD-ORD-88212', customer: 'Tunde Bakare', amount: 25000, status: 'successful', createdAt: '2026-08-02T16:05:00Z' },
  { reference: 'QD-ORD-88211', customer: 'Amaka Obi', amount: 15000, status: 'failed', createdAt: '2026-08-02T14:48:00Z' },
  { reference: 'QD-ORD-88210', customer: 'Segun Adeyemi', amount: 40000, status: 'pending', createdAt: '2026-08-02T11:30:00Z' },
  { reference: 'QD-ORD-88209', customer: 'Grace Effiong', amount: 15000, status: 'successful', createdAt: '2026-08-01T20:15:00Z' },
  { reference: 'QD-ORD-88208', customer: 'Bola Fashina', amount: 25000, status: 'cancelled', createdAt: '2026-08-01T17:02:00Z' },
]

export const mockWebhooks = [
  { id: 'wh_01', url: 'https://lagoslive.events/api/webhooks/quidly', enabled: true, secret: 'whsec_a1b2c3d4e5f6' },
]

export function formatNaira(amount) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)
}

export function simulateDelay(ms = 900) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}