import React from 'react'
import EmptyImage from '@/../public/Seo.png'
import Image from 'next/image'

function EmptyEvents({text} : {text: string}) {
  return (
    <div className='flex flex-col justify-center items-center'>
        <Image
            src={EmptyImage}
            alt="Event Image"
            width={222}
            height={167}
            priority={true}
        />
        <p className='text-[#191C1C] font-semibold text-[16px]'>{text}</p>
    </div>
  )
}

export default EmptyEvents