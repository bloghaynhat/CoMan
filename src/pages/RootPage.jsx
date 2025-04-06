import React from 'react'
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const RootPage = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
          <Header/>
          <div className="flex-grow flex flex-row h-[5000px]">
            <SideMenu/>
            <div className="flex-grow">
              <Outlet/>
            </div>
          </div>
          <Footer/>
        </div>
      )
}

export default RootPage