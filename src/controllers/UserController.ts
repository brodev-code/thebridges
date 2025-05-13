import { api } from '../services/api';
import { User } from '../models/User';

export class UserController {
    static async getUsers(): Promise<User[]> {
        const response = await api.get<User[]>('/users');
        return response.data;
    }

    static async getUser(id: number): Promise<User> {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    }

    static async createUser(user: User): Promise<User> {
        const response = await api.post<User>('/users', user);
        return response.data;
    }

    static async GuestLogin(user: User): Promise<User> {
        const response = await api.post<User>('/guest-login', user);
        return response.data;
    }

    static async Login(user: User): Promise<User> {
        const response = await api.post<User>('/login', user);
        return response.data;
    }
}