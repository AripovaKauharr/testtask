import axios from 'axios';
import type { User } from '../types/user.types';
import api from '../../../api';

export const fetchUsers = async (search: string): Promise<User[]> => {
  try {
    const response = await api.get('/users', {params: {search}});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка загрузки');
    }
    throw error;
  }
};

export const createUser = async (newUser: User): Promise<User> => {
  try {
    const response = await api.post('/users', newUser);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка создания');
    }
    throw error;
  }
};

export const updateUser = async (user: User): Promise<User> => {
  const {id, ...userData} = user
  try {
    const response = await api.put(`/users/${user.id}`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка изменения');
    }
    throw error;
  }
};

export const deleteUser = async (user: User): Promise<User> => {
  try {
    const response = await api.delete(`/users/${user.id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка удаления');
    }
    throw error;
  }
};