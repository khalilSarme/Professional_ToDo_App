<template>
  <div class="update_dialog">
    <v-dialog persistent max-width="767px" v-model="udg">
      <form @submit.prevent>
        <v-card class="rounded-xl pa-2">
          <v-card-title class="d-flex align-center justify-space-between py-3">
            <h3>Edit Task</h3>
            <v-btn icon variant="outlined" color="red" @click="udg = !udg" :loading="loading">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="px-2 mt-2">
            <v-text-field label="What do you want to do ?" v-model="t_text" variant="outlined" clearable></v-text-field>
            <v-date-input label="Start this task at" v-model="t_pd" variant="outlined" clearable></v-date-input>
            <v-date-input label="End this task at" v-model="t_ed" variant="outlined" clearable></v-date-input>
          </v-card-text>
          <v-card-actions class="pb-4 px-4 d-flex justify-start" v-if="(t_text && t_pd && t_ed)">
            <v-btn variant="elevated" elevation="0" class="rounded-xl px-5" color="primary" @click="fireUpdate()" :loading="loading">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>
<script setup>
  import {
    ref,
    inject
  } from 'vue'

  import {
    storeToRefs
  } from 'pinia'

  import {
    initMixin
  } from '@/mixins'

  
  const em = inject('emitter')

  const udg = ref(false)

  em.on('tg_udg', () => {
    udg.value = !udg.value
  })

  const mxn = initMixin()

  const {
    t_id,
    t_text,
    t_pd,
    t_ed,
    loading,
    todos
  } = storeToRefs(mxn)


  const fireUpdate = async () => {
    await mxn.applyUpdating(t_id.value)
    setTimeout(() => {
      mxn.clearTaskData()
      udg.value = !udg.value
      em.emit('tg_ntfy', "Updated Successfally")
    }, 2200)
  }

</script>