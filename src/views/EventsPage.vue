<script setup>
import { ref, reactive } from 'vue'
import DashboardLayout from '@/views/Layout/DashboardLayout.vue'
import { mockEvents, formatNaira, simulateDelay } from '@/lib/mockData'

const events = ref(JSON.parse(JSON.stringify(mockEvents)))
const dialog = ref(false)
const saving = ref(false)
const snackbar = ref({ show: false, text: '' })

const statusStyles = {
  published: 'bg-green-50 text-success',
  draft: 'bg-amber-50 text-amber-700',
}

const form = reactive({
  name: '',
  venue: '',
  date: '',
  ticketName: '',
  ticketPrice: null,
  ticketCapacity: null,
})

function resetForm() {
  Object.assign(form, { name: '', venue: '', date: '', ticketName: '', ticketPrice: null, ticketCapacity: null })
}

function openCreate() {
  resetForm()
  dialog.value = true
}

async function handleCreate() {
  if (!form.name || !form.venue || !form.date) return
  saving.value = true
  await simulateDelay(1000)
  events.value.unshift({
    id: `evt_${Date.now()}`,
    name: form.name,
    venue: form.venue,
    date: new Date(form.date).toISOString(),
    status: 'draft',
    ticketTypes: form.ticketName
      ? [{ id: `tt_${Date.now()}`, name: form.ticketName, price: Number(form.ticketPrice) || 0, capacity: Number(form.ticketCapacity) || 0, sold: 0 }]
      : [],
  })
  saving.value = false
  dialog.value = false
  snackbar.value = { show: true, text: 'Event created as draft.' }
}

async function togglePublish(event) {
  event.status = event.status === 'published' ? 'draft' : 'published'
  snackbar.value = { show: true, text: `${event.name} is now ${event.status}.` }
}

async function deleteEvent(event) {
  events.value = events.value.filter((e) => e.id !== event.id)
  snackbar.value = { show: true, text: `${event.name} deleted.` }
}

function ticketsSummary(event) {
  const sold = event.ticketTypes.reduce((sum, t) => sum + t.sold, 0)
  const capacity = event.ticketTypes.reduce((sum, t) => sum + t.capacity, 0)
  return `${sold} / ${capacity}`
}
</script>

<template>
  <DashboardLayout title="Events" subtitle="Create events and manage the ticket types partners can sell.">
    <div class="flex justify-end mb-6">
      <v-btn class="!bg-ink !text-gold !rounded-xl" prepend-icon="mdi-plus" @click="openCreate">Create event</v-btn>
    </div>

    <div class="grid gap-4">
      <div
        v-for="event in events"
        :key="event.id"
        class="bg-white rounded-xl border border-black/5 shadow-sm p-6 flex items-center justify-between"
      >
        <div>
          <div class="flex items-center gap-3">
            <p class="font-display text-xl font-semibold text-ink">{{ event.name }}</p>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium capitalize" :class="statusStyles[event.status]">
              {{ event.status }}
            </span>
          </div>
          <p class="text-sm text-gray-500 mt-1">{{ event.venue }} · {{ new Date(event.date).toLocaleDateString() }}</p>
          <div class="flex gap-4 mt-3">
            <span v-for="tt in event.ticketTypes" :key="tt.id" class="font-mono text-xs text-gray-500 bg-paper px-2 py-1 rounded-md">
              {{ tt.name }} · {{ formatNaira(tt.price) }} · {{ tt.sold }}/{{ tt.capacity }} sold
            </span>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <div class="text-right">
            <p class="font-display text-lg font-bold text-ink">{{ ticketsSummary(event) }}</p>
            <p class="text-[11px] text-gray-400 font-mono uppercase">tickets sold</p>
          </div>
          <v-menu>
            <template #activator="{ props }">
              <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props" />
            </template>
            <v-list density="compact">
              <v-list-item @click="togglePublish(event)">
                {{ event.status === 'published' ? 'Unpublish' : 'Publish' }}
              </v-list-item>
              <v-list-item class="!text-danger" @click="deleteEvent(event)">Delete</v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>

      <p v-if="!events.length" class="text-center text-gray-400 text-sm py-12">No events yet — create your first one.</p>
    </div>

    <v-dialog v-model="dialog" max-width="480">
      <v-card class="!rounded-xl">
        <v-card-title class="font-display text-xl">Create event</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.name" label="Event name" variant="outlined" density="comfortable" class="mb-1" />
          <v-text-field v-model="form.venue" label="Venue" variant="outlined" density="comfortable" class="mb-1" />
          <v-text-field v-model="form.date" label="Event date" type="datetime-local" variant="outlined" density="comfortable" class="mb-1" />
          <v-divider class="my-3" />
          <p class="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">First ticket type (optional)</p>
          <v-text-field v-model="form.ticketName" label="Ticket name" variant="outlined" density="comfortable" class="mb-1" />
          <div class="grid grid-cols-2 gap-3">
            <v-text-field v-model="form.ticketPrice" label="Price (₦)" type="number" variant="outlined" density="comfortable" />
            <v-text-field v-model="form.ticketCapacity" label="Capacity" type="number" variant="outlined" density="comfortable" />
          </div>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn class="!bg-ink !text-gold" :loading="saving" @click="handleCreate">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" timeout="2200">{{ snackbar.text }}</v-snackbar>
  </DashboardLayout>
</template>