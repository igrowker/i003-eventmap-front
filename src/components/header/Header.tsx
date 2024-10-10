import React from 'react';
import EventMap from '../../../public/EventmapIcon.svg';

function Header() {
  return (
    <div className='flex items-center justify-start'>
      <EventMap/>
      <h1 className='text-xl text-black font-cocomatPro'>EventMap</h1>
    </div>
  );
}

export default Header;
