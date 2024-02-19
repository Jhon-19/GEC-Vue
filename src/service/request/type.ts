import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface GECRequestInterceptors<T = any> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (
    res: AxiosResponse<T>
  ) => AxiosResponse<T> | Promise<AxiosResponse<T>>;
  responseInterceptorCatch?: (err: any) => any;
}

export interface GECRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: GECRequestInterceptors<T>;
  showLoading?: boolean;
}
