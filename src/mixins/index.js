import {
  storeToRefs
} from 'pinia'

import {
  ref,
  watch
} from 'vue'

import {
  useTaskStore
} from '@/stores/useTaskStore'

import {
  useTodosStore
} from '@/stores/useTodosStore'




export const initMixin = () => {

  // define data
  const loading = ref(false)

  // init Stores
  const myTask = useTaskStore()
  const myTodos = useTodosStore()

  // Extract Store's data
  const {
    t_id,
    t_text,
    t_pd,
    t_ed,
    t_is_C,
    t_is_I,
  } = storeToRefs(myTask)
  const {
    todos
  } = storeToRefs(myTodos)

  // update Storage automatically
  watch(() => todos.value, async (oldVal, newVal) => {
    loading.value = true
    if (!todos.value.length) {
      await localStorage.removeItem('tds_stack')
    } else {
      await localStorage.setItem('tds_stack', JSON.stringify(newVal))
    }
    setTimeout(() => {
      loading.value = false
    }, 2200);
  },
    {
      deep: true
    })

  // reset stores
  const clearTaskData = myTask.$reset
  const clearTodosData = myTodos.$reset
  
  // start or create new task
  const startNewTask = async () => {
    await todos.value.push({
      iid: Date() + "" + Date.now(),
      txt: t_text.value,
      PDate: t_pd.value,
      EDate: t_ed.value,
      is_Ctd: t_is_C.value,
      is_Imnt: t_is_I.value,
    })
  }

  // delete or remove task
  const deleteTask = async (i) => {
    let existIndex = todos.value.findIndex(e => e.iid == i)
    
    await todos.value.splice(existIndex, 1);
    existIndex = '';
  }

  // send task data to store
  const uploadTask = (iid,
    txt,
    PDate,
    EDate,
    is_Ctd,
    is_Imnt) => {
    [t_id.value,
      t_text.value,
      t_pd.value,
      t_ed.value,
      t_is_C.value,
      t_is_I.value] = [iid, txt, PDate, EDate, is_Ctd, is_Imnt]
      
  }
  
  const applyUpdating = (i) => {
    let existIndex = todos.value.findIndex(e => e.iid == i)
    
    todos.value[existIndex] = {
      iid: t_id.value,
      txt: t_text.value,
      PDate: t_pd.value,
      EDate: t_ed.value,
      is_Ctd: t_is_C.value,
      is_Imnt: t_is_I.value
    }
    
    existIndex = '';
  }

  const tg_imnt = (i) => {
    let existIndex = todos.value.findIndex(e => e.iid == i)
    
    todos.value[existIndex].is_Imnt = !todos.value[existIndex].is_Imnt;
    
    existIndex = '';
  }

  const tg_ctd = (i) => {
    let existIndex = todos.value.findIndex(e => e.iid == i)
    
    todos.value[existIndex].is_Ctd = !todos.value[existIndex].is_Ctd;
    
    existIndex = '';
  }



  return {
    loading,
    t_id,
    t_text,
    t_pd,
    t_ed,
    t_is_C,
    t_is_I,
    todos,
    startNewTask,
    deleteTask,
    uploadTask,
    clearTaskData,
    clearTodosData,
    tg_imnt,
    tg_ctd,
    applyUpdating
  }

}