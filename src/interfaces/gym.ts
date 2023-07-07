export interface IGymInfo {
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
	plans: [
		{
			id: number;
			name: string;
			time_start: string;
			time_end: string;
			price: string;
      trainer: number;
      trainee: number[];
		}
	];
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