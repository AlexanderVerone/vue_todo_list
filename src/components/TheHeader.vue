<template>
  <section class="d-flex justify-space-between align-center">
    <img
      src="@/assets/logos/todo_logo_white.svg"
      alt="main logo"
      width="400"
    >
    <v-btn
      v-if="isUserAuthenticated"
      color="primary"
      @click="logout"
    >
      Выйти
    </v-btn>
  </section>
</template>

<script setup lang="ts">
import {useAuthorizationStore} from '@/modules/Authorization/store/authorizationStore';
import {computed} from 'vue';

const authorizationStore = useAuthorizationStore()
const isUserAuthenticated = computed(() => authorizationStore.isAuthenticated)

const logout = () => {
  authorizationStore.logout()
}
</script>