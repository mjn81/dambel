import Axios, { AxiosRequestConfig } from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export const setApiHeader = (token: string) => {
  if (!token) return;
  axios.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `JWT ${token}`;
    return config;
  });
}

export const get = async (url: string, config?: AxiosRequestConfig<any>) => {
  return await axios.get(url, config).then((res) => res.data); 
}
export const post = async (url: string, data?:any) => {
  return await axios.post(url, data).then((res) => res.data); 
}

export const deleteApi = async (url: string) => {
  return await axios.delete(url).then((res) => res.data); 
}

export const put = async (url: string, data: any) => {
  return await axios.put(url, data).then((res) => res.data); 
}
