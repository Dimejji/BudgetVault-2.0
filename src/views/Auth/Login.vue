<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ email: '', password: '', remember: true })
const loading = ref(false)
const errorMsg = ref('')
const formRef = ref(null)

const rules = {
  required: (v) => !!v || 'This field is required.',
  email: (v) => /.+@.+\..+/.test(v) || 'Enter a valid email address.',
}

async function handleSubmit() {
  errorMsg.value = ''
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await auth.login(form)
    router.push({ name: 'dashboard' })
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}

function fillDemo() {
  form.email = 'demo@quidly.dev'
  form.password = 'demo1234'
}
</script>

<template>
  <div class="min-h-screen bg-paper flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="relative bg-ink rounded-t-2xl px-8 pt-8 pb-6 text-paper">
        <p class="font-mono text-xs tracking-widest text-gold uppercase">Quidly · Partner Access</p>
        <h1 class="font-display text-4xl font-bold tracking-tight mt-1">Welcome back</h1>
        <p class="text-sm text-paper/60 mt-2">Log in to your partner dashboard.</p>
      </div>

      <div class="relative h-0 bg-ink">
        <div class="absolute inset-x-0 -bottom-2 flex justify-between px-2">
          <span v-for="n in 14" :key="n" class="w-4 h-4 rounded-full bg-paper"></span>
        </div>
      </div>

      <div class="bg-white rounded-b-2xl shadow-xl px-8 pt-10 pb-8">
        <v-alert v-if="errorMsg" type="error" variant="tonal" density="comfortable" class="mb-5" :text="errorMsg" />

        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            :rules="[rules.required, rules.email]"
            variant="outlined"
            density="comfortable"
            class="mb-1"
          />
          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            :rules="[rules.required]"
            variant="outlined"
            density="comfortable"
            class="mb-1"
          />

          <div class="flex items-center justify-between mb-2">
            <v-checkbox v-model="form.remember" label="Remember me" density="compact" hide-details />
            <a href="#" class="text-sm text-gray-500 hover:text-ink">Forgot password?</a>
          </div>

          <v-btn
            type="submit"
            block
            size="large"
            :loading="loading"
            class="!bg-ink !text-gold font-display font-semibold tracking-wide mt-4 !rounded-xl"
            elevation="0"
          >
            Log in
          </v-btn>
        </v-form>

        <button
          type="button"
          @click="fillDemo"
          class="w-full text-center text-xs font-mono text-gray-400 hover:text-gold mt-4 transition-colors"
        >
          Use demo credentials (demo@quidly.dev)
        </button>

        <p class="text-center text-sm text-gray-500 mt-6">
          New partner?
          <RouterLink to="/register" class="text-ink font-semibold hover:text-gold transition-colors">Create an account</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>