import axios from 'axios';

const api = axios.create({
  baseURL: '/admin/api',
  timeout: 10000,
});

export interface Tag {
  id?: number;
  name?: string;
  description?: string;
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

export const getTags = async (pageNum: number, pageSize: number): Promise<ApiResponse<PageResult<Tag>>> => {
  const response = await api.get('/tag/list', {
    params: { pageNum, pageSize },
  });
  return response.data;
};

export const getAllTags = async (): Promise<ApiResponse<Tag[]>> => {
  const response = await api.get('/tag/all');
  return response.data;
};

export const getTagById = async (id: number): Promise<ApiResponse<Tag>> => {
  const response = await api.get(`/tag/${id}`);
  return response.data;
};

export const createTag = async (tag: Tag): Promise<ApiResponse<string>> => {
  const response = await api.post('/tag/create', tag);
  return response.data;
};

export const updateTag = async (id: number, tag: Tag): Promise<ApiResponse<string>> => {
  const response = await api.put(`/tag/update/${id}`, tag);
  return response.data;
};

export const deleteTag = async (id: number): Promise<ApiResponse<string>> => {
  const response = await api.delete(`/tag/delete/${id}`);
  return response.data;
};

export const getTagStatistics = async (): Promise<ApiResponse<any>> => {
  const response = await api.get('/tag/statistics');
  return response.data;
};

