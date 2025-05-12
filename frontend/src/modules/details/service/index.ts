import axios from 'axios';
import type { GetCalls, CallFilterParams } from '../types/details.types';
import api from '../../../api';

export const fetchCalls = async (params?: CallFilterParams): Promise<GetCalls> => {
  try {
    const response = await api.get('/calls', {
      params: {
        ...params,
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка загрузки');
    }
    throw error;
  }
};