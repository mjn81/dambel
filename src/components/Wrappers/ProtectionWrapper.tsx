import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
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
  
  useEffect(() => {
    if (auth.access) {
      setApiHeader(auth.access);
    }
  }, [auth])

  return (
    <>
    </>
  )
}