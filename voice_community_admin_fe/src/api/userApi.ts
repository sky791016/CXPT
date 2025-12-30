import axios from 'axios';

const api = axios.create({
  baseURL: '/admin/api',
  timeout: 10000,
});

export interface User {
  id?: number;
  userName?: string;
  fullName?: string;
  signature?: string;
  score?: number;
}

export const getUsers = (pageNum: number = 1, pageSize: number = 10) => {
  return api.get('/user/list', { params: { pageNum, pageSize } });
};

export const getUser = (id: number) => {
  return api.get(`/user/${id}`);
};

export const createUser = (user: User) => {
  return api.post('/user/create', user);
};

export const updateUser = (id: number, user: User) => {
  return api.put(`/user/update/${id}`, user);
};

export const deleteUser = (id: number) => {
  return api.delete(`/user/delete/${id}`);
};

