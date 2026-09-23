import axios from 'axios';

export enum HttpMethodApi {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

interface RequestOptions {
  endpoint: string;
  method: HttpMethodApi;
  data?: Record<string, any> | FormData;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export const apiClient = axios.create({
  baseURL: 'http://18.219.138.66:3001/',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    console.log(`➡️ ${config.method?.toUpperCase()} ${config.url}`);
    console.log(`${JSON.stringify(config.params)}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    console.log(`${JSON.stringify(response.data)}`);
    return response;
  },
  error => {
    console.log(`❌ ${error.response?.status} ${error.config?.url}`);

    const message =
      error.response?.data?.message ?? error.message ?? 'Something went wrong';

    return Promise.reject(new Error(message));
  },
);

// ===============

type ApiResponse<T> = {
  success: boolean;
  result: T;
  error: any;
};
export const makeRequest = async <T>({
  endpoint,
  method,
  data,
  headers,
  params,
}: RequestOptions): Promise<T> => {
  const response = await apiClient.request<ApiResponse<T>>({
    url: endpoint,
    method,
    data,
    headers,
    params,
  });

  return response.data.result;
};
