<template>
  <v-dialog
    v-model="isModalActive"
    width="500"
    @keyup.esc="close"
  >
    <v-card>
      <v-card-title class="text-center">
        Добавить новую задачу
      </v-card-title>
      <v-card-text>
        <v-form
          @submit.prevent
          validate-on="submit"
          ref="form"
          :disabled="isRequestFetching"
        >
          <v-textarea
            v-model="newTodoData.description"
            label="Описание задачи"
            rows="1"
            auto-grow
            :rules="rules.description"
            @input="resetValidation"
          />
          <div class="d-flex flex-column align-center mt-3">
            <h3>
              Дедлайн
            </h3>
            <p
              v-if="isDeadlineDateEmpty"
              class="dateError"
            >
              Поле "Дедлайн" обязательное
            </p>
            <VDatePicker
              v-model.number="newTodoData.deadline"
              :attributes="calendarAttributes"
              :min-date="new Date()"
              transparent
              is-dark
              color="purple"
              is-required
              class="my-4"
              @update:model-value="isDeadlineDateEmpty = false"
            />
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-around">
        <v-btn
          prepend-icon="mdi-check-circle-outline"
          color="green"
          @click="emitAddNewTodo"
        >
          Добавить
        </v-btn>
        <v-btn
          prepend-icon="mdi-close-circle-outline"
          color="red"
          @click="close"
        >
          Отменить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {VForm} from 'vuetify/components';
import {rules} from '@/modules/UserCabinet/helpers/rules';
import type {NewTodo} from '@/modules/UserCabinet/interfaces/todos.interface';

const calendarAttributes = ref([
  {
    key: 'today',
    dot: true,
    dates: new Date(),
  }
])

const emit = defineEmits(['add-todo'])

const isModalActive = ref<boolean>(false)
const isRequestFetching = ref<boolean>(false)
const isDeadlineDateEmpty = ref<boolean>(false)

const form = ref<null | VForm>(null)
const newTodoData = ref<NewTodo>({
  description: null,
  deadline: null,
})

const open = () => {
  isModalActive.value = true
}

const close = () => {
  resetForm()
  isModalActive.value = false
}

const emitAddNewTodo = async () => {
  const isFormValid = await isUserDataValid()

  if (!newTodoData.value.deadline) {
    isDeadlineDateEmpty.value = true

    return
  }

  if (!isFormValid) {
    return
  }

  newTodoData.value.deadline = newTodoData.value.deadline / 1000

  emit('add-todo', newTodoData.value)
  close()
}

const isUserDataValid = async (): Promise<boolean> => {
  if (!form.value) {
    return false
  }

  const result = await form.value.validate()

  return result.valid
}

const resetValidation = () => {
  if (!form.value) {
    return
  }

  form.value.resetValidation()
}

const resetForm = () => {
  newTodoData.value.description = null
  newTodoData.value.deadline = null
}

defineExpose({
  open
})
</script>

<style scoped>
.dateError {
  font-size: 12px;
  color: rgb(var(--v-theme-error));
}
</style>