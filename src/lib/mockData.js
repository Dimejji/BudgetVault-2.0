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
// append to src/lib/mockData.js

export const mockEvents = [
  {
    id: 'evt_01',
    name: 'Afrobeats Night Lagos',
    venue: 'Landmark Event Centre, Lagos',
    date: '2026-09-20T19:00:00Z',
    status: 'published',
    ticketTypes: [
      { id: 'tt_01', name: 'Regular', price: 15000, capacity: 800, sold: 612 },
      { id: 'tt_02', name: 'VIP', price: 40000, capacity: 200, sold: 154 },
    ],
  },
  {
    id: 'evt_02',
    name: 'Tech Founders Summit',
    venue: 'Eko Convention Centre, Lagos',
    date: '2026-10-05T09:00:00Z',
    status: 'published',
    ticketTypes: [
      { id: 'tt_03', name: 'Standard', price: 25000, capacity: 300, sold: 88 },
    ],
  },
  {
    id: 'evt_03',
    name: 'Comedy Jam Abuja',
    venue: 'Transcorp Hilton, Abuja',
    date: '2026-08-30T18:00:00Z',
    status: 'draft',
    ticketTypes: [
      { id: 'tt_04', name: 'Regular', price: 10000, capacity: 500, sold: 0 },
    ],
  },
]

export const mockSettlements = [
  { id: 'stl_01', period: 'Jul 21 – Jul 27, 2026', gross: 2_150_000, fees: 64_500, refunds: 15000, net: 2_070_500, status: 'paid', paidAt: '2026-07-29T10:00:00Z' },
  { id: 'stl_02', period: 'Jul 28 – Aug 03, 2026', gross: 3_420_000, fees: 102_600, refunds: 40000, net: 3_277_400, status: 'paid', paidAt: '2026-08-05T10:00:00Z' },
  { id: 'stl_03', period: 'Aug 04 – Aug 10, 2026', gross: 1_890_000, fees: 56_700, refunds: 0, net: 1_833_300, status: 'processing', paidAt: null },
]

export const mockPartnerProfile = {
  companyName: 'Lagos Live Events',
  contactName: 'Demo Partner',
  email: 'demo@quidly.dev',
  phone: '+2348012345678',
  businessType: 'Event Organizer',
  supportEmail: 'support@lagoslive.events',
}

export function generateFakeKey(prefix = 'sk_live') {
  const chars = 'abcdef0123456789'
  let out = ''
  for (let i = 0; i < 32; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return `${prefix}_${out}`
}

export function generateFakeSecret() {
  const chars = 'abcdef0123456789'
  let out = ''
  for (let i = 0; i < 24; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return `whsec_${out}`
}

export function formatNaira(amount) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)
}

export function simulateDelay(ms = 900) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}