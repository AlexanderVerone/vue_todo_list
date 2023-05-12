import {describe, beforeEach, it, expect, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useChatStore} from '@/modules/Chat/store';
import axiosInstance from '@/plugins/axios';
import {flushPromises, mount} from '@vue/test-utils';
import {TheChat} from '@/modules/Chat';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {aliases, mdi} from 'vuetify/iconsets/mdi';
import {createTestingPinia} from '@pinia/testing';

describe('chatStore', () => {
  beforeEach(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    setActivePinia(createPinia())
  })

  it ('initializes with empty values', () => {
    const vuetify = createVuetify({
      components,
      directives,
      icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        }
      },
      theme: {
        defaultTheme: 'dark'
      }
    })

    mount(TheChat, {
      global: {
        plugins: [vuetify, createTestingPinia()]
      }
    })

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