<template>
  <v-container>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      grow
      :disabled="isRequestFetching"
    >
      <v-tab value="login">
        Войти
      </v-tab>
      <v-tab value="register">
        Зарегистрироваться
      </v-tab>
    </v-tabs>

    <v-card-text class="px-0">
      <v-window v-model="tab">
        <v-window-item value="login">
          <AuthorizationForm
            form-type="login"
            ref="login"
            :is-request-fetching="isRequestFetching"
            @init-authorization="initAuthorization"
          />
        </v-window-item>
        <v-window-item value="register">
          <AuthorizationForm
            form-type="register"
            ref="register"
            :is-request-fetching="isRequestFetching"
            @init-authorization="initAuthorization"
          />
        </v-window-item>
      </v-window>
    </v-card-text>
    <TheSnackBar ref="toast" />
  </v-container>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import AuthorizationForm from '@/modules/Authorization/components/AuthorizationForm.vue';
import type {FormData} from '@/modules/Authorization/interfaces';
import authAPI from '@/modules/Authorization/api';
import TheSnackBar from '@/components/TheSnackBar.vue';
import {useAuthorizationStore} from '@/modules/Authorization/store/authorizationStore';
import router from '@/router';

const authStore = useAuthorizationStore()

const toast = ref<InstanceType<typeof TheSnackBar> | null>(null)
const login = ref<InstanceType<typeof AuthorizationForm> | null>(null)
const register = ref<InstanceType<typeof AuthorizationForm> | null>(null)

const tab = ref<string>('')
const isRequestFetching = ref<boolean>(false)

watch(tab, () => {
  resetForms()
})

const resetForms = () => {
  if (login.value) {
    login.value.resetForm()
  }

  if (register.value) {
    register.value.resetForm()

  }
}

const initLogin = async ({email, password}: FormData) => {
  try {
    isRequestFetching.value = true
    const { token } = await authAPI.initUserLogin({ email, password })
    authStore.handleUserToken(token)

    redirectToUserCabinet()
  } catch (error: any) {
    const errorMessage = error.response.data.message
    toast.value.openSnackBar(errorMessage, 'error')
  } finally {
    resetForms()
    isRequestFetching.value = false
  }
}

const initRegistration = async ({email, password}: FormData) => {
  try {
    isRequestFetching.value = true
    await authAPI.initUserRegistration({ email, password })
    toast.value.openSnackBar('Пользователь успешно создан', 'success')
    tab.value = 'login'
  } catch (error: any) {
    const errorMessage = error.response.data.message
    toast.value.openSnackBar(errorMessage, 'error')
  } finally {
    resetForms()
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

const redirectToUserCabinet = () => {
  if (!authStore.userId) {
    return
  }

  router.push(`/user/${authStore.userId}`)
}
</script>