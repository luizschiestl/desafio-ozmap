import { UsersResultType, UserType } from '@/types/UserType';
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';

const api = axios.create({ baseURL: API_URL });

export const createUser = (userData: UserType) => {
  return api.post('/user', userData);
};
export const getUser = (username: string) => {
  return api.get(`/user/${username}`);
};
export const deleteUser = (username: string) => {
  return api.delete(`/user/${username}`);
};
export const editUser = (username: string, userData: UserType) => {
  return api.put(`/user/${username}`, userData);
};
export const getAllUsers = (options?: {
  limit?: number;
  page?: number;
}) => {
  return api.get<UsersResultType>(`/users`, {
    params: options,
  });
};
