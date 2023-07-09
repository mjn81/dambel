import React, { useEffect } from 'react'
import { FA_IR } from '../language'
import LoadingIcon from '../base-components/LoadingIcon';
import { useLogout } from '../hooks/useLogout';

const LogoutPage = () => {
	const {logout} = useLogout()
	
	useEffect(() => {
		logout()
	}, []);

	return (
		<section className="overflow-hidden grid place-items-center h-full">
			<section className="flex flex-col justify-center items-center gap-4">
				<LoadingIcon icon="ball-triangle" className="w-12 h-12" />
				<p className="text-xl text-white">{FA_IR.LoggingOut}</p>
			</section>
		</section>
	);
}

export default LogoutPage