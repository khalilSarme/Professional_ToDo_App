<template>
  <div class="todos">
    <v-container class="d-flex flex-column" style="gap: 20px">
      <v-card class="pb-0 pt-2 rounded-xl" v-if="todos.length" color="transparent">
        <v-card-title>
          <h4>Filter By</h4>
        </v-card-title>
        <v-card-text class="py-0">
          <v-select :items="filters" density="compact" variant="outlined" v-model="selectedFilter" clearable rounded="pill"></v-select>
        </v-card-text>
      </v-card>

      <v-card color="transparent" v-if="todos.length" elevation="0">
        <h1 class="px-2">I Want to do:</h1>
      </v-card>
      <v-card class="rounded-xl pa-3" v-else>
        <v-card-title class="font-weight-light" style="white-space: pre-wrap">You won't to do anything , Are you want to start somthing regularly ? .try Vuetika now.! </v-card-title>
        <v-card-text class="mt-3 pb-0">
          <h2>Note:</h2>
        </v-card-text>
        <v-card-text class="pb-0">
          <h3 class="d-flex align-center font-weight-light"><span class="d-inline-flex me-4" style="background: #C92346;width: 20px;aspect-ratio: 1/1"></span>hint to Important Task</h3>
        </v-card-text>
        <v-card-text class="">
          <h3 class="d-flex align-center font-weight-light"><span class="d-inline-flex me-4" style="background: green;width: 20px;aspect-ratio: 1/1"></span>hint to Completed Task</h3>
        </v-card-text>
      </v-card>
      <v-card class="pa-2 rounded-xl" v-for="task in filtered_todos" :key="task.iid" @click="uploadData(task.iid)" :style="`border-left: 4px solid ${task.is_Ctd ? 'green': '#424242'};${task.is_Imnt ? 'border-right: 4px solid #C92346' : 'border-right: 4px solid #424242'}`">
        <v-card-title>
          <h3>
            {{ task.txt.split(' ').length > 4 ? task.txt.split(' ').slice(0,4).join(' ') + '  ...' : task.txt }}
          </h3>
        </v-card-title>
      </v-card>
      <v-btn icon class="mx-auto position-fixed" style="right: 22px;bottom: 25px;width: 60px;height: 60px;" color="primary" variant="elevated" @click="openDialog()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>
<script setup>
  import {
    inject,
    ref
  } from 'vue'

  import {
    initMixin
  } from '@/mixins'

  import {
    storeToRefs
  } from 'pinia'

  const em = inject('emitter')

  const mxn = initMixin()

  const {
    todos,
    loading
  } = storeToRefs(mxn)

  const uploadData = (i) => {
    let existIndex = todos.value.findIndex(e => e.iid == i)

    let [id,
      txt,
      PDate,
      EDate,
      is_Ctd,
      is_Imnt] = [todos.value[existIndex].iid,
      todos.value[existIndex].txt,
      todos.value[existIndex].PDate,
      todos.value[existIndex].EDate,
      todos.value[existIndex].is_Ctd,
      todos.value[existIndex].is_Imnt]

    mxn.uploadTask(id, txt, PDate, EDate, is_Ctd, is_Imnt)

    existIndex = ''
    em.emit('tg_idg')
  }

  const openDialog = () => {
    em.emit('tg_cdg')
  }

  const fireDeleteAll = () => {
    mxn.clearTodosData()
    em.emit('tg_ntfy', "All tasks deleted successfally")
  }

  const filters = ['Completed', 'Non Completed', 'Important', 'Non Important']

  const selectedFilter = ref(null)

  const filtered_todos = computed(() => {
    if (selectedFilter.value == 'Completed') {
      return todos.value.filter(e => e.is_Ctd)
    }
    if (selectedFilter.value == 'Non Completed') {
      return todos.value.filter(e => !e.is_Ctd)
    }
    if (selectedFilter.value == 'Important') {
      return todos.value.filter(e => e.is_Imnt)
    }
    if (selectedFilter.value == 'Non Important') {
      return todos.value.filter(e => !e.is_Imnt)
    }

    selectedFilter.value = null
    return todos.value
  })
</script>