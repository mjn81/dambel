export interface ILocation {
  lat: number;
  lng: number;
}

export interface IMapLocation extends ILocation {
  zoom: number;
}