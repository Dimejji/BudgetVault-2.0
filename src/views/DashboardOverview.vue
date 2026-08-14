<script setup lang="ts">
import { mockStats, mockRecentOrders, mockApiKeys, formatNaira } from '../lib/mockData'
import { ref, computed } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'

// Stats configuration
const stats = [
  {
    label: 'Total Payments',
    value: mockStats.totalPayments,
    icon: 'mdi-swap-horizontal',
    bgColor: '#e3f0ff',
    textColor: '#2b7fff'
  },
  {
    label: 'Successful',
    value: mockStats.successfulPayments,
    icon: 'mdi-check-circle-outline',
    bgColor: '#ecfdf5',
    textColor: '#059669'
  },
  {
    label: 'Failed',
    value: mockStats.failedPayments,
    icon: 'mdi-close-circle-outline',
    bgColor: '#fef2f2',
    textColor: '#dc2626'
  },
  {
    label: 'Tickets Sold',
    value: mockStats.ticketsSold,
    icon: 'mdi-ticket-confirmation-outline',
    bgColor: '#fef3c7',
    textColor: '#d97706'
  },
  {
    label: 'Revenue',
    value: formatNaira(mockStats.revenue),
    icon: 'mdi-cash-multiple',
    bgColor: '#f3e8ff',
    textColor: '#7c3aed',
    wide: true
  }
]

// Status badge styles
const statusStyles = {
  successful: {
    bg: '#ecfdf5',
    text: '#059669',
    badge: '#d1fae5',
    border: '#a7f3d0'
  },
  failed: {
    bg: '#fef2f2',
    text: '#dc2626',
    badge: '#fee2e2',
    border: '#fecaca'
  },
  pending: {
    bg: '#fffbeb',
    text: '#d97706',
    badge: '#fef3c7',
    border: '#fcd34d'
  },
  cancelled: {
    bg: '#f3f4f6',
    text: '#6b7280',
    badge: '#e5e7eb',
    border: '#d1d5db'
  }
}

const copied = ref(false)

function copyKey() {
  navigator.clipboard?.writeText(mockApiKeys.sandboxKey)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

// Format date to readable format
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <MainLayout>
    <div class="dash-container">
      <!-- Header -->
      <div class="dash-header">
        <div>
          <h1 class="dash-title">Overview</h1>
          <p class="dash-subtitle">
            Real-time snapshot of your ticket payment activity
          </p>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="stat-card"
          :class="{ 'stat-card-wide': stat.wide }"
        >
          <div class="stat-header">
            <span class="stat-label">{{ stat.label }}</span>
            <div class="stat-icon" :style="{ background: stat.bgColor }">
              <i class="mdi" :class="stat.icon" :style="{ color: stat.textColor }"></i>
            </div>
          </div>
          <p class="stat-value">{{ stat.value }}</p>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- Recent Orders Section -->
        <div class="orders-card">
          <div class="card-header">
            <h2 class="card-title">Recent Orders</h2>
            <RouterLink to="/dashboard/orders" class="view-link">
              View all <i class="mdi mdi-arrow-right"></i>
            </RouterLink>
          </div>

          <!-- Responsive Table -->
          <div class="table-wrapper">
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in mockRecentOrders" :key="order.reference">
                  <td class="ref-cell">
                    <code>{{ order.reference }}</code>
                  </td>
                  <td class="name-cell">{{ order.customer }}</td>
                  <td class="amount-cell">{{ formatNaira(order.amount) }}</td>
                  <td class="status-cell">
                    <span
                      class="status-badge"
                      :style="{
                        background: statusStyles[order.status].badge,
                        color: statusStyles[order.status].text,
                        borderColor: statusStyles[order.status].border
                      }"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="date-cell">{{ formatDate(order.createdAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- API Key Card -->
        <div class="api-card">
          <div class="api-header">
            <p class="api-label">Sandbox API Key</p>
            <div class="api-badge">
              <i class="mdi mdi-shield-check"></i>
            </div>
          </div>

          <div class="api-key-container">
            <code class="api-key">{{ mockApiKeys.sandboxKey }}</code>
          </div>

          <button class="copy-btn" @click="copyKey">
            <i class="mdi mdi-content-copy"></i>
            {{ copied ? 'Copied!' : 'Copy Key' }}
          </button>

          <RouterLink to="/dashboard/api-keys" class="manage-link">
            <i class="mdi mdi-arrow-right"></i>
            Manage all keys
          </RouterLink>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
/* Layout */
.dash-container {
  width: 100%;
  padding: 24px;
}

/* Header */
.dash-header {
  margin-bottom: 32px;
}

.dash-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.dash-subtitle {
  font-size: 14px;
  color: #6b7280;
  font-weight: 400;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  border-color: #2b7fff;
  box-shadow: 0 4px 12px rgba(43, 127, 255, 0.1);
  transform: translateY(-2px);
}

.stat-card-wide {
  grid-column: span 2;
}

@media (max-width: 768px) {
  .stat-card-wide {
    grid-column: span 1;
  }
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9ca3af;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.05);
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 24px;
}

@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* Orders Card */
.orders-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.orders-card:hover {
  border-color: #2b7fff;
  box-shadow: 0 4px 12px rgba(43, 127, 255, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f3f4f6;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.view-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
  text-decoration: none;
  transition: all 0.2s ease;
}

.view-link:hover {
  color: #2b7fff;
  gap: 10px;
}

.view-link i {
  font-size: 14px;
}

/* Table Styles */
.table-wrapper {
  overflow-x: auto;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.orders-table thead {
  background: #f9fafb;
}

.orders-table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9ca3af;
  border: none;
}

.orders-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s ease;
}

.orders-table tbody tr:hover {
  background-color: #f8f9ff;
}

.orders-table td {
  padding: 16px 24px;
  color: #4b5563;
}

.ref-cell code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #2b7fff;
  background: #e3f0ff;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
}

.amount-cell {
  font-weight: 600;
  color: #1f2937;
}

.status-cell {
  text-align: left;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid;
  text-transform: capitalize;
  transition: all 0.2s ease;
}

.status-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.date-cell {
  color: #9ca3af;
  font-size: 13px;
}

/* API Card */
.api-card {
  background: linear-gradient(135deg, #2b7fff 0%, #1e5fb8 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  padding: 24px;
  color: white;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.api-card:hover {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 24px rgba(43, 127, 255, 0.2);
  transform: translateY(-2px);
}

.api-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.api-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.api-badge {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
}

.api-key-container {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.api-key {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  word-break: break-all;
  line-height: 1.6;
  letter-spacing: 0.02em;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  transition: all 0.2s ease;
  margin-bottom: 12px;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.copy-btn i {
  font-size: 14px;
}

.manage-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.2s ease;
}

.manage-link:hover {
  color: rgba(255, 255, 255, 1);
  gap: 10px;
}

.manage-link i {
  font-size: 14px;
}

/* Responsive Design */
@media (max-width: 640px) {
  .dash-container {
    padding: 16px;
  }

  .dash-title {
    font-size: 24px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .orders-table th,
  .orders-table td {
    padding: 12px 16px;
  }

  .stat-value {
    font-size: 20px;
  }
}
</style>