import {describe, beforeEach, it, expect, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useChatStore} from '@/modules/Chat/store/chatStore';
import axiosInstance from '@/plugins/axios';
import {flushPromises} from '@vue/test-utils';

describe('chatStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it ('initializes with empty values', () => {
    const store = useChatStore()
    expect(store.messages)
      .toHaveLength(0)

    expect(store.unreadChatMessagesCount)
      .toHaveLength(0)
  })

  it ('make get messages api call', async () => {
    const mockMessages = {
      data: [
        {
          id: 1,
          userId: 1,
          userName: 'petro@gmail.com',
          text: 'hi there',
          messageDate: 1682170510,
          isRead: false
        }
      ]
    }

    vi.spyOn(axiosInstance, 'get')
      .mockResolvedValue(mockMessages)

    const store = useChatStore()

    await store.getMessageList()

    expect(axiosInstance.get)
      .toHaveBeenCalledOnce()

    expect(axiosInstance.get)
      .toHaveBeenCalledWith('/chatMessages')

    await flushPromises()

    expect(store.messages)
      .toHaveLength(1)
  })
})