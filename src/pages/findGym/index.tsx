import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { FA_IR, FA_IR_ERROR } from "../../language";
import LeafletMap from "../../components/LeafletMap";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";

import { TEHRAN_LOCATION } from "../../constants";
import { set } from "lodash";

type GeoLocationStatus = {
  isAllowed: boolean;
  error: string | null;
  isLoading: boolean;
  isInitialLoading: boolean;
}

function Main() {
  const [currentLocation, setCurrentLocation] = useState(TEHRAN_LOCATION);
  const [geolocationStatus, setGeolocationStatus] = useState<GeoLocationStatus>({
    isAllowed: false,
    error: null,
    isLoading: true,
    isInitialLoading: true,
  });
  useEffect(() => {
    if (navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
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

  const handleSubmit = () => {
    console.log(currentLocation)
  }

  const handleResetLocation = () => {
    if (!geolocationStatus.isAllowed) {
      toast.error(FA_IR_ERROR.TurnOnLocation);
      return;
    }
    if (geolocationStatus.isLoading) {
      toast.warning(FA_IR_ERROR.LocationLoading);
      return;
    }
    setGeolocationStatus(state => ({
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
  }

  return (
		<section className="rtl">
			<div className="flex items-center mt-8 intro-y">
				<h2 className="ml-auto text-lg font-medium">{FA_IR.FindAGym}</h2>
			</div>
			<section className="flex mt-5 flex-col gap-5">
				<section className="relative z-20">
					{geolocationStatus.isInitialLoading ? (
						<div className="h-[510px] rounded flex justify-center items-center bg-secondary text-dark text-xl">
							<div className="lds-dual-ring">{FA_IR.Loading}</div>
						</div>
					) : (
						<LeafletMap
							isLoading={geolocationStatus.isLoading}
							currentLoaction={currentLocation}
							setCurrentLocation={setCurrentLocation}
							className="h-[510px] rounded-md bg-slate-200 z-20"
						/>
					)}

					<Button
            onClick={handleResetLocation}
            disabled={geolocationStatus.isLoading}
						className="absolute z-30 bottom-3 right-3"
						variant="linkedin"
					>
						<Lucide icon="LocateFixed" />
					</Button>
				</section>

				<Button onClick={handleSubmit} variant="primary" className="w-full">
					{FA_IR.FindAGym}
				</Button>
			</section>
		</section>
	);
}

export default Main;
