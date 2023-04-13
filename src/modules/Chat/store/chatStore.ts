import { defineStore } from 'pinia';
import {ref} from 'vue';
import {io, Socket} from 'socket.io-client';
import type {
  Message
} from '@/modules/Chat/interfaces/chat';
import ChatApi from '@/modules/Chat/api';

export const useChatStore = defineStore('wss', () => {
  const connected = ref<boolean>(false)
  const messages = ref<Message[]>([])
  const isChatWindowCollapsed = ref<boolean>(false)
  const collapsedChatMessagesCount = ref<number>(0)

  const URL: string = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'
  const socket: Socket = io(URL)

  socket.on('newMessage', (newMessage: Message) => {
    if (isChatWindowCollapsed.value) {
      collapsedChatMessagesCount.value++
    }

    messages.value.push(newMessage)
  })
    
  socket.on('connect', () => {
    connected.value = true
  })
    
  socket.on('disconnect', () => {
    connected.value = false
  })

  const getMessageList = async () => {
    try {
      messages.value = await ChatApi.getChatMessages()
    } catch (error: any) {
      return Promise.reject(error)
    }
  }

  const sendMessage = async (messageBody: Message) => {
    socket.emit('newMessage', messageBody)
    await ChatApi.postNewMessage(messageBody)
  }

  const toggleChatView = () => {
    collapsedChatMessagesCount.value = 0
    isChatWindowCollapsed.value = !isChatWindowCollapsed.value
  }

  return {
    socket,
    sendMessage,
    getMessageList,
    messages,
    isChatWindowCollapsed,
    toggleChatView,
    collapsedChatMessagesCount
  }
})