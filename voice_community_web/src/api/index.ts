import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('🌐 [API] 发送请求');
    console.log('🌐 [API] URL:', config.url);
    console.log('🌐 [API] Method:', config.method);
    console.log('🌐 [API] BaseURL:', config.baseURL);
    console.log('🌐 [API] Full URL:', `${config.baseURL}${config.url}`);
    console.log('🌐 [API] Params:', config.params);
    console.log('🌐 [API] Data:', config.data);
    console.log('🌐 [API] Headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('🌐 [API] 请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('🌐 [API] 收到响应');
    console.log('🌐 [API] Status:', response.status);
    console.log('🌐 [API] StatusText:', response.statusText);
    console.log('🌐 [API] Headers:', response.headers);
    console.log('🌐 [API] 响应原始数据:', response.data);
    console.log('🌐 [API] 响应数据类型:', typeof response.data);
    console.log('🌐 [API] 响应数据是否为数组:', Array.isArray(response.data));
    
    if (response.data && typeof response.data === 'object') {
      console.log('🌐 [API] 响应数据键名:', Object.keys(response.data));
      
      // 处理分页响应
      if (response.data.dataList !== undefined) {
        console.log('🌐 [API] dataList 存在，类型:', typeof response.data.dataList);
        console.log('🌐 [API] dataList 是否为数组:', Array.isArray(response.data.dataList));
        if (Array.isArray(response.data.dataList)) {
          console.log('🌐 [API] dataList 长度:', response.data.dataList.length);
        }
        if (response.data.totalCount !== undefined) {
          console.log('🌐 [API] totalCount:', response.data.totalCount);
        }
      }
    }
    
    // 如果响应状态正常，返回 res.data
    if (response.status >= 200 && response.status < 300) {
      console.log('🌐 [API] 响应状态正常，返回 res.data');
      return response.data;
    } else {
      console.warn('🌐 [API] 响应状态异常:', response.status);
      return response.data;
    }
  },
  (error) => {
    console.error('🌐 [API] 响应拦截器捕获错误');
    console.error('🌐 [API] 错误对象:', error);
    console.error('🌐 [API] 错误消息:', error.message);
    if (error.response) {
      console.error('🌐 [API] 错误响应:', error.response);
      console.error('🌐 [API] 错误响应状态:', error.response.status);
      console.error('🌐 [API] 错误响应数据:', error.response.data);
      console.error('🌐 [API] 错误响应头:', error.response.headers);
    }
    if (error.request) {
      console.error('🌐 [API] 请求对象:', error.request);
    }
    if (error.config) {
      console.error('🌐 [API] 错误配置:', error.config);
    }
    return Promise.reject(error);
  }
);

// API 方法
export const getVoicesByParam = (params: any) => {
  return api.get('/voice/getVoicesByParam', { params });
};

export const getAllUsers = () => {
  return api.get('/user/getAllUsers');
};

export const searchVoices = (keyword: string, params?: any) => {
  return api.get('/voice/search', {
    params: {
      keyword,
      ...params,
    },
  });
};

export const getVoiceById = (id: string) => {
  return api.get('/voice/getVoiceById', {
    params: { id },
  });
};

export const getAllCommentByVoiceId = (params: any) => {
  return api.get('/comment/getAllCommentByVoiceId', { params });
};

export const addLike = (voiceId: number, userId: number, type: string) => {
  return api.post('/vote/add', {
    userId,
    targetId: voiceId,
    targetType: type,
  });
};

export const cancelLike = (voiceId: number, userId: number, type: string) => {
  return api.post('/vote/cancel', {
    userId,
    targetId: voiceId,
    targetType: type,
  });
};

export default api;

