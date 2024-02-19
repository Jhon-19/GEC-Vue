import localCache from "@/utils/cache";
import GECRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
import { GEC_AUTH } from "@/constants/auth.constant";

const gecRequest = new GECRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache(GEC_AUTH);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

export default gecRequest;
