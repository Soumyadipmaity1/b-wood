import React, { useState } from 'react';

const TimeInput = ({time,setTime}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setTime((prevTime) => ({
        ...prevTime,
        [name]: value,
      }));
    }
  };

  return (
    <div className="flex w-full items-center justify-between space-x-2">

      <input
        type="text"
        name="hours"
        value={time.hours}
        onChange={handleInputChange}
        placeholder="HH"
        maxLength="2"
        className="w-16 p-1 pl-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-neon"
      />

      <span className="self-center">:</span>

      <input
        type="text"
        name="minutes"
        value={time.minutes}
        onChange={handleInputChange}
        placeholder="MM"
        maxLength="2"
        className="w-16 p-1 pl-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-neon"
      />

      <span className="self-center">:</span>

      <input
        type="text"
        name="seconds"
        value={time.seconds}
        onChange={handleInputChange}
        placeholder="SS"
        maxLength="2"
        className="w-16 p-1 pl-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-neon"
      />

    </div>
  );
};

export default TimeInput;