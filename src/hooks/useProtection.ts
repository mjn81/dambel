import {  useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearAuth } from '../redux/authSlice';
import { useEffect } from 'react';


export const useProtection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!auth.access && !location.pathname.includes('auth')) {
			dispatch(clearAuth());
			navigate('/auth/login');
    }
  }, [])
};
