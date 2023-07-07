import {  useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearAuth } from '../redux/authSlice';
import { useEffect } from 'react';
import { setApiHeader } from '../api/methods';


export const useProtection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!auth.access) {
      dispatch(clearAuth());
      navigate('/auth/login');
    } else if (location.pathname.includes('/auth')) {
      if (navigate.length > 0) {
        navigate(-1)
      } else {
        navigate('/dashboard', { replace: true })
      }
    }
  }, [])
};
