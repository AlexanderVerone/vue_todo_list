import { defineStore } from 'pinia';
import { ref } from 'vue'
import { parseJwt } from '@/modules/Authorization/helpers/utils';
import router from '@/router';

export const useAuthorizationStore = defineStore('authorization', () => {
  const userId = ref<number | null>(null)
  const userEmail = ref<string>('')
  const userRoles = ref<[]>([])
  const isAuthenticated = ref<boolean>(false)

  const handleUserToken = (jwtToken: string) => {
    if (!jwtToken) {
      return
    }

    const parsedUserData = parseJwt(jwtToken)
    userEmail.value = parsedUserData.email
    userRoles.value = parsedUserData.roles
    userId.value = parsedUserData.id
    isAuthenticated.value = true

    localStorage.setItem('token', jwtToken)
    localStorage.setItem('userId', String(userId.value))
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    isAuthenticated.value = false
    router.replace('/authorization')
  }

  const checkAuthorization = () => {
    const token = localStorage.getItem('token')

    if (!token) {
      logout()

      return
    }

    handleUserToken(token)
  }

  return {
    userId,
    userEmail,
    userRoles,
    isAuthenticated,
    handleUserToken,
    logout,
    checkAuthorization,
  }
})