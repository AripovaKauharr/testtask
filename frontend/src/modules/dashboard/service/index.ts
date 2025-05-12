import axios from 'axios';
import api from '../../../api';
import { AnalyticsFilters, AnalyticsData } from '../types/analytics.type';

export const getAnalytics = async (filters: AnalyticsFilters): Promise<AnalyticsData> => {
  try {
    const response = await api.get('/analytics', {params: filters});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка загрузки');
    }
    throw error;
  }
};
