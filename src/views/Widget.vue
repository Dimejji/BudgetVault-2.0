<template>
  <div class="checkout-page">
    <div class="checkout-card">
      <!-- Header -->
      <div class="header">
        <div class="brand">
          <div class="brand-icon">Q</div>
          <span class="brand-name">Quidly</span>
        </div>
        <div class="amount-badge">{{ formattedAmount }}</div>
      </div>

      <!-- State: loading session -->
      <div v-if="loadingSession" class="state-block">
        <div class="spinner" />
        <p>Loading checkout session…</p>
      </div>

      <!-- State: invalid session -->
      <div v-else-if="!session.valid" class="state-block error">
        <p>⚠ This payment link is invalid or has expired.</p>
      </div>

      <!-- State: result screen -->
      <div v-else-if="result" class="state-block result">
        <div :class="['result-icon', result.status]">
          {{ result.status === 'completed' ? '✓' : '✕' }}
        </div>
        <h3>{{ result.status === 'completed' ? 'Payment successful' : 'Payment failed' }}</h3>
        <p class="muted">Reference: {{ session.reference }}</p>
        <p v-if="result.status !== 'completed'" class="muted">{{ result.reason }}</p>
        <button class="btn primary" @click="returnToMerchant">
          Continue
        </button>
      </div>

      <!-- Main checkout form -->
      <div v-else>
        <div class="summary">
          <div class="row">
            <span>Merchant</span>
            <strong>{{ session.eventName }}</strong>
          </div>
          <div class="row">
            <span>Customer</span>
            <strong>{{ session.customerEmail }}</strong>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tabs">
          <!-- <button
            :class="['tab', { active: method === 'card' }]"
            @click="method = 'card'"
          >
            Card
          </button> -->
          <button
            :class="['tab', { active: method === 'bank_transfer' }]"
            @click="method = 'bank_transfer'"
          >
            Bank Transfer
          </button>
        </div>

        <!-- Card form -->
        <form v-if="method === 'card'" @submit.prevent="submitCard" class="form">
          <label class="field">
            <span>Card number</span>
            <input
              v-model="card.number"
              type="text"
              inputmode="numeric"
              maxlength="19"
              placeholder="4242 4242 4242 4242"
              @input="card.number = formatCardNumber(card.number)"
              required
            />
          </label>

          <div class="field-row">
            <label class="field">
              <span>Expiry (MM/YY)</span>
              <input
                v-model="card.expiry"
                type="text"
                maxlength="5"
                placeholder="12/28"
                @input="card.expiry = formatExpiry(card.expiry)"
                required
              />
            </label>
            <label class="field">
              <span>CVV</span>
              <input
                v-model="card.cvv"
                type="password"
                inputmode="numeric"
                maxlength="4"
                placeholder="123"
                required
              />
            </label>
          </div>

          <label class="field">
            <span>Cardholder name</span>
            <input v-model="card.name" type="text" placeholder="Jane Doe" required />
          </label>

          <p v-if="formError" class="form-error">{{ formError }}</p>

          <button class="btn primary" type="submit" :disabled="processing">
            {{ processing ? 'Processing…' : `Pay ${formattedAmount}` }}
          </button>

          <p class="test-hint">
            Test mode: card ending <strong>0000</strong> fails, any other number succeeds.
          </p>
        </form>

        <!-- Bank transfer -->
        <div v-else class="form">
          <div class="bank-details">
            <div class="row"><span>Bank</span><strong>Opay</strong></div>
            <div class="row"><span>Account number</span><strong>9132378328</strong></div>
            <div class="row"><span>Account name</span><strong>Ifiok Usanga</strong></div>
            <div class="row"><span>Amount</span><strong>{{ formattedAmount }}</strong></div>
            <div class="row"><span>Reference</span><strong>{{ session.reference }}</strong></div>
          </div>
          <p class="muted small">
            In test mode, simulate what happens after a customer makes a transfer.
          </p>
          <div class="btn-group">
            <button class="btn primary" :disabled="processing" @click="submitBankTransfer(true)">
              {{ processing ? 'Processing…' : "I've made the transfer" }}
            </button>
            <!-- <button class="btn ghost" :disabled="processing" @click="submitBankTransfer(false)">
              Simulate failed transfer
            </button> -->
          </div>
        </div>
      </div>

      <div class="footer">
        <span>🔒 TLS secured · Test environment</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

// ---- Config ----
// Point this at your Supabase Edge Function base URL if you want the widget
// to actually update transaction status. Leave as-is to run fully mocked
// (no network calls) for local/frontend-only testing.
const CALLBACK_ENDPOINT = import.meta.env.VITE_QUIDLY_CALLBACK_URL || ''

// ---- Session (from URL query params, as produced by your init function) ----
const session = reactive({
  valid: false,
  sessionId: '',
  reference: '',
  amount: 0,
  currency: 'NGN',
  eventName: '',
  customerEmail: '',
  returnUrl: '',
})

const loadingSession = ref(true)
const method = ref('bank_transfer')
const processing = ref(false)
const formError = ref('')
const result = ref(null) // { status: 'completed' | 'failed', reason }

const card = reactive({
  number: '',
  expiry: '',
  cvv: '',
  name: '',
})

const formattedAmount = computed(() => {
  const n = Number(session.amount || 0)
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: session.currency || 'NGN',
    minimumFractionDigits: 2,
  }).format(n)
})

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const sessionId = params.get('session_id') || params.get('session')
  const reference = params.get('reference')

  if (!sessionId || !reference) {
    session.valid = false
    loadingSession.value = false
    return
  }

  session.sessionId = sessionId
  session.reference = reference
  session.amount = Number(params.get('amount') || 0)
  session.currency = params.get('currency') || 'NGN'
  session.eventName = params.get('event_name') || 'Test Event'
  session.customerEmail = params.get('email') || params.get('customer_email') || ''
  session.returnUrl = params.get('return_url') || ''
  session.valid = true
  loadingSession.value = false
})

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function validateCard() {
  const digits = card.number.replace(/\s/g, '')
  if (digits.length < 12) return 'Enter a valid card number'
  if (!/^\d{2}\/\d{2}$/.test(card.expiry)) return 'Enter expiry as MM/YY'
  if (card.cvv.length < 3) return 'Enter a valid CVV'
  if (!card.name.trim()) return "Enter the cardholder's name"
  return ''
}

async function submitCard() {
  formError.value = validateCard()
  if (formError.value) return

  processing.value = true
  await sleep(1200) // simulate network/processing latency

  const digits = card.number.replace(/\s/g, '')
  const outcome = digits.endsWith('0000') ? 'failed' : 'success'
  await finishPayment(outcome, outcome === 'failed' ? 'Card declined (simulated)' : null)
}

async function submitBankTransfer(success) {
  processing.value = true
  await sleep(1000)
  await finishPayment(
    success ? 'success' : 'failed',
    success ? null : 'Bank transfer not confirmed (simulated)'
  )
}

async function finishPayment(outcome, reason) {
  let status = outcome === 'success' ? 'completed' : 'failed'

  // Optionally notify your backend so the transaction row updates
  if (CALLBACK_ENDPOINT) {
    try {
      await fetch(CALLBACK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: session.sessionId,
          outcome: outcome === 'success' ? 'success' : 'failed',
          payment_method: method.value,
        }),
      })
    } catch (e) {
      console.error('Callback failed', e)
    }
  }

  processing.value = false
  result.value = { status, reason }
}

function returnToMerchant() {
  if (!session.returnUrl) return
  const url = new URL(session.returnUrl)
  url.searchParams.set('reference', session.reference)
  url.searchParams.set('status', result.value.status)
  window.location.href = url.toString()
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f6fb;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.checkout-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(20, 30, 60, 0.08);
  padding: 28px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #2f6bff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.brand-name {
  font-weight: 600;
  font-size: 16px;
}

.amount-badge {
  background: #eef2ff;
  color: #2f4bff;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.summary {
  background: #f8f9fc;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 16px;
}

.row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 3px 0;
  color: #555;
}

.row strong {
  color: #1a1a2e;
  font-weight: 600;
}

.tabs {
  display: flex;
  gap: 6px;
  background: #f1f2f6;
  padding: 4px;
  border-radius: 10px;
  margin-bottom: 18px;
}

.tab {
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
}

.tab.active {
  background: #fff;
  color: #1a1a2e;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: #444;
}

.field input {
  border: 1px solid #dde1ea;
  border-radius: 10px;
  padding: 11px 12px;
  font-size: 15px;
  outline: none;
}

.field input:focus {
  border-color: #2f6bff;
}

.field-row {
  display: flex;
  gap: 12px;
}

.field-row .field {
  flex: 1;
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 13px 16px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.btn.primary {
  background: #2f6bff;
  color: #fff;
}

.btn.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.ghost {
  background: #fff;
  color: #d33;
  border: 1px solid #f0c9c9;
}

.btn-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bank-details {
  background: #f8f9fc;
  border-radius: 10px;
  padding: 14px;
}

.muted {
  color: #888;
  font-size: 13px;
}

.muted.small {
  font-size: 12px;
}

.test-hint {
  font-size: 12px;
  color: #999;
  text-align: center;
}

.form-error {
  color: #d33;
  font-size: 13px;
  margin: -6px 0 0;
}

.state-block {
  text-align: center;
  padding: 30px 10px;
}

.state-block.error {
  color: #d33;
}

.result-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin: 0 auto 12px;
  color: #fff;
}

.result-icon.completed {
  background: #22c55e;
}

.result-icon.failed {
  background: #ef4444;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid #e0e4ee;
  border-top-color: #2f6bff;
  border-radius: 50%;
  margin: 0 auto 12px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.footer {
  margin-top: 20px;
  text-align: center;
  font-size: 11px;
  color: #aaa;
}
</style>