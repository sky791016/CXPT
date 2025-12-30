import axios from 'axios';

const api = axios.create({
  baseURL: '/admin/api',
  timeout: 10000,
});

export const getStatistics = () => {
  return api.get('/statistics/overview');
};

