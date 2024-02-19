import { ElLoading } from "element-plus";
import type { AxiosInstance } from "axios";
import type { GECRequestInterceptors, GECRequestConfig } from "./type";
import "element-plus/es/components/loading/style/css";
import axios from "axios";

const DEFAULT_LOADING = true;

class GECRequest<T = any> {
  instance: AxiosInstance;
  interceptors?: GECRequestInterceptors;
  showLoading?: boolean;
  loading?: any;

  constructor(config: GECRequestConfig<T>) {
    this.instance = axios.create(config);
    this.showLoading =
      config.showLoading === undefined ? DEFAULT_LOADING : config.showLoading;

    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // global interceptors
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "Loading...",
            background: "rgba(0, 0, 0, 0.2)",
            fullscreen: true,
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        return res.data ?? res;
      },
      (err) => {
        this.loading?.close();
        return err;
      }
    );
  }

  request<T = any>(config: GECRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<T, T>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          return err;
        })
        .finally(() => {
          this.showLoading = DEFAULT_LOADING;
        });
    });
  }

  get<T = any>(config: GECRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: GECRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T = any>(config: GECRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: GECRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default GECRequest;
