<template>
  <section class="text-body-1 text-center">
    <v-icon
      icon="mdi-emoticon-sad-outline"
      size="100"
      class="mb-4"
    />
    <p class="mb-2">
      Такой страницы не существует
    </p>
    <p class="mb-2">
      Можете перейти на страницу авторизации
    </p>
    <RouterLink
      to="/authorization"
      class="py-2 px-4 rounded"
    >
      Тык
    </RouterLink>
  </section>
</template>

<script setup lang="ts"></script>