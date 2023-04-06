import axios from 'axios';
import type {UserData} from '@/modules/Authorization/helpers/types';

const authApi = axios.create({
  baseURL: 'http://localhost:4000/auth',
})

export default {
  async initUserLogin(userData: UserData): Promise<{ token: string }> {
    return await authApi.post('/login', userData)
      .then(response => response.data)
  },

  async initUserRegistration(userData: UserData): Promise<String> {
    return await authApi.post('/registration', userData)
  }
}