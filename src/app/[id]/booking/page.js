"use client"
import React, { useEffect, useState } from 'react';
import DateSelector from '../../../components/Booking/DateSelector';
import LocationSelector from '../../../components/Booking/LocationSelector';
import TheatreList from '../../../components/Booking/TheatreList';
import OfferCard from '../../../components/Booking/OfferCard';
import { getMoviebyId } from '../../../actions/movie';

function Booking({params}) {
  const {id}=params;
    const [location, setLocation] = useState('');
    const [movieName,setMovieName] = useState('');

    useEffect(()=>{
        const fetchMovie=async()=>{
            try {
                const res=await getMoviebyId(id);
                if(res){
                    setMovieName(res.title);
                }
                console.log(res)
            } catch (error) {
                console.log(error);
            }
        }
        fetchMovie();
    },[])

    const handleLocationSelect = (selectedLocation) => {
        setLocation(selectedLocation);
    };

    return (
        <div className="h-full w-full lg:min-h-screen bg-black text-white mt-28 lg:mt-36 lg:px-10">
            <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0'>
                <h1 className='text-4xl font-bold tracking-wide text-center'>{movieName?movieName:"Loading..."}</h1>
                <LocationSelector onSelectLocation={handleLocationSelect} />
            </div>
            <hr className='w-11/12 my-8 mx-auto border-0 bg-neon h-[1px]' />
            <div className="container mx-auto">
                <DateSelector />
                <div className="flex justify-between mt-8 mx-2">
                    <TheatreList location={location} id={id} />
                    <OfferCard />
                </div>
            </div>
        </div>
    );
};
export default Booking;