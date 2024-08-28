"use client"
import React, { useState } from 'react';
import DateSelector from '../../../components/Booking/DateSelector';
import LocationSelector from '../../../components/Booking/LocationSelector';
import TheatreList from '../../../components/Booking/TheatreList';
import OfferCard from '../../../components/Booking/OfferCard';

function Booking({params}) {
  const {id}=params;
  // console.log(id);
    const [location, setLocation] = useState('');

    const handleLocationSelect = (selectedLocation) => {
        setLocation(selectedLocation);
    };

    return (
        <div className="min-h-screen bg-black text-white mt-32 px-10">
            <div className='flex items-center justify-between'>
                <h1 className='text-4xl font-bold tracking-wide'>Deadpool and Wolverine</h1>
                <LocationSelector onSelectLocation={handleLocationSelect} />
            </div>
            <hr className='w-full my-8 border-0 bg-neon h-[1px]' />
            <div className="container mx-auto">
                <DateSelector />
                <div className="flex justify-between mt-8">
                    <TheatreList location={location} id={id} />
                    <OfferCard />
                </div>
            </div>
        </div>
    );
};
export default Booking;