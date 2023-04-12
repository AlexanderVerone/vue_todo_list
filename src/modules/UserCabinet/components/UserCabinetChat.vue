<template>
  <v-card
    class="chat"
    rounded
  >
    <v-card-title class="text-center">
      Поболтаем ?
    </v-card-title>
    <v-divider class="my-1" />
    <v-card-text class="messagesList">
      <div
        v-for="(message, index) in mockMessages"
        :key="index"
        :class="isSameUserMessage(message) ? 'sameUserMessageBlock' : 'anotherUserMessageBlock'"
        class="mb-2"
      >
        <p class="messageUser">
          {{ message.userName }}:
        </p>
        <span>{{ message.message }}</span>
        <v-divider class="my-1" />
        <span class="messageTime">{{ convertFromUnixToDateTime(message.messageDate) }}</span>
      </div>
    </v-card-text>
    <v-divider class="my-1" />
    <div class="pa-4">
      <v-textarea
        rows="1"
        auto-grow
        density="compact"
        variant="outlined"
        placeholder="Введите сообщение"
        clearable
      />
      <v-btn
        append-icon="mdi-send"
        block
        color="primary"
      >
        Отправить сообщение
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">

import {convertFromUnixToDateTime} from '../helpers/utils';

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  }
})

const isSameUserMessage = (message) => {
  return message.userId === props.userId
}

const mockMessages = [
  {
    userId: 8,
    userName: 'Alex',
    message: 'Hello there',
    messageDate: 1681138805
  },
  {
    userId: 9,
    userName: 'Petro',
    message: 'hohohogdf;lsgjdsf;lgkjdls;fkgjds;flgj;lj',
    messageDate: 1681127301
  },
  {
    userId: 8,
    userName: 'Alex',
    message: 'Hello theregadfgsdffgsdl;gjksdfklghjsdf;lkghjsl;kj',
    messageDate: 1681127301
  },
  {
    userId: 9,
    userName: 'Petro',
    message: 'hohoho',
    messageDate: 1681127301
  }
]

</script>

<style scoped>
.sameUserMessageBlock {
  background-color: rgb(var(--v-theme-primary));
  border-radius: 20px;
  height: auto;
  padding: 5px 15px 5px 15px;
  color: #222222;
}

.anotherUserMessageBlock {
  background-color: #424242;
  border-radius: 20px;
  height: auto;
  padding: 5px 15px 5px 15px;
  margin-left: 70px;
}

.messageTime {
  font-size: 10px;
  font-style: italic;
  line-height: 10px;
  display: block;
}

.messageUser {
  font-weight: bold;
}

.messagesList {
  max-height: 350px;
  overflow-y: scroll;
}
</style>