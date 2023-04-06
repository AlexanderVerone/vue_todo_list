<template>
  <v-snackbar
    v-model="isActive"
    :timeout="timeout"
    :color="messageType"
    :location="location"
    width="auto"
  >
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

defineProps({
  timeout: {
    type: Number,
    default: 3000
  },
  location: {
    type: String,
    default: 'top right'
  }
})

const isActive = ref<boolean>(false)
const message = ref<string>('')
const messageType = ref<string>('')
const openSnackBar = (toastMessage: string, type: string) => {
  message.value = toastMessage
  messageType.value = type
  isActive.value = true
}

defineExpose({
  openSnackBar
})
</script>