import { Role } from "../constants";
import { IMapLocation } from "./map";

export interface IGymInfo {
	id: string;
	name: string;
	logo_image: string;
	background_image: string;
	description: string;
	gym_owner: {
		id: number;
		user: {
			first_name: string;
			last_name: string;
		};
		license_number: string;
	};
	city: {
		id: number;
		name: string;
	};
	contacts: string;
	location: {
		id: number;
		latitude: number;
		longitude: number;
		address: string;
	};
	plans: 
		{
			id: number;
			name: string;
			time_start: number;
			time_end: number;
			price: string;
      trainer: number;
      trainee: number[];
		}[]
	,
	rate: number;
}

export interface IGymUser {
	id: string;
	name: string;
	profileImage: string;
	role: Role;
	email: string;
	phoneNumber: string;
	plan: {
		id: string;
		name: string;
	}[];
	status: boolean;
}


export interface IAddGym {
	name: string;
	description: string;
	city_id: string;
	contacts: string;
	map_location: {
		latitude: number;
		longitude: number;
		address: string;
	};
}
export interface IAddGymForm {
	name: string;
	address: string;
}

export interface IProvince {
	id: string;
	name: string;
}

export interface ICity extends IProvince {
	city: IProvince[];
}


export interface ISearchParams {
  searchTerm?: string;
  location?: IMapLocation;
  rate?: string;
  price?: string;
}