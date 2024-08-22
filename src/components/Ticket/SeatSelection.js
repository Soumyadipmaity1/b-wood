"use client"

import { useState } from 'react';
import Link from 'next/link';
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const seatsPerRow = 10;
const seatPrice = 200;

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats] = useState(['C4', 'D5', 'E6']); // booked seats

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return; 

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalAmount = selectedSeats.length * seatPrice;

  return (
    <div className=" text-white  md:mt-10 mt-5 justify-center lg:gap-40 lg:flex-row lg:flex flex flex-col">
     <div className='flex-col flex '>
    <div className='w-64 h-24 mb-14 border-lime-500 border text-black font-bold bg-gray-400 items-center flex justify-center mx-auto'> Screen </div>
     <div className=" mx-auto grid grid-cols-10  sm:gap-4 text-sm sm:text-base gap-2 md:justify-center">
        {rows.map((row) =>
          Array.from({ length: seatsPerRow }).map((_, index) => {
            const seat = `${row}${index + 1}`;
            const isSelected = selectedSeats.includes(seat);
            const isBooked = bookedSeats.includes(seat);
            const seatClass = isBooked
              ? 'bg-gray-500'
              : isSelected
              ? 'bg-[#00ff00] text-black'
              : 'bg-transparent border-[#00ff00] border';

            return (
              <div
                key={seat}
                className={`${seatClass} sm:w-10 sm:h-10 w-8 h-8 rounded-md  cursor-pointer flex items-center justify-center`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat}
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-center my-4 space-x-4">
        <div className="flex items-center">
          <div className="bg-transparent border-[#00ff00] border w-4 h-4 rounded-sm mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-500 w-4 h-4 rounded-sm mr-2"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center">
          <div className="bg-[#00ff00] w-4 h-4 rounded-sm mr-2"></div>
          <span>Selected</span>
        </div>
      </div>

     </div>
      <div className="flex justify-center lg:mt-0 mt-5 items-center">
      <Link href="/movies/booking/ticket/payment" > 
      <button
        className="bg-[#00ff00] hover:bg-lime-600 cursor-pointer text-black font-bold py-2 xl:h-14 lg:h-16 h-14 xl:px-20 lg:px-10 px-20 rounded-lg"
          disabled={totalAmount === 0}
        >
          {totalAmount > 0 ? `Pay ${totalAmount} INR` : 'Book Ticket'}
        </button> </Link>
      </div>
    </div>
  );
};

export default SeatSelection;
