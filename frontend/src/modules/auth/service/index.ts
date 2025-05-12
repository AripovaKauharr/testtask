import api from "../../../api";
import { CreateLoginForm } from "../types/login.types";

interface LoginResponse {
  token: string;
}

export const login = async (form: CreateLoginForm): Promise<string> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', form);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const getToken = (): string | null => {
  const token = localStorage.getItem('token');
  return token && token !== 'null' ? token : null;
};

