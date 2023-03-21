<template>
  <v-snackbar
    v-model="isActive"
    timeout="2000"
  >
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

defineProps({
  message: {
    type: String,
    required: true,
  }
})

const isActive = ref<boolean>(false)
</script>