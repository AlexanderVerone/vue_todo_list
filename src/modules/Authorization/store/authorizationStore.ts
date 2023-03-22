import { defineStore } from 'pinia';
import { ref, computed } from 'vue'

export const useAuthorizationStore = defineStore('authorization', () => {
  const userId = ref<number | null>(null)
  const userName = ref<string>('')
  const userRoles = ref<string[]>([])

  return {
    userId,
    userName,
    userRoles,
  }
})