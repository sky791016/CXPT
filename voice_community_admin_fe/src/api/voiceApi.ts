import axios from 'axios';

const api = axios.create({
  baseURL: '/admin/api',
  timeout: 10000,
});

export interface Voice {
  id?: number;
  userId?: number;
  title?: string;
  content?: string;
  type?: string;
  status?: string;
}

export const getVoices = (pageNum: number = 1, pageSize: number = 10) => {
  return api.get('/voice/list', { params: { pageNum, pageSize } });
};

export const getVoice = (id: number) => {
  return api.get(`/voice/${id}`);
};

export const createVoice = (voice: Voice) => {
  return api.post('/voice/create', voice);
};

export const updateVoice = (id: number, voice: Voice) => {
  return api.put(`/voice/update/${id}`, voice);
};

export const deleteVoice = (id: number) => {
  return api.delete(`/voice/delete/${id}`);
};

