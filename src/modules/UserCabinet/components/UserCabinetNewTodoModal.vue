<template>
  <v-dialog
    v-model="isModalActive"
    persistent
    width="500"
    theme="dark"
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
            v-model.trim="newTodoData.description"
            label="Описание задачи"
            rows="1"
            auto-grow
            :rules="rules.description"
            @input="resetValidation"
          />
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

const emit = defineEmits(['add-todo'])

const isModalActive = ref<boolean>(false)
const isRequestFetching = ref<boolean>(false)

const form = ref<null | VForm>(null)
const newTodoData = ref({
  description: null,
  deadline: null,
})

const open = () => {
  isModalActive.value = true
}

const close = () => {
  isModalActive.value = false
}

const emitAddNewTodo = async () => {
  const isFormValid = await isUserDataValid()

  if (!isFormValid) {
    return
  }

  emit('add-todo', newTodoData.value)
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

defineExpose({
  open
})
</script>