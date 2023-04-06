import axios from 'axios';
import type {
  NewTodo,
  Todo
} from '@/modules/UserCabinet/interfaces/todos.interface';

const userCabinetApi = axios.create({
  baseURL: 'http://localhost:4000/',
})

export default {
  async getTodoList (userId: number): Promise<Todo[]> {
    return await userCabinetApi.get(`/todos/${userId}`)
      .then(response => response.data)
  },

  async addNewTodo (newTodo: NewTodo) {
    return await userCabinetApi.post('/todos', newTodo)
  },

  async deleteTodo (todoId: number) {
    return await userCabinetApi.delete(`/todos/${todoId}`)
  }
}