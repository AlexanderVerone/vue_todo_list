import {beforeEach, describe, expect, it, vi} from 'vitest';
import {useUserCabinetStore} from '@/modules/UserCabinet/store';
import {createPinia, setActivePinia} from 'pinia';
import axiosInstance from '@/plugins/axios';
import {flushPromises} from '@vue/test-utils';

describe('userCabinetStore', () => {
  const todo = {
    id: 1,
    isDone: false,
    description: 'hohoho',
    deadline: 1682170510,
    userId: 1,
    createdAt: 1682170510,
    updatedAt: 1682170510
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it ('initializes with zero todos', () => {
    const store = useUserCabinetStore()
    expect(store.todos)
      .toHaveLength(0)
  })

  it ('make get todos api call', async () => {
    const mockTodoList = {
      data: [
        todo
      ]
    }

    vi.spyOn(axiosInstance, 'get')
      .mockResolvedValue(mockTodoList)

    const userId = 1
    const store = useUserCabinetStore()
    await store.loadTodosByUserId(userId)

    expect(axiosInstance.get)
      .toHaveBeenCalledOnce()

    expect(axiosInstance.get)
      .toHaveBeenCalledWith('/todos/1')

    await flushPromises()

    expect(store.todos)
      .toHaveLength(1)
  })

  it ('make add new todo api call', async () => {
    vi.spyOn(axiosInstance, 'post')
      .mockResolvedValue(todo)

    const store = useUserCabinetStore()
    await store.addTodo(todo)

    expect(axiosInstance.post)
      .toHaveBeenCalledOnce()

    expect(axiosInstance.post)
      .toHaveBeenCalledWith('/todos', todo)
  })

  it ('make delete todo api call', async () => {
    vi.spyOn(axiosInstance, 'delete')
      .mockResolvedValue(todo)

    const store = useUserCabinetStore()
    await store.deleteTodo(1)

    expect(axiosInstance.delete)
      .toHaveBeenCalledOnce()

    expect(axiosInstance.delete)
      .toHaveBeenCalledWith('/todos/1')
  })

  it ('make toggle todo status api call', () => {
    vi.spyOn(axiosInstance, 'patch')

    const store = useUserCabinetStore()
    store.toggleTodoCompletion(1)

    expect(axiosInstance.patch)
      .toHaveBeenCalledOnce()

    expect(axiosInstance.patch)
      .toHaveBeenCalledWith('/todos/1')
  })
})