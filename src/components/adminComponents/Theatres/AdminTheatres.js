import React, { useState } from 'react';
import { FaFilm } from 'react-icons/fa';
import TheatresSidebar from './TheatresSidebar';
import { format } from 'date-fns';

const formattedDate = format(new Date(), 'dd/MM/yyyy');

const Card = ({ name, city, date, showtimes, onClick }) => {
  return (
    <div
      className="relative border-2 ml-4 w-60 cursor-pointer text-center border-neon rounded-xl shadow-lg flex flex-col justify-center p-2 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-80"
      onClick={onClick}
    >
      <div className="relative h-80 w-full pt-6 flex flex-col items-center justify-between rounded-md mb-4 overflow-hidden">
        <FaFilm className='size-28' />
        <div className='flex flex-col items-center justify-start'>
          <p className="font-extrabold tracking-wider text-lg mb-2">{name}</p>
          <p className="font-normal text-sm mb-2">{city}</p>
          <p className="font-normal text-sm mb-2">{format(new Date(), 'dd/MM/yyyy')}</p>
          <p className="font-normal text-sm mb-2">Showtimes: {showtimes.length}</p>
        </div>
      </div>
    </div>
  );
};

const AdminTheatres = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleCardClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const theaters = [
    {
      name: 'SVF Cinemas',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '12:00 PM', price: 15, seats: [{ seatNumber: 'A1', isReserved: false }] },
        { time: '03:00 PM', price: 20, seats: [{ seatNumber: 'A1', isReserved: false }] },
      ],
    },
    {
      name: 'Inox Cineplex',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '01:00 PM', price: 18, seats: [{ seatNumber: 'B1', isReserved: true }] },
      ],
    },
    {
      name: 'SVF Cinemas',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '12:00 PM', price: 15, seats: [{ seatNumber: 'A1', isReserved: false }] },
        { time: '03:00 PM', price: 20, seats: [{ seatNumber: 'A1', isReserved: false }] },
      ],
    },
    {
      name: 'Inox Cineplex',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '01:00 PM', price: 18, seats: [{ seatNumber: 'B1', isReserved: true }] },
      ],
    },
    {
      name: 'SVF Cinemas',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '12:00 PM', price: 15, seats: [{ seatNumber: 'A1', isReserved: false }] },
        { time: '03:00 PM', price: 20, seats: [{ seatNumber: 'A1', isReserved: false }] },
      ],
    },
    {
      name: 'Inox Cineplex',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '01:00 PM', price: 18, seats: [{ seatNumber: 'B1', isReserved: true }] },
      ],
    },
    {
      name: 'SVF Cinemas',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '12:00 PM', price: 15, seats: [{ seatNumber: 'A1', isReserved: false }] },
        { time: '03:00 PM', price: 20, seats: [{ seatNumber: 'A1', isReserved: false }] },
      ],
    },
    {
      name: 'Inox Cineplex',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '01:00 PM', price: 18, seats: [{ seatNumber: 'B1', isReserved: true }] },
      ],
    },
    {
      name: 'SVF Cinemas',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '12:00 PM', price: 15, seats: [{ seatNumber: 'A1', isReserved: false }] },
        { time: '03:00 PM', price: 20, seats: [{ seatNumber: 'A1', isReserved: false }] },
      ],
    },
    {
      name: 'Inox Cineplex',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '01:00 PM', price: 18, seats: [{ seatNumber: 'B1', isReserved: true }] },
      ],
    },
    {
      name: 'SVF Cinemas',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '12:00 PM', price: 15, seats: [{ seatNumber: 'A1', isReserved: false }] },
        { time: '03:00 PM', price: 20, seats: [{ seatNumber: 'A1', isReserved: false }] },
      ],
    },
    {
      name: 'Inox Cineplex',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '01:00 PM', price: 18, seats: [{ seatNumber: 'B1', isReserved: true }] },
      ],
    },
    {
      name: 'SVF Cinemas',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '12:00 PM', price: 15, seats: [{ seatNumber: 'A1', isReserved: false }] },
        { time: '03:00 PM', price: 20, seats: [{ seatNumber: 'A1', isReserved: false }] },
      ],
    },
    {
      name: 'Inox Cineplex',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '01:00 PM', price: 18, seats: [{ seatNumber: 'B1', isReserved: true }] },
      ],
    },
    {
      name: 'SVF Cinemas',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '12:00 PM', price: 15, seats: [{ seatNumber: 'A1', isReserved: false }] },
        { time: '03:00 PM', price: 20, seats: [{ seatNumber: 'A1', isReserved: false }] },
      ],
    },
    {
      name: 'Inox Cineplex',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '01:00 PM', price: 18, seats: [{ seatNumber: 'B1', isReserved: true }] },
      ],
    },
    {
      name: 'SVF Cinemas',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '12:00 PM', price: 15, seats: [{ seatNumber: 'A1', isReserved: false }] },
        { time: '03:00 PM', price: 20, seats: [{ seatNumber: 'A1', isReserved: false }] },
      ],
    },
    {
      name: 'Inox Cineplex',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '01:00 PM', price: 18, seats: [{ seatNumber: 'B1', isReserved: true }] },
      ],
    },
    {
      name: 'SVF Cinemas',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '12:00 PM', price: 15, seats: [{ seatNumber: 'A1', isReserved: false }] },
        { time: '03:00 PM', price: 20, seats: [{ seatNumber: 'A1', isReserved: false }] },
      ],
    },
    {
      name: 'Inox Cineplex',
      city: 'Bhubaneswar',
      date: new Date(),
      showtimes: [
        { time: '01:00 PM', price: 18, seats: [{ seatNumber: 'B1', isReserved: true }] },
      ],
    },
  ];

  return (
    <>
      <div className="w-full h-full overflow-x-auto py-5 pr-2 rounded-xl" style={{ scrollbarWidth: 'none' }}>
        <div className="flex space-x-6" style={{ minWidth: 'max-content' }}>
          {theaters.map((theater, index) => (
            <Card
              key={index}
              name={theater.name}
              city={theater.city}
              date={theater.date}
              showtimes={theater.showtimes}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <TheatresSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
    </>
  );
}

export default AdminTheatres;