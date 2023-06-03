import axios, { AxiosResponse } from "axios";
import { HttpServiceInterface } from "../Interface";

export const AxiosImplementation: HttpServiceInterface = (token) => (deps) => {
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    get: async <TResponse>(url: string, params?: string[] | string) => {
      return axiosInstance
        .get<TResponse>(url, {
          params,
        })
        .then((res) => res.data);
    },
    post: async <TData, TResponse>(
      url: string,
      data: TData,
      params?: string[] | string
    ) => {
      return axiosInstance
        .post<TResponse, AxiosResponse<TResponse>, TData>(url, data, { params })
        .then((res) => res.data);
    },
  };
};
