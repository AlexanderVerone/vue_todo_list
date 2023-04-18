<template>
  <Transition mode="out-in">
    <v-badge
      v-if="isChatWindowCollapsed"
      :content="unreadMessages"
      color="red"
      max="99"
      :model-value="Boolean(unreadMessages)"
    >
      <v-btn @click="toggleChatView">
        Чатик
      </v-btn>
    </v-badge>

    <v-card
      v-else
      class="chat"
      rounded
    >
      <v-card-title class="text-center">
        <v-icon
          icon="mdi-circle-medium"
          :color="isConnectionActive ? 'green' : 'red'"
        />
        Поболтаем ?
        <v-tooltip
          text="Свернуть чат"
          location="top"
        >
          <template #activator="{props}">
            <v-btn 
              v-bind="props"
              icon="mdi-minus"
              density="compact"
              size="large"
              variant="text"
              class="collapseButton"
              @click="toggleChatView"
            />
          </template>
        </v-tooltip>
      </v-card-title>
      <v-divider class="my-1" />
      <v-card-text class="messagesList">
        <div
          v-if="isNoMessages"
          class="d-flex flex-column justify-center align-center"
        >
          <v-icon
            icon="mdi-emoticon-sad-outline"
            size="30"
            color="primary"
            class="mb-2"
          />
          <p>
            Пока никто ничего не написал
          </p>
        </div>
        <template v-if="!isNoMessages">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="isSameUserMessage(message) ? 'sameUserMessageBlock' : 'anotherUserMessageBlock'"
            class="mb-2"
          >
            <p class="messageUser">
              {{ message.userName }}:
            </p>
            <span :ref="el => { messageTextSpanRefs[index] = el }">
              {{ message.text }}
            </span>
            <v-divider class="my-1" />
            <div class="d-flex justify-space-between">
              <span class="messageTime">{{ convertFromUnixToDateTime(message.messageDate) }}</span>
              <v-icon
                v-if="isSameUserMessage(message)"
                icon="mdi-check"
                size="12"
                :color="message.isRead ? 'white' : 'black'"
              />
            </div>
          </div>
        </template>
        <div ref="chatListEndMarker" />
      </v-card-text>
      <v-divider class="my-1" />
      <div class="pa-4">
        <v-form
          @submit.prevent
          validate-on="submit"
          ref="chatForm"
          :disabled="isRequestFetching"
        >
          <v-textarea
            v-model="userMessage"
            rows="1"
            auto-grow
            density="compact"
            variant="outlined"
            placeholder="Введите сообщение"
            clearable
            maxlength="255"
            :rules="rules.chatMessage"
            class="mb-2"
            @input="useResetFormValidation(chatForm)"
            @keyup.enter="sendMessage"
          />
        </v-form>
        <v-btn
          append-icon="mdi-send"
          type="submit"
          block
          color="primary"
          :loading="isRequestFetching"
          @click="sendMessage"
        >
          Отправить сообщение
        </v-btn>
      </div>
    </v-card>
  </Transition>
</template>

<script setup lang="ts">

import {convertFromUnixToDateTime} from '../../UserCabinet/helpers/utils';
import {useChatStore} from '@/modules/Chat/store/chatStore';
import type {Message} from '@/modules/Chat/interfaces';
import {computed, nextTick, onMounted, ref, watch} from 'vue';
import {VForm} from 'vuetify/components';
import {rules} from '@/modules/Chat/helpers/rules';
import {useAuthorizationStore} from '@/modules/Authorization/store/authorizationStore';
import moment from 'moment';
import { useResetFormValidation, useValidateForm } from '@/composables/useForm';

const chatStore = useChatStore()
const authStore = useAuthorizationStore()

const chatForm = ref<null | VForm>(null)
const userMessage = ref<string>('')
const isRequestFetching = ref<boolean>(false)

const chatListEndMarker = ref<HTMLDivElement | null>(null)
const messageTextSpanRefs = ref<HTMLSpanElement[]>([])

const messages = computed((): Message[] => {
  return chatStore.messages
})

const isChatWindowCollapsed = computed((): boolean => {
  return chatStore.isChatWindowCollapsed
})

const unreadMessages = computed((): number => {
  return chatStore.unreadChatMessagesCount.length
})

const isNoMessages = computed((): boolean => {
  return messages.value.length === 0
})

const isConnectionActive = computed((): boolean => {
  return chatStore.connected
})

watch(() => messages.value.length, async () => {
  await nextTick()

  if (chatListEndMarker.value) {
    chatListEndMarker.value.scrollIntoView()
  }
})

const isSameUserMessage = (message: Message): boolean => {
  return message.userId === authStore.userId
}

const sendMessage = async () => {
  if (!chatForm.value) {
    return
  }

  const isFormValid = await useValidateForm(chatForm.value)

  if (!isFormValid || !authStore.userId) {
    return
  }

  const messageBody: Message = {
    userId: authStore.userId,
    userName: authStore.userEmail,
    text: userMessage.value,
    messageDate: moment()
      .unix()
  }

  await chatStore.sendMessage(messageBody)
  userMessage.value = ''
}

const toggleChatView = () => {
  chatStore.toggleChatView()
}

const scrollToLastMessage = () => {
  if (messages.value.length === 0) {
    return
  }

  messageTextSpanRefs.value[messages.value.length - 1].scrollIntoView()
}

onMounted(async () => {
  await chatStore.getMessageList()
  scrollToLastMessage()
})

</script>

<style scoped>
.sameUserMessageBlock {
  background-color: rgb(var(--v-theme-primary));
  border-radius: 20px;
  height: auto;
  padding: 5px 15px 5px 15px;
  color: #222222;
  width: fit-content;
  max-width: 85%;
}

.anotherUserMessageBlock {
  background-color: #424242;
  border-radius: 20px;
  height: auto;
  padding: 5px 15px 5px 15px;
  width: fit-content;
  max-width: 85%;
  display: block;
  margin-left: auto;
  margin-right: 0;
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
  height: 400px;
  overflow-y: scroll;
}

.collapseButton {
  position: absolute;
  right: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>