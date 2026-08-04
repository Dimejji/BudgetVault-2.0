<script setup>
import { reactive, ref } from 'vue'
import DashboardLayout from '@/views/Layout/DashboardLayout.vue'
import { mockPartnerProfile, simulateDelay } from '@/lib/mockData'

const profile = reactive({ ...mockPartnerProfile })
const passwords = reactive({ current: '', next: '', confirm: '' })

const savingProfile = ref(false)
const savingPassword = ref(false)
const snackbar = ref({ show: false, text: '', color: 'success' })

async function saveProfile() {
  savingProfile.value = true
  await simulateDelay(900)
  savingProfile.value = false
  snackbar.value = { show: true, text: 'Profile updated.', color: 'success' }
}

async function changePassword() {
  if (passwords.next !== passwords.confirm) {
    snackbar.value = { show: true, text: 'New passwords do not match.', color: 'error' }
    return
  }
  savingPassword.value = true
  await simulateDelay(900)
  savingPassword.value = false
  Object.assign(passwords, { current: '', next: '', confirm: '' })
  snackbar.value = { show: true, text: 'Password changed.', color: 'success' }
}
</script>

<template>
  <DashboardLayout title="Settings" subtitle="Manage your partner profile and account security.">
    <div class="grid grid-cols-2 gap-6">
      <!-- Profile -->
      <div class="bg-white rounded-xl border border-black/5 shadow-sm p-6">
        <p class="font-display text-xl font-semibold text-ink mb-4">Company profile</p>
        <v-text-field v-model="profile.companyName" label="Company name" variant="outlined" density="comfortable" class="mb-1" />
        <v-text-field v-model="profile.contactName" label="Contact person" variant="outlined" density="comfortable" class="mb-1" />
        <v-text-field v-model="profile.email" label="Account email" variant="outlined" density="comfortable" class="mb-1" />
        <v-text-field v-model="profile.phone" label="Phone" variant="outlined" density="comfortable" class="mb-1" />
        <v-text-field v-model="profile.supportEmail" label="Support email (shown to customers)" variant="outlined" density="comfortable" class="mb-1" />
        <v-btn class="!bg-ink !text-gold !rounded-xl mt-2" :loading="savingProfile" @click="saveProfile">Save changes</v-btn>
      </div>

      <!-- Security -->
      <div class="bg-white rounded-xl border border-black/5 shadow-sm p-6">
        <p class="font-display text-xl font-semibold text-ink mb-4">Security</p>
        <v-text-field v-model="passwords.current" label="Current password" type="password" variant="outlined" density="comfortable" class="mb-1" />
        <v-text-field v-model="passwords.next" label="New password" type="password" variant="outlined" density="comfortable" class="mb-1" />
        <v-text-field v-model="passwords.confirm" label="Confirm new password" type="password" variant="outlined" density="comfortable" class="mb-1" />
        <v-btn class="!bg-ink !text-gold !rounded-xl mt-2" :loading="savingPassword" @click="changePassword">Change password</v-btn>

        <v-divider class="my-6" />

        <p class="font-display text-lg font-semibold text-ink">Danger zone</p>
        <p class="text-sm text-gray-500 mt-1 mb-3">Deactivating your account disables all API access and pauses ticket sales.</p>
        <v-btn variant="tonal" class="!text-danger">Deactivate account</v-btn>
      </div>
    </div>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2200">{{ snackbar.text }}</v-snackbar>
  </DashboardLayout>
</template>