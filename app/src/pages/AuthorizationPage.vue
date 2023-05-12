<template>
  <v-container class="authorization">
    <Authorization />
  </v-container>
</template>

<script setup lang="ts">
import {Authorization} from '@/modules/Authorization';
</script>

<style scoped>
.authorization {
    width: 500px;
    height: 70vh;
    display: flex;
    place-items: center;
}
</style>