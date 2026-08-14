<script setup lang="ts">
import { ref } from 'vue'
import { mockApiKeys, generateFakeKey, simulateDelay } from '@/lib/mockData'
import MainLayout from '@/layouts/MainLayout.vue'

const keys = ref({ ...mockApiKeys })
const showSandbox = ref(false)
const showLive = ref(false)
const loadingRegenerate = ref(null) // 'sandbox' | 'live' | null
const loadingRevoke = ref(false)
const copiedKey = ref(null)

const confirmDialog = ref({ show: false, action: null, keyType: null })
const notificationSnackbar = ref({ show: false, text: '', type: 'success' })

// Mask the key with dots
function mask(key: string): string {
  return key.slice(0, 8) + '••••••••••••••••••••••••' + key.slice(-6)
}

// Copy key to clipboard
function copyKey(key: string) {
  navigator.clipboard?.writeText(key)
  copiedKey.value = key.slice(-6)
  showNotification('Key copied to clipboard', 'success')
  setTimeout(() => (copiedKey.value = null), 2000)
}

// Show notification
function showNotification(text: string, type: 'success' | 'error' = 'success') {
  notificationSnackbar.value = { show: true, text, type }
  setTimeout(() => (notificationSnackbar.value.show = false), 3000)
}

// Ask for confirmation
function askConfirm(action: string, keyType?: string) {
  confirmDialog.value = { show: true, action, keyType }
}

// Proceed with confirmed action
async function proceedConfirm() {
  const { action, keyType } = confirmDialog.value
  confirmDialog.value.show = false

  if (action === 'regenerate') {
    loadingRegenerate.value = keyType
    await simulateDelay(1000)
    const isLive = keyType === 'live'
    const newKey = generateFakeKey(isLive ? 'sk_live' : 'sk_sandbox')
    if (isLive) {
      keys.value.liveKey = newKey
    } else {
      keys.value.sandboxKey = newKey
    }
    loadingRegenerate.value = null
    showNotification(
      `${keyType === 'sandbox' ? 'Sandbox' : 'Live'} key regenerated. Old key is now invalid.`,
      'success'
    )
  }

  if (action === 'revoke') {
    loadingRevoke.value = true
    await simulateDelay(900)
    keys.value.status = keys.value.status === 'active' ? 'revoked' : 'active'
    loadingRevoke.value = false
    showNotification(
      keys.value.status === 'revoked' ? 'API access revoked' : 'API access restored',
      keys.value.status === 'revoked' ? 'error' : 'success'
    )
  }
}
</script>

<template>
  <main-layout>
      <div class="api-keys-container">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">API Keys</h1>
        <p class="page-subtitle">
          Manage the credentials your integration uses to communicate with Quidly
        </p>
      </div>
    </div>

    <!-- Status Badge -->
    <div class="status-section">
      <div
        class="status-badge"
        :class="keys.status === 'active' ? 'status-active' : 'status-revoked'"
      >
        <span class="status-dot"></span>
        <span>API access {{ keys.status }}</span>
      </div>
    </div>

    <!-- Keys Grid -->
    <div class="keys-grid">
      <!-- Sandbox Key Card -->
      <div class="key-card sandbox-card">
        <div class="key-card-header">
          <div>
            <p class="key-label">Sandbox Key</p>
            <p class="key-mode">Test Environment</p>
          </div>
          <span class="mode-badge test-badge">
            <i class="mdi mdi-beaker-outline"></i>
            Test
          </span>
        </div>

        <div class="key-display">
          <code v-if="showSandbox" class="key-text">{{ keys.sandboxKey }}</code>
          <code v-else class="key-text masked">{{ mask(keys.sandboxKey) }}</code>
        </div>

        <div class="key-actions">
          <button class="action-btn" @click="showSandbox = !showSandbox" :title="showSandbox ? 'Hide key' : 'Reveal key'">
            <i :class="`mdi ${showSandbox ? 'mdi-eye-off-outline' : 'mdi-eye-outline'}`"></i>
            {{ showSandbox ? 'Hide' : 'Reveal' }}
          </button>
          <button
            class="action-btn"
            @click="copyKey(keys.sandboxKey)"
            :class="{ 'copied': copiedKey === keys.sandboxKey.slice(-6) }"
            :title="copiedKey === keys.sandboxKey.slice(-6) ? 'Copied!' : 'Copy key'"
          >
            <i class="mdi mdi-content-copy"></i>
            {{ copiedKey === keys.sandboxKey.slice(-6) ? 'Copied' : 'Copy' }}
          </button>
          <button
            class="action-btn danger"
            @click="askConfirm('regenerate', 'sandbox')"
            :disabled="loadingRegenerate === 'sandbox'"
            :title="loadingRegenerate === 'sandbox' ? 'Regenerating...' : 'Regenerate key'"
          >
            <i class="mdi" :class="loadingRegenerate === 'sandbox' ? 'mdi-loading mdi-spin' : 'mdi-refresh'"></i>
            {{ loadingRegenerate === 'sandbox' ? 'Regenerating...' : 'Regenerate' }}
          </button>
        </div>
      </div>

      <!-- Live Key Card -->
      <div class="key-card live-card">
        <div class="key-card-header">
          <div>
            <p class="key-label">Live Key</p>
            <p class="key-mode">Production Environment</p>
          </div>
          <span class="mode-badge prod-badge">
            <i class="mdi mdi-rocket-outline"></i>
            Production
          </span>
        </div>

        <div class="key-display">
          <code v-if="showLive" class="key-text">{{ keys.liveKey }}</code>
          <code v-else class="key-text masked">{{ mask(keys.liveKey) }}</code>
        </div>

        <div class="key-actions">
          <button class="action-btn" @click="showLive = !showLive" :title="showLive ? 'Hide key' : 'Reveal key'">
            <i :class="`mdi ${showLive ? 'mdi-eye-off-outline' : 'mdi-eye-outline'}`"></i>
            {{ showLive ? 'Hide' : 'Reveal' }}
          </button>
          <button
            class="action-btn"
            @click="copyKey(keys.liveKey)"
            :class="{ 'copied': copiedKey === keys.liveKey.slice(-6) }"
            :title="copiedKey === keys.liveKey.slice(-6) ? 'Copied!' : 'Copy key'"
          >
            <i class="mdi mdi-content-copy"></i>
            {{ copiedKey === keys.liveKey.slice(-6) ? 'Copied' : 'Copy' }}
          </button>
          <button
            class="action-btn danger"
            @click="askConfirm('regenerate', 'live')"
            :disabled="loadingRegenerate === 'live'"
            :title="loadingRegenerate === 'live' ? 'Regenerating...' : 'Regenerate key'"
          >
            <i class="mdi" :class="loadingRegenerate === 'live' ? 'mdi-loading mdi-spin' : 'mdi-refresh'"></i>
            {{ loadingRegenerate === 'live' ? 'Regenerating...' : 'Regenerate' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Revoke/Restore Card -->
    <div class="access-card">
      <div class="access-content">
        <div>
          <h3 class="access-title">API Access Control</h3>
          <p class="access-description">
            Revoking will immediately disable both sandbox and live keys. No API requests will be processed.
          </p>
        </div>
        <button
          class="access-btn"
          :class="keys.status === 'active' ? 'revoke-btn' : 'restore-btn'"
          @click="askConfirm('revoke', null)"
          :disabled="loadingRevoke"
        >
          <i class="mdi" :class="loadingRevoke ? 'mdi-loading mdi-spin' : keys.status === 'active' ? 'mdi-lock-open-outline' : 'mdi-lock-outline'"></i>
          {{ loadingRevoke ? 'Processing...' : keys.status === 'active' ? 'Revoke Access' : 'Restore Access' }}
        </button>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="confirmDialog.show" class="dialog-overlay" @click="confirmDialog.show = false">
      <div class="dialog-content" @click.stop>
        <div class="dialog-header">
          <h2 class="dialog-title">Confirm Action</h2>
          <button class="dialog-close" @click="confirmDialog.show = false">
            <i class="mdi mdi-close"></i>
          </button>
        </div>

        <div class="dialog-body">
          <p v-if="confirmDialog.action === 'regenerate'" class="dialog-text">
            The current <strong>{{ confirmDialog.keyType }} key</strong> will stop working immediately.
            Any integration using it must be updated with the new key.
          </p>
          <p v-else class="dialog-text">
            This will <strong>{{ keys.status === 'active' ? 'block all' : 'restore' }}</strong> API requests from your account.
            This action cannot be easily undone.
          </p>
        </div>

        <div class="dialog-actions">
          <button class="dialog-btn cancel-btn" @click="confirmDialog.show = false">
            Cancel
          </button>
          <button class="dialog-btn confirm-btn" @click="proceedConfirm">
            {{ confirmDialog.action === 'regenerate' ? 'Regenerate Key' : keys.status === 'active' ? 'Revoke Access' : 'Restore Access' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <transition name="slide-up">
      <div v-if="notificationSnackbar.show" class="notification-toast" :class="notificationSnackbar.type">
        <div class="notification-content">
          <i class="mdi" :class="notificationSnackbar.type === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'"></i>
          <span>{{ notificationSnackbar.text }}</span>
        </div>
      </div>
    </transition>
  </div>
  </main-layout>

</template>

<style scoped>
/* Container */
.api-keys-container {
  width: 100%;
  padding: 24px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.02em;
  margin: 0;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
}

/* Status Section */
.status-section {
  margin-bottom: 28px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.status-active {
  background: #ecfdf5;
  color: #059669;
}

.status-revoked {
  background: #fef2f2;
  color: #dc2626;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Keys Grid */
.keys-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 28px;
}

@media (max-width: 900px) {
  .keys-grid {
    grid-template-columns: 1fr;
  }
}

/* Key Card Base */
.key-card {
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.key-card:hover {
  border-color: #2b7fff;
  box-shadow: 0 4px 12px rgba(43, 127, 255, 0.08);
}

/* Sandbox Card */
.sandbox-card {
  background: #ffffff;
}

.sandbox-card .key-label {
  color: #2b7fff;
}

/* Live Card */
.live-card {
  background: linear-gradient(135deg, #2b7fff 0%, #1e5fb8 100%);
  border-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.live-card:hover {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 16px rgba(43, 127, 255, 0.2);
}

.live-card .key-label {
  color: white;
}

.live-card .key-mode {
  color: rgba(255, 255, 255, 0.7);
}

.live-card .key-text {
  color: rgba(255, 255, 255, 0.85);
}

.live-card .key-text.masked {
  color: rgba(255, 255, 255, 0.6);
}

.live-card .action-btn {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  color: white;
}

.live-card .action-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Key Card Header */
.key-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.key-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0 0 4px 0;
}

.key-mode {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
}

.live-card .key-mode {
  color: rgba(255, 255, 255, 0.7);
}

/* Mode Badge */
.mode-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.test-badge {
  background: #fef3c7;
  color: #d97706;
}

.prod-badge {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

/* Key Display */
.key-display {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 16px;
  overflow: hidden;
}

.live-card .key-display {
  background: rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.1);
}

.key-text {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #1f2937;
  word-break: break-all;
  line-height: 1.6;
  letter-spacing: 0.02em;
  display: block;
  white-space: pre-wrap;
}

.key-text.masked {
  color: #9ca3af;
}

/* Key Actions */
.key-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 110px;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.action-btn:hover:not(:disabled) {
  background: #f0e6ff;
  border-color: #2b7fff;
  color: #2b7fff;
}

.action-btn.copied {
  background: #ecfdf5;
  border-color: #059669;
  color: #059669;
}

.action-btn.danger {
  color: #dc2626;
}

.action-btn.danger:hover:not(:disabled) {
  background: #fef2f2;
  border-color: #dc2626;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn i {
  font-size: 14px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.mdi-spin {
  animation: spin 1s linear infinite;
}

/* Access Card */
.access-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 24px;
  transition: all 0.3s ease;
}

.access-card:hover {
  border-color: #2b7fff;
  box-shadow: 0 4px 12px rgba(43, 127, 255, 0.08);
}

.access-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.access-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.access-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.access-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.revoke-btn {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.revoke-btn:hover:not(:disabled) {
  background: #fee2e2;
  border-color: #fca5a5;
}

.restore-btn {
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.restore-btn:hover:not(:disabled) {
  background: #d1fae5;
  border-color: #6ee7b7;
}

.access-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.access-btn i {
  font-size: 16px;
}

@media (max-width: 640px) {
  .api-keys-container {
    padding: 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .access-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .access-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Dialog Overlay */
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dialog-content {
  background: white;
  border-radius: 14px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  max-width: 420px;
  width: 90%;
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.dialog-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.dialog-close:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.dialog-body {
  padding: 20px 24px;
}

.dialog-text {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

.dialog-text strong {
  color: #1f2937;
  font-weight: 600;
}

.dialog-actions {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  justify-content: flex-end;
}

.dialog-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: #f3f4f6;
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.cancel-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.confirm-btn {
  background: #2b7fff;
  color: white;
  border: none;
}

.confirm-btn:hover {
  background: #1e5fb8;
  box-shadow: 0 4px 12px rgba(43, 127, 255, 0.3);
}

/* Notification Toast */
.notification-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 40;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.notification-toast.success {
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.notification-toast.error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.notification-toast i {
  font-size: 16px;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@media (max-width: 640px) {
  .notification-toast {
    bottom: 16px;
    right: 16px;
    left: 16px;
  }
}
</style>