export interface ILocation {
  lat: number;
  lng: number;
}

export interface IMarker {
	location: {
		latitude: number;
		longitude: number;
	};
	name?: string;
} 

export interface IMapLocation extends ILocation {
  zoom: number;
}