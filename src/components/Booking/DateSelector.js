'use client'
import React, { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DateSelector = () => {
    const dates = [
        '9th August', '10th August', '11th August', '12th August', '13th August', 
        '14th August', '15th August', '16th August', '17th August', '18th August',
        '19th August', '20th August', '21st August', '22nd August', '23rd August'
    ];

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -150,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 150,
            behavior: 'smooth'
        });
    };

    return (
        <div className="flex items-center justify-center bg-black text-neon w-full">
            <button onClick={scrollLeft} className="p-2">
                <FaChevronLeft className='size-7 lg:size-9 text-neon bg-gray-800 hover:bg-gray-700 transition duration-200 ease-in-out rounded-full p-2' />
            </button>
            <div ref={scrollRef} className="flex items-center justify-start overflow-hidden overflow-x-scroll gap-4 px-5 py-2 scrollbar-hidden">
                {dates.map((date, index) => (
                    <button key={index} className="bg-gray-800 text-neon font-bold border-2 border-neon px-10 py-2 rounded-lg hover:bg-black transition duration-200 ease-in-out">
                        {date}
                    </button>
                ))}
            </div>
            <button onClick={scrollRight} className="p-2">
                <FaChevronRight className='size-7 lg:size-9 text-neon bg-gray-800 hover:bg-gray-700 transition duration-200 ease-in-out rounded-full p-2' />
            </button>
        </div>
    );
};

export default DateSelector;