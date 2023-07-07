import React, {useState ,useEffect} from 'react'
import { TEHRAN_LOCATION } from '../constants';
import { toast } from 'react-toastify';
import { FA_IR_ERROR } from '../language';

export type GeoLocationStatus = {
	isAllowed: boolean;
	error: string | null;
	isLoading: boolean;
	isInitialLoading: boolean;
};

export const useNavigatableMap = () => {
    const [currentLocation, setCurrentLocation] = useState(TEHRAN_LOCATION);
	  const [geolocationStatus, setGeolocationStatus] =
			useState<GeoLocationStatus>({
				isAllowed: false,
				error: null,
				isLoading: true,
				isInitialLoading: true,
			});
			useEffect(() => {
				if (navigator) {
					navigator.permissions
						.query({ name: 'geolocation' })
						.then((result) => {
							if (result.state === 'granted') {
								navigator.geolocation.getCurrentPosition(
									({ coords }) => {
										setCurrentLocation({
											lat: coords.latitude,
											lng: coords.longitude,
											zoom: TEHRAN_LOCATION.zoom,
										});
										setGeolocationStatus({
											isAllowed: true,
											error: null,
											isLoading: false,
											isInitialLoading: false,
										});
									},
									(error) => {
										setGeolocationStatus({
											isAllowed: false,
											error: error.message,
											isLoading: false,
											isInitialLoading: false,
										});
										toast.error(FA_IR_ERROR.LocationError);
									}
								);
							}
						});
				}
			}, []); 
  const handleResetLocation = () => {
			if (!geolocationStatus.isAllowed) {
				toast.error(FA_IR_ERROR.TurnOnLocation);
				return;
			}
			if (geolocationStatus.isLoading) {
				toast.warning(FA_IR_ERROR.LocationLoading);
				return;
			}
			setGeolocationStatus((state) => ({
				...state,
				isLoading: true,
			}));
			navigator.geolocation.getCurrentPosition(
				({ coords }) => {
					setCurrentLocation({
						lat: coords.latitude,
						lng: coords.longitude,
						zoom: TEHRAN_LOCATION.zoom,
					});
					setGeolocationStatus((state) => ({
						...state,
						isLoading: false,
					}));
				},
				(error) => {
					setGeolocationStatus((state) => ({
						...state,
						isLoading: false,
					}));
					toast.error(FA_IR_ERROR.LocationError);
				}
			);
		};

  return {
    handleResetLocation,
    currentLocation,
    setCurrentLocation,
    geolocationStatus,
  };
}
