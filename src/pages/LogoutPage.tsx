import React, { useEffect } from 'react'
import { FA_IR } from '../language'
import LoadingIcon from '../base-components/LoadingIcon';
import { useAppDispatch } from '../redux/hooks';
import { clearAuth } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(clearAuth());
		setTimeout(() => {
			navigate('/auth/login');
		}, 1000);
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