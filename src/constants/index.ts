import { IMapLocation } from "../interfaces/map";

export enum Role {
	GymOwner = 'GymOwner',
	Trainer = 'Trainer',
	Trainee = 'Trainee',
}

export const TEHRAN_LOCATION: IMapLocation = {
	lat: 35.6892,
	lng: 51.3890,
	zoom: 18,
};
