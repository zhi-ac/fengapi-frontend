﻿import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL:
    process.env.NODE_ENV === 'production' ? 'http://106.53.69.148:7529' : 'http://localhost:7529',
  // baseURL: 'http://localhost:7529',
  // baseURL: 'http://10.242.223.234:7529',
  // baseURL: 'http://106.53.69.148:7529',
  withCredentials: true,

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url?.concat('?token = 123');
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;

      // 打印响应数据用于调试
      console.log('data', data);
      // 当响应的状态码不为0，抛出错误
      if (data.code !== 0) {
        throw new Error(data.message);
      }
      // 如果一切正常，返回原始的响应数据
      return response;
    },
  ],
};
