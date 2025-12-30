import axios from 'axios';

const api = axios.create({
  baseURL: '/admin/api',
  timeout: 10000,
});

export interface Medal {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  iconUrl?: string;
  createTime?: string;
  updateTime?: string;
}

export interface PageRequest {
  pageNum: number;
  pageSize: number;
}

export interface PageResult<T> {
  list: T[];
  total: number;
  pageNum: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const getMedals = async (pageNum: number, pageSize: number): Promise<ApiResponse<PageResult<Medal>>> => {
  const response = await api.get('/medal/list', {
    params: { pageNum, pageSize },
  });
  return response.data;
};

export const getMedalById = async (id: number): Promise<ApiResponse<Medal>> => {
  const response = await api.get(`/medal/${id}`);
  return response.data;
};

export const createMedal = async (medal: Medal): Promise<ApiResponse<string>> => {
  const response = await api.post('/medal/create', medal);
  return response.data;
};

export const updateMedal = async (id: number, medal: Medal): Promise<ApiResponse<string>> => {
  const response = await api.put(`/medal/update/${id}`, medal);
  return response.data;
};

export const deleteMedal = async (id: number): Promise<ApiResponse<string>> => {
  const response = await api.delete(`/medal/delete/${id}`);
  return response.data;
};

export const getMedalStatistics = async (): Promise<ApiResponse<any>> => {
  const response = await api.get('/medal/statistics');
  return response.data;
};

