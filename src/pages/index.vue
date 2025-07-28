<template>
  <div class="home">
    <v-container>
      <v-card elevation="0" class="rounded-xl pa-2" max-width="767px">
        <v-card-title style="filter: brightness(85%)">
          Get Started
        </v-card-title>
        <v-card-text style="font-weight: 300;filter: brightness(80%)">
          Hi there , Vuetika is a (Task Management Tool), it can help you manage your tasks , Save your time by simple steps. Get started for Free.
        </v-card-text>
        <v-card-actions class="pb-3 ps-3">
          <v-btn class="px-3 rounded-xl" color="primary" variant="outlined" @click="openDialog()">
            Start a new task
            <v-icon class="ms-2">mdi-pencil</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card elevation="0" class="mt-5 rounded-xl pa-2" max-width="767px">
        <v-card-title style="filter: brightness(85%)">
          Preview
        </v-card-title>
        <v-card-text style="font-weight: 300;filter: brightness(80%)">
          Update , delete and filter your pending tasks by simple ways.
        </v-card-text>
        <v-card-actions class="pb-3 ps-3">
          <v-btn class="px-3 rounded-xl" color="teal" variant="outlined" to="todos">
            View pending tasks
            <v-icon class="ms-2">mdi-launch</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
  import {
    inject
  } from 'vue'
  
  const em = inject('emitter')
  
  const openDialog = () => {
    em.emit('tg_cdg')
  }
</script>