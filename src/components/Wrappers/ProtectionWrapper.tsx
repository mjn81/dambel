import React, {useEffect} from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useProtection } from '../../hooks/useProtection';
import { useAppSelector } from '../../redux/hooks';
import { setApiHeader } from '../../api/methods';

export const ProtectionWrapper = () => {
  useProtection();
  return (
    <Outlet />
  )
}

export const HeaderApiLoader = () => {
  const auth = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (auth.access) {
      setApiHeader(auth.access);
    }
    else if (!location.pathname.includes('/auth')){
      setApiHeader('');
      navigate('/auth/login');
    }
  }, [auth])

  return (
    <>
    </>
  )
}