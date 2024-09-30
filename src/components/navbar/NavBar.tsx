import React from 'react'
import { HiHome } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";

function NavBar() {
  return (
    <main className='fixed bottom-0 left-0 w-full bg-navbar-gradient shadow-lg z-50'>
      <div className='flex justify-around items-center py-3'>
        <HiHome size={30} className='text-white'/>
        <IoMdNotificationsOutline size={30} className='text-white'/>
        <BsPerson size={30} className='text-white'/>
      </div>
    </main>
  )
}

export default NavBar;