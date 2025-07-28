<template>
  <div class="info_dialog">
    <v-dialog persistent v-model="idg" max-width="767px">
      <input type="hidden" v-model="t_id">
      <v-card class="rounded-xl pa-2">
        <v-card-title class="d-flex align-center justify-space-between py-3">
          <h3>Task Details</h3>
          <v-btn icon variant="outlined" @click="fireClose()" :loading="loading">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="py-2 px-3 mx-2 mt-3 mb-5 rounded-lg" :style="`border-left: 2px solid ${t_is_C ? 'green' : 'grey' };font-size: 18px;white-space: pre-wrap;background: #424242;border-right: 2px solid ${t_is_I ? '#C92346' : 'grey'}`">
            {{ t_text }}
        </v-card-text>
        <v-card-text class="pt-5 pb-2 px-2 mx-2" style="white-space: pre-wrap;">
          <p><b>Start this task at: </b><br /><small class="font-weight-light">{{ t_pd }}</small></p>
        </v-card-text>
        <v-card-text class="pt-2 pb-4 px-2 mx-2" style="white-space: pre-wrap;">
          <p><b>End this task at: </b><br /><small class="font-weight-light">{{ t_ed }}</small></p>
        </v-card-text>
        <v-card-text class="d-flex flex-column pa-0 my-5">
          <v-checkbox hide-details :label="`Mark${t_is_I ? 'ed' : ''} as Important`" v-model="t_is_I" @change="mxn.tg_imnt(t_id)"></v-checkbox>
          <v-checkbox hide-details :label="`Mark${t_is_C ? 'ed' : ''} as Completed`" v-model="t_is_C" @change="mxn.tg_ctd(t_id)"></v-checkbox>
        </v-card-text>
        <v-card-actions class="d-flex align-center justify-space-between px-4 pb-4">
          <v-btn color="red" variant="elevated" elevation="0" class="px-5 rounded-xl" @click="fireDelete()" :loading="loading">
            Delete <v-icon class="ms-2">mdi-delete</v-icon>
          </v-btn>
          <v-btn color="success" variant="outlined" class="rounded-xl px-5" @click="fireUpdate()">
            Edit <v-icon class="ms-2">mdi-pencil</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
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
  
  const idg = ref(false)
  
  em.on('tg_idg', () => {
    idg.value = !idg.value
  })
  
  const mxn = initMixin()
  
  const {
    t_id,
    t_text,
    t_pd,
    t_ed,
    t_is_C,
    t_is_I,
    loading
  } = storeToRefs(mxn)
  
  const fireDelete = async () => {
    await mxn.deleteTask(t_id.value)
    setTimeout(() => {
      mxn.clearTaskData()
      idg.value = !idg.value
      em.emit('tg_ntfy', "Deleted Successfally")
    }, 2200)
  }
  
  const fireClose = () => {
    mxn.clearTaskData();
    idg.value = !idg.value
  }
  
  const fireUpdate = () => {
    em.emit('tg_udg')
    idg.value = !idg.value
  }
  
</script>