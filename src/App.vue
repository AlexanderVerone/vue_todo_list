<template>
  <header>
    <TheHeader />
  </header>
  <section class="main">
    <RouterView />
  </section>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue';
import {onMounted} from 'vue';
import {useAuthorizationStore} from '@/modules/Authorization/store/authorizationStore';

const authorizationStore = useAuthorizationStore()

onMounted(() => {
  authorizationStore.checkAuthorization()
})
</script>

<style scoped></style>
