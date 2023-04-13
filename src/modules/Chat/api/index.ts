import axios from 'axios';
import type {Message} from '@/modules/Chat/interfaces/chat';

const chatApi = axios.create({
  baseURL: 'http://localhost:4000/',
})

export default {
  async getChatMessages (): Promise<Message[]> {
    return await chatApi.get('/chatMessages')
      .then(response => response.data)
  },

  async postNewMessage (message: Message) {
    return await chatApi.post('chatMessages', message)
  }
}