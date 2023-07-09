import { useMutation, useQuery } from "react-query"
import { getAvailableProvinceList, getCityList, getGymLocationList, postCreateGym } from "../../api"
import { IMapLocation } from "../../interfaces/map";
import { IAddGym, ICity, IGymInfo, IProvince } from "../../interfaces";
import { GeoLocationStatus } from "../useNavigatableMap";

export const useGetProvinceList = () => {
	return useQuery<IProvince[]>('GET-PROVINCE-LIST', getAvailableProvinceList);
}
export const useGetCityList = (provinceId: string) => {
	return useQuery<ICity>(['GET-CITY-LIST', provinceId], () =>getCityList(provinceId), {
		enabled: !!provinceId,
	});
}

export const useCreateGym = () => {
	return useMutation<IGymInfo,undefined, any>(['CREATE-GYM'], postCreateGym, {
		onSuccess: (data) => {
			console.log(data);
		},
	});
}


export const useGymLocationList = (location?: IMapLocation, geoStatus?: GeoLocationStatus) => {
  return useQuery<IGymInfo[]>(
		['GET-GYM-LOC-LIST', location],
		() => getGymLocationList(location),
		{
			onSuccess: (data) => {
				console.log(data);
			},
			enabled: !!geoStatus ? !geoStatus.isLoading : true,
		}
	);
}