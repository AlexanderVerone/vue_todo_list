import axios from 'axios';
import type {UserData} from '@/modules/Authorization/helpers/types';

const authApi = axios.create({
    baseURL: 'http://localhost:3000',
})

export default {
    async initUserLogin(userData: UserData) {
        return []
        // return await authApi.post('/login', userData)
    },

    async initUserRegistration(userData: UserData) {
        // return await authApi.post('/register', userData)
    }
}