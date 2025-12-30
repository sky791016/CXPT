import axios from 'axios';

const api = axios.create({
  baseURL: '/admin/api',
  timeout: 10000,
});

export interface Project {
  id?: number;
  taskboardId?: number;
  bidId?: number;
  leaderId?: number;
  title?: string;
  description?: string;
  targetIndicators?: string;
  startTime?: string;
  endTime?: string;
  currentStage?: string;
  overallProgress?: number;
  status?: string;
  createdBy?: number;
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

export const getProjects = async (pageNum: number, pageSize: number): Promise<ApiResponse<PageResult<Project>>> => {
  const response = await api.get('/project/list', {
    params: { pageNum, pageSize },
  });
  return response.data;
};

export const getProjectById = async (id: number): Promise<ApiResponse<Project>> => {
  const response = await api.get(`/project/${id}`);
  return response.data;
};

export const createProject = async (project: Project): Promise<ApiResponse<string>> => {
  const response = await api.post('/project/create', project);
  return response.data;
};

export const updateProject = async (id: number, project: Project): Promise<ApiResponse<string>> => {
  const response = await api.put(`/project/update/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: number): Promise<ApiResponse<string>> => {
  const response = await api.delete(`/project/delete/${id}`);
  return response.data;
};

