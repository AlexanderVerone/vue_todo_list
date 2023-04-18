<template>
  <section class="d-flex justify-space-between align-center">
    <img
      src="@/assets/logos/todo_logo_white.svg"
      alt="main logo"
      width="400"
    >
    <Transition>
      <div
        v-if="isUserAuthenticated"
        class="d-flex align-center"
      >
        <p class="mr-5">
          {{ userName }}
        </p>
        <v-btn
          color="primary"
          @click="logout"
        >
          Выйти
        </v-btn>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import {useAuthorizationStore} from '@/modules/Authorization/store/authorizationStore';
import {computed} from 'vue';

const authStore = useAuthorizationStore()
const isUserAuthenticated = computed((): boolean => authStore.isAuthenticated)

const userName = computed((): string => {
  return authStore.userEmail
})

const logout = () => {
  authStore.logout()
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>