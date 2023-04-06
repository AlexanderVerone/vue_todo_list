import {defineStore} from 'pinia';
import type {
  NewTodo,
  Todo
} from '@/modules/UserCabinet/interfaces/todos.interface';
import {ref} from 'vue';
import UserCabinetApi from '@/modules/UserCabinet/api';

export const useUserCabinetStore = defineStore('userCabinet', () => {
  const todos = ref<Todo[]>([])
    
  const loadTodosByUserId = async (userId: number| null) => {
    if (!userId) {
      return
    }

    try {
      todos.value = await UserCabinetApi.getTodoList(userId)
    } catch (error: any) {
      return Promise.reject(error)
    }
  }

  const addTodo = async (newTodo: NewTodo) => {
    if (!newTodo) {
      return
    }

    try {
      await UserCabinetApi.addNewTodo(newTodo)
    } catch (error: any) {
      return Promise.reject(error)
    }
  }

  const deleteTodo = async (todoId: number) => {
    if (!todoId) {
      return
    }

    try {
      await UserCabinetApi.deleteTodo(todoId)
    } catch (error: any) {
      return Promise.reject(error)
    }
  }
  
  return {
    todos,
    loadTodosByUserId,
    deleteTodo
  }
})