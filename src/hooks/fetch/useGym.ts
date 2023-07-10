import { useMutation, useQuery } from "react-query"
import { deleteGym, getAvailableProvinceList, getCityList, getGymDetail, getGymList, getGymLocationList, getGymUsersList, getMyGymList, getMyGymPlanList, postCommentTrainee, postCreateGym, postCreateGymPlan, postEditGym } from "../../api"
import { IMapLocation } from "../../interfaces/map";
import { IAddGym, ICity, IGymInfo, IProvince, ISearchParams } from "../../interfaces";
import { GeoLocationStatus } from "../useNavigatableMap";
import { GymListArray } from "../../pages/gym/findGym";

export const useGetProvinceList = () => {
	return useQuery<IProvince[]>('GET-PROVINCE-LIST', getAvailableProvinceList);
}
export const useGetCityList = (provinceId: string) => {
	return useQuery<ICity>(['GET-CITY-LIST', provinceId], () =>getCityList(provinceId), {
		enabled: !!provinceId,
	});
}

export const useCreateGym = () => {
	return useMutation<IGymInfo,undefined, any>(['CREATE-GYM'], postCreateGym);
}


export const useGymLocationList = (location?: IMapLocation, geoStatus?: GeoLocationStatus) => {
  return useQuery<IGymInfo[]>(
		['GET-GYM-LOC-LIST', location],
		() => getGymList({
			location,
		}),
		{
			onSuccess: (data) => {
				for (let i = 0; i < data.length; i++) {
					if (GymListArray.findIndex(item => item.id === data[i].id) === -1) {
						GymListArray.push(data[i]);
					}
				}
			},
			initialData: [],
			enabled: !!geoStatus ? !geoStatus.isLoading : true,
		}
	);
}

export const useGymListSearch = ({ searchTerm, location, rate, price }:ISearchParams) => {
	return useQuery<IGymInfo[]>(
		['GET-GYM-LIST', searchTerm, location, rate, price],
		() =>
			getGymList({
				searchTerm,
				location,
				rate: rate === '#' ? undefined : rate,
				price: price === '#' ? undefined : price,
			})
	);
};

export const useGymDetail = (gymId: string) => {
	return useQuery<IGymInfo>(
		['GET-GYM-DETAIL', gymId],
		() => getGymDetail(gymId),
		{
			enabled: !!gymId,
		}
	);
}

export const useMyGymList = () => {
	return useQuery<IGymInfo[]>(
		['GET-MY-GYM-LIST'],
		getMyGymList,
	);
}

export const useGymPlan = () => {
	return useQuery<IGymInfo>(
		['GET-GYM-PLAN'],
		getMyGymPlanList,
	);
}


export const useDeleteGym = () => {
	return useMutation<undefined, any, string>(['DELETE-GYM'], (id) => deleteGym(id));
}

export const useGymEdit = () => {
	return useMutation<IGymInfo, any, any>(['EDIT-GYM'], ({id, data}: any) => postEditGym(id,data));
}

export const useCreateGymPlan = () => {
	return useMutation<undefined, any, any>(['CREATE-GYM-PLAN'], ({id, data}) => postCreateGymPlan(id,data));
}

export const useGymUsers = (gymId: string) => {
	return useQuery<any>(
		['GET-GYM-USERS', gymId],
		() => getGymUsersList(gymId),
		{
			enabled: !!gymId,
		}
	);
}

export const usePostComment = () => {
	return useMutation<undefined, any, any>(['POST-COMMENT'], (data) => postCommentTrainee(data));
}