<script setup>
import { ref, computed } from 'vue'
import DashboardLayout from '@/views/Layout/DashboardLayout.vue'
import { mockSettlements, formatNaira, simulateDelay } from '@/lib/mockData'

const settlements = ref(mockSettlements)
const statusFilter = ref('all')
const downloading = ref(null)
const snackbar = ref({ show: false, text: '' })

const statusStyles = {
  paid: 'bg-green-50 text-success',
  processing: 'bg-amber-50 text-amber-700',
}

const filtered = computed(() =>
  statusFilter.value === 'all' ? settlements.value : settlements.value.filter((s) => s.status === statusFilter.value)
)

const totals = computed(() => ({
  gross: settlements.value.reduce((sum, s) => sum + s.gross, 0),
  fees: settlements.value.reduce((sum, s) => sum + s.fees, 0),
  net: settlements.value.reduce((sum, s) => sum + s.net, 0),
}))

async function downloadReport(settlement) {
  downloading.value = settlement.id
  await simulateDelay(1000)
  downloading.value = null
  snackbar.value = { show: true, text: `Settlement report for ${settlement.period} downloaded.` }
}
</script>

<template>
  <DashboardLayout title="Settlements" subtitle="Track payouts, platform fees, and refunds.">
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-white rounded-xl border border-black/5 shadow-sm px-5 py-4">
        <p class="font-mono text-[10px] uppercase tracking-widest text-gray-400">Gross volume</p>
        <p class="font-display text-2xl font-bold text-ink mt-1">{{ formatNaira(totals.gross) }}</p>
      </div>
      <div class="bg-white rounded-xl border border-black/5 shadow-sm px-5 py-4">
        <p class="font-mono text-[10px] uppercase tracking-widest text-gray-400">Platform fees</p>
        <p class="font-display text-2xl font-bold text-ink mt-1">{{ formatNaira(totals.fees) }}</p>
      </div>
      <div class="bg-ink rounded-xl px-5 py-4 text-paper">
        <p class="font-mono text-[10px] uppercase tracking-widest text-gold">Net payout</p>
        <p class="font-display text-2xl font-bold mt-1">{{ formatNaira(totals.net) }}</p>
      </div>
    </div>

    <div class="flex justify-end mb-4">
      <v-btn-toggle v-model="statusFilter" mandatory density="compact" class="!rounded-lg">
        <v-btn value="all" size="small">All</v-btn>
        <v-btn value="paid" size="small">Paid</v-btn>
        <v-btn value="processing" size="small">Processing</v-btn>
      </v-btn-toggle>
    </div>

    <div class="bg-white rounded-xl border border-black/5 shadow-sm">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-gray-400 font-mono text-[11px] uppercase tracking-wider">
            <th class="px-6 py-3 font-normal">Period</th>
            <th class="py-3 font-normal">Gross</th>
            <th class="py-3 font-normal">Fees</th>
            <th class="py-3 font-normal">Refunds</th>
            <th class="py-3 font-normal">Net</th>
            <th class="py-3 font-normal">Status</th>
            <th class="py-3 font-normal"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in filtered" :key="s.id" class="border-t border-black/5">
            <td class="px-6 py-3 text-ink font-medium">{{ s.period }}</td>
            <td class="py-3 text-gray-700">{{ formatNaira(s.gross) }}</td>
            <td class="py-3 text-gray-700">{{ formatNaira(s.fees) }}</td>
            <td class="py-3 text-gray-700">{{ formatNaira(s.refunds) }}</td>
            <td class="py-3 text-ink font-semibold">{{ formatNaira(s.net) }}</td>
            <td class="py-3">
              <span class="text-xs px-2 py-0.5 rounded-full font-medium capitalize" :class="statusStyles[s.status]">
                {{ s.status }}
              </span>
            </td>
            <td class="py-3 pr-6 text-right">
              <v-btn size="small" variant="text" :loading="downloading === s.id" prepend-icon="mdi-download-outline" @click="downloadReport(s)">
                Report
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <v-snackbar v-model="snackbar.show" timeout="2200">{{ snackbar.text }}</v-snackbar>
  </DashboardLayout>
</template>