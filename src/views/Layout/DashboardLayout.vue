<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const auth = useAuthStore()

const navItems = [
  { label: 'Overview', icon: 'mdi-view-dashboard-outline', to: '/dashboard' },
  { label: 'API Keys', icon: 'mdi-key-outline', to: '/dashboard/api-keys' },
  { label: 'Events', icon: 'mdi-calendar-star', to: '/dashboard/events' },
  { label: 'Webhooks', icon: 'mdi-webhook', to: '/dashboard/webhooks' },
  { label: 'Settlements', icon: 'mdi-bank-outline', to: '/dashboard/settlements' },
  { label: 'Settings', icon: 'mdi-cog-outline', to: '/dashboard/settings' },
]

const drawer = ref(true)
const initials = computed(() =>
  (auth.partner?.companyName || 'Q P').split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
)

function handleLogout() {
  auth.logout()
  router.push('/')
}

function toggleEnv() {
  auth.setEnvironment(auth.environment === 'sandbox' ? 'live' : 'sandbox')
}
</script>

<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        permanent
        class="!bg-ink"
        width="260"
      >
        <div class="px-6 pt-6 pb-4">
          <p class="font-display text-2xl font-bold text-paper tracking-tight">
            Quidly
          </p>
          <p class="font-mono text-[11px] text-gold uppercase tracking-widest mt-0.5">
            Partner Portal
          </p>
        </div>

        <v-list nav class="px-3">
          <v-list-item
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :prepend-icon="item.icon"
            :title="item.label"
            rounded="lg"
            class="!text-paper/70 mb-1 [&.v-list-item--active]:!bg-gold/10 [&.v-list-item--active]:!text-gold"
          />
        </v-list>

        <template #append>
          <div class="px-4 pb-5">
            <v-btn
              variant="text"
              block
              class="!text-paper/50 !justify-start"
              prepend-icon="mdi-logout"
              @click="handleLogout"
            >
              Log out
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>


      <v-main>
        <header class="flex items-center justify-between px-8 h-16 border-b border-black/5 bg-white">
          <div>
            <p class="font-display text-lg font-semibold text-ink leading-none">
              {{ auth.partner?.companyName || 'Partner' }}
            </p>
          </div>

          <div class="flex items-center gap-4">
            <button
              @click="toggleEnv"
              class="font-mono text-xs px-3 py-1.5 rounded-full border transition-colors"
              :class="auth.environment === 'sandbox'
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-green-50 border-green-300 text-success'"
            >
              ● {{ auth.environment === 'sandbox' ? 'Sandbox mode' : 'Live mode' }}
            </button>

            <div class="w-9 h-9 rounded-full bg-ink text-gold font-display font-bold flex items-center justify-center text-sm">
              {{ initials }}
            </div>
          </div>
        </header>


        <div class="p-8">
          <slot />
        </div>
      </v-main>

    </v-layout>
  </v-app>
</template>