<script setup>
import { ref, reactive } from 'vue'
import { mockWebhooks, generateFakeSecret, simulateDelay } from '@/lib/mockData'
import MainLayout from '@/layouts/MainLayout.vue'

const webhooks = ref(JSON.parse(JSON.stringify(mockWebhooks)))
const revealedSecrets = ref({})
const rotating = ref(null)
const snackbar = ref({ show: false, text: '' })

const dialog = ref(false)
const saving = ref(false)
const form = reactive({ url: '' })

function mask(secret) {
  return secret.slice(0, 10) + '••••••••••••'
}

function toggleReveal(id) {
  revealedSecrets.value[id] = !revealedSecrets.value[id]
}

function copy(text) {
  navigator.clipboard?.writeText(text)
  snackbar.value = { show: true, text: 'Copied to clipboard.' }
}

async function toggleEnabled(hook) {
  hook.enabled = !hook.enabled
  snackbar.value = { show: true, text: `Webhook ${hook.enabled ? 'enabled' : 'disabled'}.` }
}

async function rotateSecret(hook) {
  rotating.value = hook.id
  await simulateDelay(900)
  hook.secret = generateFakeSecret()
  revealedSecrets.value[hook.id] = true
  rotating.value = null
  snackbar.value = { show: true, text: 'Secret rotated. Update it in your integration.' }
}

async function removeHook(hook) {
  webhooks.value = webhooks.value.filter((h) => h.id !== hook.id)
  snackbar.value = { show: true, text: 'Webhook removed.' }
}

async function handleAdd() {
  if (!form.url) return
  saving.value = true
  await simulateDelay(900)
  webhooks.value.push({
    id: `wh_${Date.now()}`,
    url: form.url,
    enabled: true,
    secret: generateFakeSecret(),
  })
  saving.value = false
  dialog.value = false
  form.url = ''
  snackbar.value = { show: true, text: 'Webhook endpoint added.' }
}
</script>

<template>
  <MainLayout title="Webhooks" subtitle="Get notified the moment a payment or ticket status changes.">
    <div class="flex justify-end mb-6">
      <v-btn class="create-btn" prepend-icon="mdi-plus" @click="dialog = true">Add endpoint</v-btn>
    </div>

    <div class="grid gap-4">
      <div v-for="hook in webhooks" :key="hook.id" class="webhook-card">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="icon-badge" style="background: #e8f5e9">
              <i class="mdi mdi-webhook" style="color: #1b8a3a"></i>
            </span>
            <div class="flex items-center gap-2">
              <span class="status-dot" :class="hook.enabled ? 'dot-on' : 'dot-off'"></span>
              <p class="font-mono text-sm hook-url">{{ hook.url }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <v-switch :model-value="hook.enabled" density="compact" hide-details color="#2b7fff" @update:model-value="toggleEnabled(hook)" />
            <v-btn icon="mdi-delete-outline" variant="text" size="small" class="!text-[#dc2626]" @click="removeHook(hook)" />
          </div>
        </div>

        <div class="secret-panel">
          <div>
            <p class="font-mono text-[10px] uppercase tracking-widest secret-label">Signing secret</p>
            <p class="font-mono text-xs secret-value mt-1">{{ revealedSecrets[hook.id] ? hook.secret : mask(hook.secret) }}</p>
          </div>
          <div class="flex gap-2">
            <v-btn size="small" variant="text" class="!text-[#2b7fff]" @click="toggleReveal(hook.id)">
              {{ revealedSecrets[hook.id] ? 'Hide' : 'Reveal' }}
            </v-btn>
            <v-btn size="small" variant="text" class="!text-[#2b7fff]" prepend-icon="mdi-content-copy" @click="copy(hook.secret)">Copy</v-btn>
            <v-btn size="small" variant="text" class="!text-[#dc2626]" :loading="rotating === hook.id" @click="rotateSecret(hook)">
              Rotate
            </v-btn>
          </div>
        </div>
      </div>

      <p v-if="!webhooks.length" class="text-center empty-state text-sm py-12">No webhook endpoints configured yet.</p>
    </div>

    <v-dialog v-model="dialog" max-width="420">
      <v-card class="!rounded-xl">
        <v-card-title class="font-display text-xl">Add webhook endpoint</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.url"
            label="Endpoint URL"
            placeholder="https://yourapp.com/webhooks/quidly"
            variant="outlined"
            density="comfortable"
            color="#2b7fff"
          />
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn class="save-btn" :loading="saving" @click="handleAdd">Add endpoint</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" timeout="2200">{{ snackbar.text }}</v-snackbar>
  </MainLayout>
</template>

<style scoped>
.v-btn{
  text-transform: none;
}
.create-btn {
  background: #2b7fff !important;
  color: #fff !important;
  border-radius: 12px !important;
  font-weight: 600;
}

.save-btn {
  background: #2b7fff !important;
  color: #fff !important;
  border-radius: 10px !important;
}

.webhook-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  padding: 24px;
  transition: box-shadow 0.2s ease;
}

.webhook-card:hover {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.icon-badge {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
}

.hook-url {
  color: #2b3e50;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  flex-shrink: 0;
}

.dot-on {
  background: #1b8a3a;
}

.dot-off {
  background: #d1d5db;
}

.secret-panel {
  margin-top: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.secret-label {
  color: #9ca3af;
}

.secret-value {
  color: #2b3e50;
}

.empty-state {
  color: #9ca3af;
}
</style>