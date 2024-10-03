'use client'

import React from 'react'
import { HiHome } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import Link from 'next/link';

function NavBar() {
  return (
    <main className='fixed bottom-0 left-0 w-full bg-navbar-gradient shadow-lg z-50'>
      <div className='flex justify-around items-center py-3'>
        <HiHome size={30} className='text-white'/>
        <IoMdNotificationsOutline size={30} className='text-white'/>
        <Link href={'/login'}>
          <BsPerson size={30} className='text-white'/>
        </Link>
      </div>
    </main>
  )
}

export default NavBar;