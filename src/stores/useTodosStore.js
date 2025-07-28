import {
  defineStore
} from 'pinia'

import {
  ref
} from 'vue'

export const useTodosStore = defineStore('todos', () => {
  
  // state
  const [
    todos,
    $reset
  ] = [
    ref(JSON.parse(localStorage.getItem('tds_stack')) || []),
    () => {
      todos.value = []
    }
  ]
  
  return {
    todos,
    $reset
  }
  
})