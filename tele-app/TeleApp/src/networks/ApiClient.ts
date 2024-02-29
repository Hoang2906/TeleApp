import axios from 'axios';

const client = axios.create({
  baseURL: 'http://10.0.2.2:4968/api',
  responseType: 'json',
  withCredentials: true,
  timeout: 20000,
  headers: {
    Accept: 'application/json',
  },
});

client.interceptors.request.use(config => {
  return config;
});

export function handleUnAuthorize(onUnauthorized: () => void) {
  client.interceptors.response.use(
    config => {
      return config;
    },
    error => {
      if (error.isAxiosError) {
        if (error.response.status === 401) {
          onUnauthorized();
        }
      } else {
        console.error(error);
      }
      return Promise.reject(error);
    },
  );
}

export default client;
