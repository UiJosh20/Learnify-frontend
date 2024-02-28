import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNav from './UserNav'

const UserLayout = () => {
  return (
    <>
      <UserNav />
      <Outlet />
    </>
  )
}

export default UserLayout