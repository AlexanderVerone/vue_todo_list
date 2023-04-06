<template>
  <v-table
    theme="dark"
    fixed-header
    fixed-footer
  >
    <thead>
      <tr>
        <td />
        <td>Задача</td>
        <td>Срок выполнения</td>
        <td />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(todo, index) in todos"
        :key="index"
      >
        <td>
          <v-checkbox v-model="todo.isDone" />
        </td>
        <td>{{ todo.description }}</td>
        <td>{{ convertFromUnix(todo.deadline) }}</td>
        <td>
          <v-tooltip
            text="Удалить задачу"
            location="end"
            theme="white"
          >
            <template #activator="{props}">
              <v-btn
                v-bind="props"
                density="compact"
                size="large"
                variant="text"
                color="red"
                icon="mdi-delete-outline"
                @click="deleteTodo(todo.id)"
              />
            </template>
          </v-tooltip>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <v-tooltip
        text="Добавить задачу"
        location="bottom"
        theme="white"
      >
        <template #activator="{props}">
          <v-btn
            v-bind="props"
            density="compact"
            size="large"
            variant="text"
            color="green"
            icon="mdi-plus-circle-outline"
            @click="openNewTodoModal"
          />
        </template>
      </v-tooltip>
    </tfoot>
  </v-table>
  <TheSnackBar ref="toast" />
  <UserCabinetNewTodoModal
    ref="addTodoModal"
    @add-todo="addTodo"
  />
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import {useAuthorizationStore} from '@/modules/Authorization/store/authorizationStore';
import TheSnackBar from '@/components/TheSnackBar.vue';
import type {Todo} from '@/modules/UserCabinet/interfaces/todos.interface';
import { convertFromUnix, convertToUnix } from '@/modules/UserCabinet/helpers/utils';
import {useUserCabinetStore} from '@/modules/UserCabinet/store/userCabinetStore';
import UserCabinetNewTodoModal from '@/modules/UserCabinet/components/UserCabinetNewTodoModal.vue';

const cabinetStore = useUserCabinetStore()
const authStore = useAuthorizationStore()

const todos = ref<Todo[]>([])
const toast = ref<InstanceType<typeof TheSnackBar> | null>(null)
const addTodoModal = ref<InstanceType<typeof UserCabinetNewTodoModal>| null>(null)

const userId = computed((): number | null => authStore.userId)

const initTodos = async () => {
  try {
    await cabinetStore.loadTodosByUserId(userId.value)
    todos.value = cabinetStore.todos
  } catch (error: any) {
    const errorMessage = error.response.data.message
    toast.value.openSnackBar(errorMessage, 'error')
  }
}

const openNewTodoModal = () => {
  addTodoModal.value.open()
}

const addTodo = async (newTodoData) => {
  try {
    //TODO: добавляем новый туду и обновляем весь список
    await initTodos()
  } catch (error: any) {
    const errorMessage = error.response.data.message
    toast.value.openSnackBar(errorMessage, 'error')
  }
}

const deleteTodo = async (todoId: number) => {
  if (!todoId) {
    return
  }

  try {
    await cabinetStore.deleteTodo(todoId)
    await initTodos()
    toast.value.openSnackBar('Задача удалена', 'success')
  } catch (error: any) {
    const errorMessage = error.response.data.message
    toast.value.openSnackBar(errorMessage, 'error')
  }
}

onMounted(() => {
  initTodos()
})
</script>