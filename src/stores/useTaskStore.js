import {
  defineStore
} from 'pinia'

import {
  ref
} from 'vue'

export const useTaskStore = defineStore('task', () => {
  
  // state
  const [
    t_id,
    t_text,
    t_pd,
    t_ed,
    t_is_C,
    t_is_I,
    $reset
  ] = [
    ref(""),
    ref(""),
    ref(""),
    ref(""),
    ref(false),
    ref(false),
    () => {
      t_id.value = "";
      t_text.value = "";
      t_pd.value = "";
      t_ed.value = "";
      t_is_C.value = false;
      t_is_I.value = false;
    }
  ]
  
  return {
    t_id,
    t_text,
    t_pd,
    t_ed,
    t_is_C,
    t_is_I,
    $reset
  }
  
})