<template>
  <v-sheet>
    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="todos.length === 0"
        class="d-flex flex-column align-center pt-5"
      >
        <v-icon
          icon="mdi-emoticon-sad-outline"
          size="30"
          color="primary"
          class="mb-2"
        />
        <p>Нет добавленных задач</p>
      </div>
    </Transition>
    <Transition
      name="fade"
      mode="out-in"
    >
      <v-table
        v-if="todos.length > 0"
        class="todoTable"
      >
        <thead>
          <tr>
            <td />
            <td>Задача</td>
            <td>Срок выполнения</td>
            <td />
          </tr>
        </thead>
        <TransitionGroup
          name="tr"
          tag="tbody"
          mode="out-in"
        >
          <tr
            v-for="(todo, index) in todos"
            :key="index"
          >
            <td class="tableCheckbox">
              <v-checkbox
                v-model="todo.isDone"
                hide-details
                @click="toggleTaskIsDone(todo.id)"
              />
            </td>
            <td
              :class="{'done': todo.isDone}"
              class="tableDescription"
            >
              {{ todo.description }}
            </td>
            <td
              :class="{'done': todo.isDone}"
              class="tableDeadline"
            >
              {{ convertFromUnix(todo.deadline) }}
            </td>
            <td class="tableDeleteButton">
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
        </TransitionGroup>
        <tfoot />
      </v-table>
    </Transition>

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
  </v-sheet>
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
    default: null,
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
  color: rgba(242, 242, 242, 0.16);
}

.tr-enter-active {
  transition: all 0.3s ease-in;
}

.tr-leave-active {
  transition: all 0.3s ease-out;
}

.tr-enter-from {
  /*transform: translateY(-30px);*/
  opacity: 0;
}

.tr-leave-to {
  /*transform: translateY(30px);*/
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.tableCheckbox {
  width: 10%;
}

.tableDescription {
  width: 50%;

}

.tableDeadline {
  width: 20%;
  text-align: center;
}

.tableDeleteButton {
  width: 10%;
  text-align: center;
}

.todoTable {
  max-height: 290px;
  overflow: scroll;
}

.todoTable thead {
  text-align: center;
}
</style>