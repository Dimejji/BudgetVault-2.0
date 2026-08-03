<script setup>
import { mockStats, mockRecentOrders, mockApiKeys, formatNaira } from '../lib/mockData'
import { ref } from 'vue'
import DashboardLayout from './Layout/DashboardLayout.vue'

const stats = [
  { label: 'Total Payments', value: mockStats.totalPayments, icon: 'mdi-swap-horizontal' },
  { label: 'Successful', value: mockStats.successfulPayments, icon: 'mdi-check-circle-outline', tone: 'success' },
  { label: 'Failed', value: mockStats.failedPayments, icon: 'mdi-close-circle-outline', tone: 'danger' },
  { label: 'Tickets Sold', value: mockStats.ticketsSold, icon: 'mdi-ticket-confirmation-outline' },
  { label: 'Revenue', value: formatNaira(mockStats.revenue), icon: 'mdi-cash-multiple', wide: true },
]

const statusStyles = {
  successful: 'bg-green-50 text-success',
  failed: 'bg-red-50 text-danger',
  pending: 'bg-amber-50 text-amber-700',
  cancelled: 'bg-gray-100 text-gray-500',
}

const copied = ref(false)
function copyKey() {
  navigator.clipboard?.writeText(mockApiKeys.sandboxKey)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
    <DashboardLayout>
         <div>
    <h1 class="font-display text-3xl font-bold text-ink tracking-tight">Overview</h1>
    <p class="text-gray-500 text-sm mt-1">Snapshot of your ticket payment activity.</p>

    <!-- Ticket-stub stat cards -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
      <div
        v-for="s in stats"
        :key="s.label"
        class="relative bg-white rounded-xl border border-black/5 shadow-sm px-5 py-4"
        :class="s.wide ? 'col-span-2' : ''"
      >
        <div class="flex items-center justify-between">
          <span class="font-mono text-[10px] uppercase tracking-widest text-gray-400">{{ s.label }}</span>
          <v-icon :icon="s.icon" size="18" :class="s.tone === 'success' ? 'text-success' : s.tone === 'danger' ? 'text-danger' : 'text-gray-300'" />
        </div>
        <p class="font-display text-3xl font-bold text-ink mt-2">{{ s.value }}</p>
        <!-- notch -->
        <span class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-paper border border-black/5"></span>
        <span class="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-paper border border-black/5"></span>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-6 mt-8">
      <!-- Recent orders -->
      <div class="col-span-2 bg-white rounded-xl border border-black/5 shadow-sm">
        <div class="px-6 py-4 border-b border-black/5 flex items-center justify-between">
          <h2 class="font-display text-xl font-semibold text-ink">Recent orders</h2>
          <RouterLink to="/dashboard/orders" class="text-xs font-mono text-gray-400 hover:text-gold">View all →</RouterLink>
        </div>
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-gray-400 font-mono text-[11px] uppercase tracking-wider">
              <th class="px-6 py-3 font-normal">Reference</th>
              <th class="py-3 font-normal">Customer</th>
              <th class="py-3 font-normal">Amount</th>
              <th class="py-3 font-normal">Status</th>
              <th class="py-3 font-normal">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in mockRecentOrders" :key="o.reference" class="border-t border-black/5">
              <td class="px-6 py-3 font-mono text-xs text-ink">{{ o.reference }}</td>
              <td class="py-3 text-gray-700">{{ o.customer }}</td>
              <td class="py-3 text-gray-700">{{ formatNaira(o.amount) }}</td>
              <td class="py-3">
                <span class="text-xs px-2 py-0.5 rounded-full font-medium capitalize" :class="statusStyles[o.status]">
                  {{ o.status }}
                </span>
              </td>
              <td class="py-3 text-gray-400 text-xs">{{ new Date(o.createdAt).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Sandbox API key quick view -->
      <div class="bg-ink rounded-xl p-6 text-paper relative overflow-hidden">
        <p class="font-mono text-[10px] uppercase tracking-widest text-gold">Sandbox key</p>
        <p class="font-mono text-xs mt-3 break-all text-paper/70 leading-relaxed">{{ mockApiKeys.sandboxKey }}</p>
        <v-btn
          size="small"
          variant="tonal"
          class="!bg-gold/10 !text-gold mt-4"
          prepend-icon="mdi-content-copy"
          @click="copyKey"
        >
          {{ copied ? 'Copied!' : 'Copy key' }}
        </v-btn>
        <RouterLink to="/dashboard/api-keys" class="block text-xs font-mono text-paper/40 hover:text-gold mt-4">
          Manage all keys →
        </RouterLink>
      </div>
    </div>
  </div>
    </DashboardLayout>
 
</template>