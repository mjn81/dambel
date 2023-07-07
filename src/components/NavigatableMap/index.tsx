import React from 'react'
import LeafletMap from '../../components/LeafletMap';
import Lucide from '../../base-components/Lucide';
import Button from '../../base-components/Button';
import { IMapLocation } from '../../interfaces/map';
import { GeoLocationStatus } from '../../hooks/useNavigatableMap';
import { FA_IR } from '../../language';
import clsx from 'clsx';

type Props = {
  geolocationStatus: GeoLocationStatus;
  currentLocation: IMapLocation;
  setCurrentLocation: React.Dispatch<React.SetStateAction<IMapLocation>>;
	handleResetLocation: () => void;
	className?: string;
}


export const NavigatableMap = ({
	geolocationStatus,
	currentLocation,
	setCurrentLocation,
	handleResetLocation,
	className
}: Props) => {
	return (
		<section className="relative z-20">
			{geolocationStatus.isInitialLoading ? (
				<div
					className={clsx([
						'rounded flex justify-center items-center bg-secondary text-dark text-xl',
						className,
					])}
				>
					<div className="lds-dual-ring">{FA_IR.Loading}</div>
				</div>
			) : (
				<LeafletMap
					isLoading={geolocationStatus.isLoading}
					currentLoaction={currentLocation}
					setCurrentLocation={setCurrentLocation}
					className={clsx([className, 'rounded-md bg-slate-200 z-20'])}
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
	);
};
