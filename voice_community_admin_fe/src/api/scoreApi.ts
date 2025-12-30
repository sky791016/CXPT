import axios from 'axios';

const api = axios.create({
  baseURL: '/admin/api',
  timeout: 10000,
});

export interface UserScore {
  id?: number;
  userId?: number;
  userName?: string;
  fullName?: string;
  score?: number;
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

export const getUserScores = async (pageNum: number, pageSize: number): Promise<ApiResponse<PageResult<UserScore>>> => {
  const response = await api.get('/user/list', {
    params: { pageNum, pageSize },
  });
  return response.data;
};

export const updateUserScore = async (userId: number, score: number): Promise<ApiResponse<string>> => {
  const response = await api.put(`/user/update/${userId}`, { score });
  return response.data;
};

