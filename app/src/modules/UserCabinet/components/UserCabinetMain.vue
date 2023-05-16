<template>
  <div>
    <v-row dense>
      <v-col cols="8">
        <UserCabinetTaskCalendar
          :todos="todos"
          class="mb-2"
        />
        <UserCabinetTable
          :todos="todos"
          @update-todos="initTodos"
        />
      </v-col>
      <v-col cols="4">
        <TheChat />
      </v-col>
    </v-row>
    <TheSnackBar ref="cabinetToast" />
  </div>
</template>

<script lang="ts" setup>
import UserCabinetTable from '@/modules/UserCabinet/components/UserCabinetTable.vue';
import UserCabinetTaskCalendar from '@/modules/UserCabinet/components/UserCabinetTaskCalendar.vue';
import {computed, onMounted, ref} from 'vue';
import type {Todo} from '@/modules/UserCabinet/interfaces';
import {useUserCabinetStore} from '@/modules/UserCabinet/store';
import {useAuthorizationStore} from '@/modules/Authorization/store';
import TheSnackBar from '@/components/TheSnackBar.vue';
import { TheChat } from '@/modules/Chat';

const cabinetStore = useUserCabinetStore()
const authStore = useAuthorizationStore()

const cabinetToast = ref<InstanceType<typeof TheSnackBar> | null>(null)

const todos = ref<Todo[]>([])

const userId = computed((): number | null => authStore.userId)

const initTodos = async () => {
  if (!userId.value) {
    return
  }

  try {
    await cabinetStore.loadTodosByUserId(userId.value)
    todos.value = cabinetStore.todos
  } catch (error: any) {
    const errorMessage = error.response.data.message

    if (cabinetToast.value) {
      cabinetToast.value.openSnackBar(errorMessage, 'error')
    }
  }
}

onMounted(() => {
  initTodos()
})
</script>