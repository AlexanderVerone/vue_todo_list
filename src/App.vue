<template>
  <header>
    <TheHeader />
  </header>
  <section class="main">
    <RouterView v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </RouterView>
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>