<template>
  <div class="create_dialog">
    <v-dialog persistent v-model="cdg" max-width="767px">
      <form @submit.prevent>
        <v-card class="rounded-xl pa-2">
          <v-card-title class="d-flex align-center justify-space-between py-3">
            <h3>Create Task</h3>
            <v-btn icon variant="outlined" color="red" @click="cdg = !cdg" :loading="loading">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="px-2 mt-2">
            <v-text-field label="What do you want to do ?" v-model="t_text" variant="outlined" clearable></v-text-field>
            <v-date-input label="Start this task at" v-model="t_pd" variant="outlined" clearable></v-date-input>
            <v-date-input label="End this task at" v-model="t_ed" variant="outlined" clearable></v-date-input>
            <v-checkbox hide-details label="Mark as Important" v-model="t_is_I"></v-checkbox>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-space-between pb-4 px-4" v-if="(t_text && t_pd && t_ed)">
            <v-btn variant="elevated" elevation="0" class="rounded-xl px-5" color="primary" @click="fireCreate()" :loading="loading">
              Save
            </v-btn>
            <v-btn variant="outlined" color="grey" class="rounded-xl px-5" @click="mxn.clearTaskData()">
              Clear
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>
<script setup>
  import {
    inject,
    ref
  } from 'vue'

  import {
    storeToRefs
  } from 'pinia'

  import {
    initMixin
  } from '@/mixins'

  const em = inject('emitter')

  const cdg = ref(false)

  em.on('tg_cdg', () => {
    cdg.value = !cdg.value
  })

  const mxn = initMixin()

  const {
    t_text,
    t_pd,
    t_ed,
    t_is_I,
    loading
  } = storeToRefs(mxn)

  const fireCreate = async () => {
    await mxn.startNewTask()
    setTimeout(() => {
      mxn.clearTaskData()
      cdg.value = !cdg.value
      em.emit('tg_ntfy', "Started Successfally")
    }, 2200)
  }
</script>