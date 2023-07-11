import React, { useEffect } from 'react'
import { setApiHeader } from '../../api/methods';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';


export const HeaderApiLoader = () => {
	const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (auth.access) {
			setApiHeader(auth.access);
		} else if (!location.pathname.includes('/auth') && location.pathname !== '/') {
			setApiHeader('');
			console.log('auth included');
			navigate('/auth/login');
		}
	}, [auth]);

	return <></>;
};
