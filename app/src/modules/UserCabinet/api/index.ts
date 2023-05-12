import axiosInstance from '@/plugins/axios';
import type {
  NewTodo,
  Todo
} from '@/modules/UserCabinet/interfaces';

export default {
  async getTodoList (userId: number): Promise<Todo[]> {
    return await axiosInstance.get(`/todos/${userId}`)
      .then(response => response.data)
  },

  async addNewTodo (newTodo: NewTodo) {
    return await axiosInstance.post('/todos', newTodo)
  },

  async deleteTodo (todoId: number) {
    return await axiosInstance.delete(`/todos/${todoId}`)
  },

  async toggleTaskCompletion (todoId: number) {
    return await axiosInstance.patch(`/todos/${todoId}`)
  }
}