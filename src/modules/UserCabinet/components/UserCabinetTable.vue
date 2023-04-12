<template>
  <v-table
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
          <v-checkbox
            v-model="todo.isDone"
            hide-details
            @click="toggleTaskIsDone(todo.id)"
          />
        </td>
        <td :class="{'done': todo.isDone}">
          {{ todo.description }}
        </td>
        <td :class="{'done': todo.isDone}">
          {{ convertFromUnix(todo.deadline) }}
        </td>
        <td>
          <v-tooltip
            text="Удалить задачу"
            location="bottom"
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
  <TheSnackBar ref="tableToast" />
  <UserCabinetNewTodoModal
    ref="addTodoModal"
    @add-todo="addTodo"
  />
</template>

<script lang="ts" setup>
import {PropType, ref} from 'vue';
import TheSnackBar from '@/components/TheSnackBar.vue';
import type {NewTodo, Todo} from '@/modules/UserCabinet/interfaces/todos.interface';
import { convertFromUnix } from '@/modules/UserCabinet/helpers/utils';
import {useUserCabinetStore} from '@/modules/UserCabinet/store/userCabinetStore';
import UserCabinetNewTodoModal from '@/modules/UserCabinet/components/UserCabinetNewTodoModal.vue';

const props = defineProps({
  todos: {
    type: Array as PropType<Todo[]>,
    required: true
  },
  userId: {
    type: Number,
    required: true,
  }
})

const emit = defineEmits(['update-todos'])

const cabinetStore = useUserCabinetStore()

const tableToast = ref<InstanceType<typeof TheSnackBar> | null>(null)
const addTodoModal = ref<InstanceType<typeof UserCabinetNewTodoModal>| null>(null)

const openNewTodoModal = () => {
  addTodoModal.value.open()
}

const addTodo = async (newTodoData: NewTodo) => {
  if (!props.userId) {
    return
  }

  newTodoData.userId = props.userId

  try {
    await cabinetStore.addTodo(newTodoData)
    emit('update-todos')
    tableToast.value.openSnackBar('Задача добавлена', 'success')
  } catch (error: any) {
    const errorMessage = error.response.data.message
    tableToast.value.openSnackBar(errorMessage, 'error')
  }
}

const deleteTodo = async (todoId: number) => {
  if (!todoId) {
    return
  }

  try {
    await cabinetStore.deleteTodo(todoId)
    emit('update-todos')
    tableToast.value.openSnackBar('Задача удалена', 'success')
  } catch (error: any) {
    const errorMessage = error.response.data.message
    tableToast.value.openSnackBar(errorMessage, 'error')
  }
}

const toggleTaskIsDone = async (todoId: number) => {
  if (!todoId) {
    return
  }

  try {
    await cabinetStore.toggleTodoCompletion(todoId)
  } catch (error: any) {
    const errorMessage = error.response.data.message
    tableToast.value.openSnackBar(errorMessage, 'error')
  }
}
</script>

<style scoped>
.done {
  background-image: linear-gradient(to bottom,  transparent calc(50% - 1px), white, transparent calc(50% + 1px));
}
</style>