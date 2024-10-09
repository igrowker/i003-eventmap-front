import React from 'react';

function DateTimeComponent({ date, time, size }) {
  
  const dateTimeString = `${date}T${time}`;
  const dateTime = new Date(dateTimeString);

  const options = {
    weekday: 'long',
    day: 'numeric', 
    month: 'long',  
    hour: 'numeric',
    hour12: false,  
  };

  const formattedDate = dateTime.toLocaleDateString('es-ES', options);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formattedDateWithCapital = capitalizeFirstLetter(formattedDate);
  return (
    <div>
      <p className={`text-[#292929] font-normal ${size}`}>{formattedDateWithCapital} hs.</p>
    </div>
  );
}

export default DateTimeComponent;
