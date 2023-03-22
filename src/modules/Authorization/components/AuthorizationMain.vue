<template>
  <v-container>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      :disabled="isRequestFetching"
    >
      <v-tab value="login">
        Войти
      </v-tab>
      <v-tab value="register">
        Зарегистрироваться
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="login">
          <AuthorizationForm
            form-type="login"
            :is-request-fetching="isRequestFetching"
            @init-authorization="initAuthorization"
          />
        </v-window-item>
        <v-window-item value="register">
          <AuthorizationForm
            form-type="register"
            :is-request-fetching="isRequestFetching"
            @init-authorization="initAuthorization"
          />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-container>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import AuthorizationForm from '@/modules/Authorization/components/AuthorizationForm.vue';
import type {FormData} from '@/modules/Authorization/helpers/types';
import authAPI from '@/modules/Authorization/api';

const tab = ref<string>('')
const isRequestFetching = ref<boolean>(false)

const initLogin = async ({email, password}: FormData) => {
  try {
    isRequestFetching.value = true
    const response = await authAPI.initUserLogin({ email, password })
    // TODO: Тут логика сохранения JWT, парсинга JWT чтобы сохранить в стор имя и роли
    // TODO: и переброса в кабинет пользователя, когда он будет готов
  } catch (error) {

    // TODO: Тут сделать обработку ошибок с бэка и вывод их
  } finally {
    isRequestFetching.value = false
  }
}

const initRegistration = async ({email, password}: FormData) => {
  try {
    isRequestFetching.value = true
    const response = await authAPI.initUserRegistration({ email, password })
    // TODO: Тут логика вывода уведомления о успешной регистрации
    tab.value = 'login'
  } catch (error) {
    // TODO: Тут сделать обработку ошибок с бэка и вывод их
  } finally {
    isRequestFetching.value = false
  }
}

const initAuthorization = async (data: FormData) => {
  if (data.formType === 'login') {
    await initLogin(data)

    return
  }
    
  if (data.formType === 'register') {
    await initRegistration(data)
      
    return
  }
}
</script>