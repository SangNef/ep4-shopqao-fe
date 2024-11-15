import React from 'react'
import Header from '../components/user/header'
import Footer from '../components/user/footer'

const UserLayout = ({ children }) => {
  return (
    <>
        <Header />
        <main className='min-h-screen'>{children}</main>
        <Footer />
    </>
  )
}

export default UserLayout