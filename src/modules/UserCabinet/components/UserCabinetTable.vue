<template>
  <v-sheet>
    <div class="d-flex justify-center pt-4">
      <v-btn
        v-bind="props"
        density="compact"
        size="large"
        variant="outlined"
        color="green"
        append-icon="mdi-plus-circle-outline"
        @click="openNewTodoModal"
      >
        Добавить задачу
      </v-btn>
    </div>
    <div
      v-if="isNoTodos"
      class="d-flex flex-column align-center py-5"
    >
      <v-icon
        icon="mdi-emoticon-sad-outline"
        size="30"
        color="primary"
        class="mb-2"
      />
      <p>Нет добавленных задач</p>
    </div>
    <Transition
      name="fade"
      mode="out-in"
    >
      <v-table
        v-if="!isNoTodos"
        class="todoTable"
      >
        <thead>
          <tr>
            <td>Выполнено?</td>
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
              {{ convertFromUnixToDate(todo.deadline) }}
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
  </v-sheet>
  <TheSnackBar ref="tableToast" />
  <UserCabinetNewTodoModal
    ref="addTodoModal"
    @add-todo="addTodo"
  />
</template>

<script lang="ts" setup>
import {computed, type PropType, ref} from 'vue';
import TheSnackBar from '@/components/TheSnackBar.vue';
import type {NewTodo, Todo} from '@/modules/UserCabinet/interfaces';
import { convertFromUnixToDate } from '@/modules/UserCabinet/helpers/utils';
import {useUserCabinetStore} from '@/modules/UserCabinet/store/userCabinetStore';
import UserCabinetNewTodoModal from '@/modules/UserCabinet/components/UserCabinetNewTodoModal.vue';
import {useAuthorizationStore} from '@/modules/Authorization/store/authorizationStore';

const props = defineProps({
  todos: {
    type: Array as PropType<Todo[]>,
    required: true
  },
})

const emit = defineEmits(['update-todos'])

const cabinetStore = useUserCabinetStore()
const authStore = useAuthorizationStore()

const tableToast = ref<InstanceType<typeof TheSnackBar> | null>(null)
const addTodoModal = ref<InstanceType<typeof UserCabinetNewTodoModal>| null>(null)

const userId = computed((): number | null => {
  return authStore.userId
})

const isNoTodos = computed((): boolean => {
  return props.todos.length === 0
})

const openNewTodoModal = () => {
  if (!addTodoModal.value) {
    return
  }

  addTodoModal.value.open()
}

const addTodo = async (newTodoData: NewTodo) => {
  if (!userId.value) {
    return
  }

  newTodoData.userId = userId.value

  try {
    await cabinetStore.addTodo(newTodoData)
    emit('update-todos')
    if (tableToast.value) {
      tableToast.value.openSnackBar('Задача добавлена', 'success')
    }
  } catch (error: any) {
    const errorMessage = error.response.data.message
    if (tableToast.value) {
      tableToast.value.openSnackBar(errorMessage, 'error')
    }
  }
}

const deleteTodo = async (todoId: number) => {
  if (!todoId) {
    return
  }

  try {
    await cabinetStore.deleteTodo(todoId)
    emit('update-todos')
    if (tableToast.value) {
      tableToast.value.openSnackBar('Задача удалена', 'success')
    }
  } catch (error: any) {
    const errorMessage = error.response.data.message
    if (tableToast.value) {
      tableToast.value.openSnackBar(errorMessage, 'error')
    }
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
    if (tableToast.value) {
      tableToast.value.openSnackBar(errorMessage, 'error')
    }
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

.tableCheckbox {
  width: 20%;
  padding-left: 30px !important;
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
</style>