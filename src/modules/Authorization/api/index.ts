import axios from 'axios';
import type {UserData} from '@/modules/Authorization/helpers/types';

const authApi = axios.create({
    baseURL: 'http://localhost:3000',
})

export default {
    initUserLogin(userData: UserData) {
        return authApi.post('/auth', userData)
    }
}