<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/views/Layout/DashboardLayout.vue'
import { mockApiKeys, generateFakeKey, simulateDelay } from '@/lib/mockData'

const keys = ref({ ...mockApiKeys })
const showSandbox = ref(false)
const showLive = ref(false)
const loadingRegenerate = ref(null) // 'sandbox' | 'live' | null
const loadingRevoke = ref(false)
const snackbar = ref({ show: false, text: '', color: 'success' })

const confirmDialog = ref({ show: false, action: null, keyType: null })

function mask(key) {
  return key.slice(0, 10) + '••••••••••••••••••••' + key.slice(-4)
}

function copy(key) {
  navigator.clipboard?.writeText(key)
  snackbar.value = { show: true, text: 'Key copied to clipboard.', color: 'success' }
}

function askConfirm(action, keyType) {
  confirmDialog.value = { show: true, action, keyType }
}

async function proceedConfirm() {
  const { action, keyType } = confirmDialog.value
  confirmDialog.value.show = false

  if (action === 'regenerate') {
    loadingRegenerate.value = keyType
    await simulateDelay(1000)
    keys.value[keyType === 'sandbox' ? 'sandboxKey' : 'liveKey'] = generateFakeKey(keyType === 'sandbox' ? 'sk_sandbox' : 'sk_live')
    loadingRegenerate.value = null
    snackbar.value = { show: true, text: `${keyType === 'sandbox' ? 'Sandbox' : 'Live'} key regenerated. Old key is now invalid.`, color: 'success' }
  }

  if (action === 'revoke') {
    loadingRevoke.value = true
    await simulateDelay(900)
    keys.value.status = keys.value.status === 'active' ? 'revoked' : 'active'
    loadingRevoke.value = false
    snackbar.value = { show: true, text: keys.value.status === 'revoked' ? 'API access revoked.' : 'API access restored.', color: keys.value.status === 'revoked' ? 'error' : 'success' }
  }
}
</script>

<template>
  <DashboardLayout title="API Keys" subtitle="Manage the credentials your integration uses to talk to Quidly.">
    <div class="mb-6">
      <span
        class="text-xs px-3 py-1 rounded-full font-medium"
        :class="keys.status === 'active' ? 'bg-green-50 text-success' : 'bg-red-50 text-danger'"
      >
        ● API access {{ keys.status }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <!-- Sandbox key -->
      <div class="bg-white rounded-xl border border-black/5 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <p class="font-mono text-[10px] uppercase tracking-widest text-gray-400">Sandbox key</p>
          <span class="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">Test mode</span>
        </div>
        <p class="font-mono text-sm mt-3 text-ink break-all">
          {{ showSandbox ? keys.sandboxKey : mask(keys.sandboxKey) }}
        </p>
        <div class="flex gap-2 mt-4">
          <v-btn size="small" variant="tonal" @click="showSandbox = !showSandbox">
            {{ showSandbox ? 'Hide' : 'Reveal' }}
          </v-btn>
          <v-btn size="small" variant="tonal" prepend-icon="mdi-content-copy" @click="copy(keys.sandboxKey)">Copy</v-btn>
          <v-btn
            size="small"
            variant="tonal"
            class="!text-danger"
            :loading="loadingRegenerate === 'sandbox'"
            @click="askConfirm('regenerate', 'sandbox')"
          >
            Regenerate
          </v-btn>
        </div>
      </div>

      <!-- Live key -->
      <div class="bg-ink rounded-xl p-6 text-paper">
        <div class="flex items-center justify-between">
          <p class="font-mono text-[10px] uppercase tracking-widest text-gold">Live key</p>
          <span class="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-success font-medium">Production</span>
        </div>
        <p class="font-mono text-sm mt-3 text-paper/80 break-all">
          {{ showLive ? keys.liveKey : mask(keys.liveKey) }}
        </p>
        <div class="flex gap-2 mt-4">
          <v-btn size="small" variant="tonal" class="!bg-white/5 !text-paper" @click="showLive = !showLive">
            {{ showLive ? 'Hide' : 'Reveal' }}
          </v-btn>
          <v-btn size="small" variant="tonal" class="!bg-white/5 !text-paper" prepend-icon="mdi-content-copy" @click="copy(keys.liveKey)">
            Copy
          </v-btn>
          <v-btn
            size="small"
            variant="tonal"
            class="!bg-gold/10 !text-gold"
            :loading="loadingRegenerate === 'live'"
            @click="askConfirm('regenerate', 'live')"
          >
            Regenerate
          </v-btn>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-black/5 shadow-sm p-6 mt-6 flex items-center justify-between">
      <div>
        <p class="font-display text-lg font-semibold text-ink">API access</p>
        <p class="text-sm text-gray-500 mt-0.5">Revoking disables both sandbox and live keys immediately.</p>
      </div>
      <v-btn
        variant="tonal"
        :class="keys.status === 'active' ? '!text-danger' : '!text-success'"
        :loading="loadingRevoke"
        @click="askConfirm('revoke', null)"
      >
        {{ keys.status === 'active' ? 'Revoke access' : 'Restore access' }}
      </v-btn>
    </div>

    <v-dialog v-model="confirmDialog.show" max-width="420">
      <v-card class="!rounded-xl">
        <v-card-title class="font-display text-xl">Are you sure?</v-card-title>
        <v-card-text class="text-sm text-gray-600">
          <span v-if="confirmDialog.action === 'regenerate'">
            The current {{ confirmDialog.keyType }} key will stop working immediately. Any integration using it must be updated.
          </span>
          <span v-else>
            This will {{ keys.status === 'active' ? 'block' : 'restore' }} all API requests from your account.
          </span>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn variant="text" @click="confirmDialog.show = false">Cancel</v-btn>
          <v-btn class="!bg-ink !text-gold" @click="proceedConfirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2500">{{ snackbar.text }}</v-snackbar>
  </DashboardLayout>
</template>