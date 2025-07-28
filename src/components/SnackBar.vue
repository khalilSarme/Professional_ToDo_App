<template>
  <div class="notify">
    <v-snackbar v-model="snack" color="surface" :timeout="timeout" eager width="96%" max-width="538px" rounded="pill" class="mb-3">
      <h3 class="font-weight-light">{{ text }}</h3>
    </v-snackbar>
  </div>
</template>
<script setup>
  import {
    ref,
    inject
  } from 'vue'
  
  const timeout = ref(3500)
  
  const snack = ref(false)
  
  const text = ref("")
  
  const em = inject('emitter')
  
  em.on('tg_ntfy', (t) => {
    text.value = t + ""
    snack.value = !snack.value
  })
</script>