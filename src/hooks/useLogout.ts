import React from 'react'
import { clearAuth } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
	const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(clearAuth());
    setTimeout(() => {
      navigate('/auth/login');
    })
  };
  
  return { logout };
}
