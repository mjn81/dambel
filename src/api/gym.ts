import { get, post } from "./methods";

export const postGymCreate = async (data: any) => {
  return await post('/gym/create/', data);
}

export const getGymList = async () => {
  return await get('/gym/list/');
}

export const getGymDetail = async (id: string) => {
  return await get(`/gym/detail/${id}/`);
}

export const getAvailableProvinceList = async () => {
  return await get('/gym/provinces/');
}

export const getCityList = async (id: string) => {
  return await get(`/gym/provinces/${id}/`);
}
