import React from 'react'
import Header from '../components/user/header'

const UserLayout = ({ children }) => {
  return (
    <>
        <Header />
        {children}
    </>
  )
}

export default UserLayout