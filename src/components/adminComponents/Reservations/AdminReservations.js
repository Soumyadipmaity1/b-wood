import React, { useState } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import ReservationsSidebar from './ReservationsSidebar';

const Card = ({ name, city, movie, theaterName, amount, totalPrice, orderId, date, showtime, seats, onClick }) => {
    return (
        <div
            className="relative border-2 ml-4 w-60 cursor-pointer text-center border-neon rounded-xl shadow-lg flex flex-col justify-center p-2 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-80"
            onClick={onClick}
        >
            <div className="relative h-80 w-full pt-6 flex flex-col items-center justify-between rounded-md mb-4 overflow-hidden">
                <FaTicketAlt className='size-28' />
                <div className='flex flex-col items-center justify-start'>
                    <p className="font-extrabold tracking-wider text-lg mb-2">{name}</p>
                    <p className="font-normal text-sm mb-2">{theaterName}, {city}</p>
                    <p className="font-normal text-sm mb-2">{movie}</p>
                    <p className="font-normal text-sm mb-2">Amount: {totalPrice}</p>
                    <p className="font-normal text-sm mb-2">Order ID: {orderId}</p>
                    <p className="font-normal text-sm mb-2">Created at: {format(new Date(date), 'dd/MM/yyyy')}</p>
                </div>
            </div>
        </div>
    );
};

const AdminReservations = ({ onOpenSidebar }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleCardClick = () => {
        setSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    const reservations = [
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        },
        {
            name: 'Sambit Mondal',
            city: 'Bhubaneswar',
            movie: 'Inception',
            theaterName: 'INOX Cineplex',
            totalPrice: '500',
            date: new Date(),
            orderId: '12345',
        }
    ];

    return (
        <>
            <div className="w-full h-full overflow-x-auto py-5 pr-2 rounded-xl" style={{ scrollbarWidth: 'none' }}>
                <div className="flex space-x-6" style={{ minWidth: 'max-content' }}>
                    {reservations.map((reservation, index) => (
                        <Card
                            key={index}
                            name={reservation.name}
                            city={reservation.city}
                            movie={reservation.movie}
                            theaterName={reservation.theaterName}
                            totalPrice={reservation.totalPrice}
                            date={reservation.date}
                            showtime={reservation.showtime}
                            seats={reservation.seats}
                            orderId={reservation.orderId}
                            onClick={handleCardClick}
                        />
                    ))}
                </div>
            </div>

            <ReservationsSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        </>
    );
};

export default AdminReservations;