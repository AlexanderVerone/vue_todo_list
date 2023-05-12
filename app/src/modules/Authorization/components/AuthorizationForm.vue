<template>
  <v-form
    @submit.prevent
    validate-on="submit"
    ref="form"
    data-testid="authForm"
    :disabled="isRequestFetching"
  >
    <v-text-field
      v-model.trim="userEmail"
      label="Ваш e-mail"
      placeholder="example@gmail.com"
      :rules="rules.email"
      type="email"
      maxlength="40"
      append-inner-icon="mdi-account"
      class="mb-2"
      @input="useResetFormValidation(form)"
    />
    <v-text-field
      v-model.trim="userPassword"
      label="Ваш пароль"
      :rules="rules.password"
      type="password"
      maxlength="40"
      class="mb-2"
      append-inner-icon="mdi-key"
      placeholder="password"
      @input="useResetFormValidation(form)"
    />
    <v-btn
      block
      type="submit"
      color="primary"
      :loading="isRequestFetching"
      data-testid="authButton"
      @click="emitFormSubmit"
    >
      {{ submitButtonName }}
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import {VForm} from 'vuetify/components';
import {computed, ref} from 'vue';
import {rules} from '@/modules/Authorization/helpers/rules';
import { useResetFormValidation, useValidateForm } from '@/composables/useForm';

const props = defineProps({
  formType: {
    type: String,
    required: true
  },
  isRequestFetching: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['init-authorization'])

const form = ref<null | VForm>(null)

const userEmail = ref<string | null>(null)
const userPassword = ref<string | null>(null)

const submitButtonName = computed((): string => {
  if (props.formType === 'login') {
    return 'Войти'
  }
  
  if (props.formType === 'register') {
    return 'Зарегистрироваться'
  }
  
  return 'Тип формы не указан'
})

const emitFormSubmit = async () => {
  if (!form.value) {
    return
  }

  const isFormValid = await useValidateForm(form.value)

  if (!isFormValid) {
    return
  }

  emit('init-authorization', { 
    email: userEmail.value, 
    password: userPassword.value, 
    formType: props.formType 
  })
}

const resetForm = () => {
  if (!form.value) {
    return
  }

  form.value.reset()
}

defineExpose({
  resetForm
})
</script>