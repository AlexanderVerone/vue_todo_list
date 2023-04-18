import {defineStore} from 'pinia';
import {onMounted, ref} from 'vue';
import {io, Socket} from 'socket.io-client';
import type {
  Message
} from '@/modules/Chat/interfaces';
import ChatApi from '@/modules/Chat/api';
import {
  useAuthorizationStore
} from '@/modules/Authorization/store/authorizationStore';

export const useChatStore = defineStore('chat', () => {
  const authStore = useAuthorizationStore()
  const userId = authStore.userId

  const connected = ref<boolean>(false)
  const messages = ref<Message[]>([])
  const isChatWindowCollapsed = ref<boolean>(false)
  const unreadChatMessagesCount = ref<Message[]>([])
  const isApplicationBrowserTabActive = ref<boolean>(true)

  const URL: string = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'
  const socket: Socket = io(URL)

  socket.on('newMessage', (newMessage: Message) => {
    if (isChatWindowCollapsed.value || !isApplicationBrowserTabActive.value) {
      unreadChatMessagesCount.value.push(newMessage)
    }

    messages.value.push(newMessage)

    if (!isChatWindowCollapsed.value && userId !== newMessage.userId && isApplicationBrowserTabActive.value) {
      socket.emit('messageRead', newMessage.id)
    }
  })

  socket.on('messageRead', (messageId: number) => {
    const targetMessage = messages.value
      .findIndex(messageElement => messageElement.id === messageId)

    if (targetMessage !== -1) {
      messages.value[targetMessage].isRead = true
    }
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
  }

  const toggleChatView = () => {
    isChatWindowCollapsed.value = !isChatWindowCollapsed.value

    if (!isChatWindowCollapsed.value) {
      unreadChatMessagesCount.value
        .forEach((unreadMessage => socket.emit('messageRead', unreadMessage.id)))
    }

    unreadChatMessagesCount.value = []
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', () => {
      isApplicationBrowserTabActive.value = document.visibilityState === 'visible'
      
      if (
        isApplicationBrowserTabActive.value 
          && !isChatWindowCollapsed.value 
          && unreadChatMessagesCount.value.length !== 0) {
        unreadChatMessagesCount.value
          .forEach((unreadMessage => socket.emit('messageRead', unreadMessage.id)))
      }
    })
  })

  return {
    socket,
    sendMessage,
    getMessageList,
    messages,
    isChatWindowCollapsed,
    toggleChatView,
    unreadChatMessagesCount,
    connected,
  }
})