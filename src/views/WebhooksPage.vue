<script setup>
import { ref, reactive } from 'vue'
import DashboardLayout from '@/views/Layout/DashboardLayout.vue'
import { mockWebhooks, generateFakeSecret, simulateDelay } from '@/lib/mockData'

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
  <DashboardLayout title="Webhooks" subtitle="Get notified the moment a payment or ticket status changes.">
    <div class="flex justify-end mb-6">
      <v-btn class="!bg-ink !text-gold !rounded-xl" prepend-icon="mdi-plus" @click="dialog = true">Add endpoint</v-btn>
    </div>

    <div class="grid gap-4">
      <div v-for="hook in webhooks" :key="hook.id" class="bg-white rounded-xl border border-black/5 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full" :class="hook.enabled ? 'bg-success' : 'bg-gray-300'"></span>
            <p class="font-mono text-sm text-ink">{{ hook.url }}</p>
          </div>
          <div class="flex items-center gap-3">
            <v-switch :model-value="hook.enabled" density="compact" hide-details color="success" @update:model-value="toggleEnabled(hook)" />
            <v-btn icon="mdi-delete-outline" variant="text" size="small" class="!text-danger" @click="removeHook(hook)" />
          </div>
        </div>

        <div class="mt-4 bg-paper rounded-lg px-4 py-3 flex items-center justify-between">
          <div>
            <p class="font-mono text-[10px] uppercase tracking-widest text-gray-400">Signing secret</p>
            <p class="font-mono text-xs text-ink mt-1">{{ revealedSecrets[hook.id] ? hook.secret : mask(hook.secret) }}</p>
          </div>
          <div class="flex gap-2">
            <v-btn size="small" variant="text" @click="toggleReveal(hook.id)">
              {{ revealedSecrets[hook.id] ? 'Hide' : 'Reveal' }}
            </v-btn>
            <v-btn size="small" variant="text" prepend-icon="mdi-content-copy" @click="copy(hook.secret)">Copy</v-btn>
            <v-btn size="small" variant="text" class="!text-danger" :loading="rotating === hook.id" @click="rotateSecret(hook)">
              Rotate
            </v-btn>
          </div>
        </div>
      </div>

      <p v-if="!webhooks.length" class="text-center text-gray-400 text-sm py-12">No webhook endpoints configured yet.</p>
    </div>

    <v-dialog v-model="dialog" max-width="420">
      <v-card class="!rounded-xl">
        <v-card-title class="font-display text-xl">Add webhook endpoint</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.url" label="Endpoint URL" placeholder="https://yourapp.com/webhooks/quidly" variant="outlined" density="comfortable" />
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn class="!bg-ink !text-gold" :loading="saving" @click="handleAdd">Add endpoint</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" timeout="2200">{{ snackbar.text }}</v-snackbar>
  </DashboardLayout>
</template>