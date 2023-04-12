<template>
  <div>
    <v-row dense>
      <v-col cols="8">
        <UserCabinetTable
          :todos="todos"
          :user-id="userId"
          @update-todos="initTodos"
        />
      </v-col>
      <v-col cols="4">
        <UserCabinetTaskCalendar
          :todos="todos"
          class="mb-2"
        />
        <UserCabinetChat :user-id="userId" />
      </v-col>
    </v-row>
    <TheSnackBar ref="cabinetToast" />
  </div>
</template>

<script lang="ts" setup>
import UserCabinetTable from '@/modules/UserCabinet/components/UserCabinetTable.vue';
import UserCabinetTaskCalendar from '@/modules/UserCabinet/components/UserCabinetTaskCalendar.vue';
import {computed, onMounted, ref} from 'vue';
import {Todo} from '@/modules/UserCabinet/interfaces/todos.interface';
import {useUserCabinetStore} from '@/modules/UserCabinet/store/userCabinetStore';
import {useAuthorizationStore} from '@/modules/Authorization/store/authorizationStore';
import TheSnackBar from '@/components/TheSnackBar.vue';
import UserCabinetChat from '@/modules/UserCabinet/components/UserCabinetChat.vue';

const cabinetStore = useUserCabinetStore()
const authStore = useAuthorizationStore()


const cabinetToast = ref<InstanceType<typeof TheSnackBar> | null>(null)
const todos = ref<Todo[]>([])

const userId = computed((): number | null => authStore.userId)

const initTodos = async () => {
  try {
    await cabinetStore.loadTodosByUserId(userId.value)
    todos.value = cabinetStore.todos
  } catch (error: any) {
    const errorMessage = error.response.data.message
    cabinetToast.value.openSnackBar(errorMessage, 'error')
  }
}

onMounted(() => {
  initTodos()
})
</script>