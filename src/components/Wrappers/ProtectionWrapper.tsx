import React from 'react'
import { Outlet } from 'react-router-dom'
import { useProtection } from '../../hooks/useProtection';

export const ProtectionWrapper = () => {
  useProtection();
  return (
    <Outlet />
  )
}
