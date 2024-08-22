'use client';
import React, { useState } from 'react';
import { FaTimes, FaTicketAlt } from 'react-icons/fa'; // Updated icon import

const ReservationsSidebar = ({ isOpen, onClose, mode }) => {
    const [reservations, setReservations] = useState([{ theaterName: '', amount: '', totalPrice: '', orderId: '', date: '', showtime: '', name: '', city: '' }]);

    const handleReservationChange = (index, event) => {
        const { name, value } = event.target;
        const updatedReservations = [...reservations];
        updatedReservations[index][name] = value;
        setReservations(updatedReservations);
    };

    const addReservation = () => {
        setReservations([...reservations, { theaterName: '', amount: '', totalPrice: '', orderId: '', date: '', showtime: '', name: '', city: '' }]);
    };

    const removeReservation = (index) => {
        const updatedReservations = [...reservations];
        updatedReservations.splice(index, 1);
        setReservations(updatedReservations);
    };

    return (
        <div
            className={`fixed right-0 top-0 bottom-0 w-full lg:w-96 p-12 pt-14 bg-black z-[60] border-l-2 border-l-neon overflow-scroll scrollbar-hidden transition-transform duration-300 ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
                }`}
        >
            <FaTimes
                className='absolute top-5 left-5 size-6 text-neon cursor-pointer'
                onClick={onClose}
            />
            <form className='flex flex-col gap-8'>
                {reservations.map((reservation, reservationIndex) => (
                    <div key={reservationIndex} className='flex flex-col gap-8'>

                        <div className='flex flex-col gap-2'>
                            <label className='text-neon font-semibold'>Customer Name</label>
                            <input
                                type='text'
                                name='name'
                                placeholder='Enter the customer name...'
                                value={reservation.name}
                                onChange={(e) => handleReservationChange(reservationIndex, e)}
                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-neon font-semibold'>City</label>
                            <input
                                type='text'
                                name='city'
                                placeholder='Enter the city...'
                                value={reservation.city}
                                onChange={(e) => handleReservationChange(reservationIndex, e)}
                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-neon font-semibold'>Theater Name</label>
                            <input
                                type='text'
                                name='theaterName'
                                placeholder='Enter the theater name...'
                                value={reservation.theaterName}
                                onChange={(e) => handleReservationChange(reservationIndex, e)}
                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-neon font-semibold'>Amount</label>
                            <input
                                type='number'
                                name='amount'
                                placeholder='Enter the amount...'
                                value={reservation.amount}
                                onChange={(e) => handleReservationChange(reservationIndex, e)}
                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-neon font-semibold'>Total Price</label>
                            <input
                                type='number'
                                name='totalPrice'
                                placeholder='Enter the total price...'
                                value={reservation.totalPrice}
                                onChange={(e) => handleReservationChange(reservationIndex, e)}
                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-neon font-semibold'>Order ID</label>
                            <input
                                type='text'
                                name='orderId'
                                placeholder='Enter the order ID...'
                                value={reservation.orderId}
                                onChange={(e) => handleReservationChange(reservationIndex, e)}
                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-neon font-semibold'>Date</label>
                            <input
                                type='datetime-local'
                                name='date'
                                value={reservation.date}
                                onChange={(e) => handleReservationChange(reservationIndex, e)}
                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-neon font-semibold'>Showtime</label>
                            <input
                                type='text'
                                name='showtime'
                                placeholder='Enter the showtime...'
                                value={reservation.showtime}
                                onChange={(e) => handleReservationChange(reservationIndex, e)}
                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                            />
                        </div>

                    </div>
                ))}

                {mode === 'add' ? (
                    <div className='flex items-center justify-around pt-10'>
                        <button type='submit' className='bg-neon text-black py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110'>ADD RESERVATION</button>
                    </div>
                ) : (
                    <div className='flex items-center justify-around gap-3 pt-10'>
                        <button type='submit' className='bg-neon text-black py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110'>UPDATE</button>
                        <button type='submit' className='bg-black border-2 border-neon text-neon py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110'>DELETE</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ReservationsSidebar;