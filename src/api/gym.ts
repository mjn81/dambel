import { ISearchParams } from "../interfaces";
import { IMapLocation } from "../interfaces/map";
import { deleteApi, get, post, put } from "./methods";

export const postCreateGym = (data: any) => 
  post('/gym/create/', data);


export const getGymDetail = async (id: string) => {
  return await get(`/gym/detail/${id}/`);
}

export const getAvailableProvinceList = async () => {
  return await get('/gym/provinces/');
}

export const getCityList = async (id: string) => {
  return await get(`/gym/provinces/${id}/`);
}

// http://127.0.0.1:8000/gym/list/?latitude=21.45&longitude=20&r=15
export const getGymLocationList = async (location?: IMapLocation) =>
	get('gym/list/', {
		params: {
      latitude: location?.lat,
      longitude: location?.lng,
      r: location?.zoom 
		},
  });


export const getGymList = async ({ searchTerm, location, rate, price }: ISearchParams) =>
	get('gym/list/', {
		params: {
      search: searchTerm,
      latitude: location?.lat,
      longitude: location?.lng,
      r: location?.zoom,
      rate,
      price,
		},
  });
  
export const getMyGymList = async () => get('/gym/my/');

export const getMyGymPlanList = async () => get('/gym/my/plans/');

export const deleteGym = async (id: string) => deleteApi(`/gym/detail/${id}/`);

export const postEditGym = (id: string, data: any) => put(`/gym/detail/${id}/`, data);

export const postCreateGymPlan = (id: string, data: any) => post(`/gym/plan/create/${id}`, data);

export const getGymUsersList = (id: string) => get(`/gym/users/${id}`);

export const postCommentTrainee = (data: any) => post('/gym/comment/create/', data);