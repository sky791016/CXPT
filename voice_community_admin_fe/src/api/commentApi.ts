import axios from 'axios';

const api = axios.create({
  baseURL: '/admin/api',
  timeout: 10000,
});

export interface Comment {
  id?: number;
  voiceId?: number;
  commentId?: number;
  userId?: number;
  content?: string;
  images?: string;
  createTime?: string;
  updateTime?: string;
  isDeleted?: boolean;
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

export const getComments = async (pageNum: number, pageSize: number): Promise<ApiResponse<PageResult<Comment>>> => {
  const response = await api.get('/comment/list', {
    params: { pageNum, pageSize },
  });
  return response.data;
};

export const getCommentById = async (id: number): Promise<ApiResponse<Comment>> => {
  const response = await api.get(`/comment/${id}`);
  return response.data;
};

export const createComment = async (comment: Comment): Promise<ApiResponse<string>> => {
  const response = await api.post('/comment/create', comment);
  return response.data;
};

export const updateComment = async (id: number, comment: Comment): Promise<ApiResponse<string>> => {
  const response = await api.put(`/comment/update/${id}`, comment);
  return response.data;
};

export const deleteComment = async (id: number): Promise<ApiResponse<string>> => {
  const response = await api.delete(`/comment/delete/${id}`);
  return response.data;
};

export const getCommentStatistics = async (): Promise<ApiResponse<any>> => {
  const response = await api.get('/comment/statistics');
  return response.data;
};

