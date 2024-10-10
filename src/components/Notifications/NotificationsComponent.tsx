import Link from 'next/link'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

export const NotificationsComponent = () => {
    return (
        <>
        {/* no hay context hacete peticion la back 
        las cards usa el componente cardevnts q se parece mucho

        cardEventList
        
        */}
            <div className="py-5 px-4">
                <Link href={"/"}>
                    <BiArrowBack className="mb-4" size={24} color="black" />
                </Link>

                <h1 className="font-bold text-2xl text-black">Notificaciones</h1>
                <div className="flex flex-col items-center gap-4 py-6">
                </div>
            </div>
        </>
    )
}
