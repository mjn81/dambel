import React from 'react'
import { useAccountProfile } from '../../hooks'
import { useAppSelector } from '../../redux/hooks'
import { FA_IR_ROLES } from '../../language'
import { Role } from '../../constants'

const Main = () => {
  const { data } = useAccountProfile()
  const auth = useAppSelector((state) => state.auth)
  FA_IR_ROLES[auth.role as Role]
  return (
    <div>Main</div>
  )
}

export default Main