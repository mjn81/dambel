import { IMapLocation } from "../interfaces/map";
import { get, post } from "./methods";

export const postCreateGym = (data: any) => 
  post('/gym/create/', data);


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

// http://127.0.0.1:8000/gym/list/?latitude=21.45&longitude=20&r=15
export const getGymLocationList = async (location?: IMapLocation) =>
	get('gym/list/', {
		params: {
      latitude: location?.lat,
      longitude: location?.lng,
      r: location?.zoom 
		},
	});