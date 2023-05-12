import type {UserData} from '@/modules/Authorization/interfaces';
import axiosInstance from '@/plugins/axios';

export default {
  async initUserLogin(userData: UserData): Promise<{ token: string }> {
    return await axiosInstance.post('auth/login', userData)
      .then(response => response.data)
  },

  async initUserRegistration(userData: UserData): Promise<string> {
    return await axiosInstance.post('auth/registration', userData)
      .then(response => response.data)
  }
}