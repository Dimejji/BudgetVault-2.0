<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
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
const isMobile = ref(false)

const initials = computed(() =>
  (auth.partner?.companyName || 'Q P')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
)

function handleLogout() {
  auth.logout()
  router.push('/')
}

function toggleEnv() {
  auth.setEnvironment(auth.environment === 'sandbox' ? 'live' : 'sandbox')
}

function checkScreen() {
  isMobile.value = window.innerWidth < 960
  drawer.value = !isMobile.value
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})
</script>

<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
  v-model="drawer"
  :permanent="!isMobile"
  :temporary="isMobile"
  width="260"
  class="!bg-ink"
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
       <header
  class="flex items-center justify-between px-4 md:px-8 h-16 border-b border-black/5 bg-white"
>
  <div class="flex items-center gap-3">
    <!-- Mobile Menu -->
    <v-btn
      v-if="isMobile"
      icon
      variant="text"
      @click="drawer = !drawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <div>
      <p class="font-display text-base md:text-lg font-semibold text-ink leading-none">
        {{ auth.partner?.companyName || 'Partner' }}
      </p>
    </div>
  </div>

  <div class="flex items-center gap-2 md:gap-4">
    <button
      @click="toggleEnv"
      class="font-mono text-[10px] md:text-xs px-2 md:px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap"
      :class="
        auth.environment === 'sandbox'
          ? 'bg-amber-50 border-amber-300 text-amber-700'
          : 'bg-green-50 border-green-300 text-success'
      "
    >
      ● {{ auth.environment === 'sandbox' ? 'Sandbox' : 'Live' }}
    </button>

    <div
      class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-ink text-gold font-display font-bold flex items-center justify-center text-xs md:text-sm"
    >
      {{ initials }}
    </div>
  </div>
</header>


       <div class="p-4 md:p-6 lg:p-8">
          <slot />
        </div>
      </v-main>

    </v-layout>
  </v-app>
</template>