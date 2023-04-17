import axiosInstance from '@/plugins/axios';
import type {Message} from '@/modules/Chat/interfaces/chat';

export default {
  async getChatMessages (): Promise<Message[]> {
    return await axiosInstance.get('/chatMessages')
      .then(response => response.data)
  },
}