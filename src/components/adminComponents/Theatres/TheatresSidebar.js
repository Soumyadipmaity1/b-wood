'use client';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const TheatresSidebar = ({ isOpen, onClose, mode }) => {
    const [dates, setDates] = useState([{ date: '', movies: [{ movieID: '', showtimes: [{ time: '', price: '', seats: [{ seatNumber: '', isReserved: false }] }] }] }]);

    const handleDateChange = (index, event) => {
        const { name, value } = event.target;
        const updatedDates = [...dates];
        updatedDates[index][name] = value;
        setDates(updatedDates);
    };

    const handleMovieChange = (dateIndex, movieIndex, event) => {
        const { name, value } = event.target;
        const updatedDates = [...dates];
        updatedDates[dateIndex].movies[movieIndex][name] = value;
        setDates(updatedDates);
    };

    const handleShowtimeChange = (dateIndex, movieIndex, showtimeIndex, event) => {
        const { name, value } = event.target;
        const updatedDates = [...dates];
        updatedDates[dateIndex].movies[movieIndex].showtimes[showtimeIndex][name] = value;
        setDates(updatedDates);
    };

    const handleSeatChange = (dateIndex, movieIndex, showtimeIndex, seatIndex, event) => {
        const { name, value, type, checked } = event.target;
        const updatedDates = [...dates];
        updatedDates[dateIndex].movies[movieIndex].showtimes[showtimeIndex].seats[seatIndex][name] = type === 'checkbox' ? checked : value;
        setDates(updatedDates);
    };

    const addDate = () => {
        setDates([...dates, { date: '', movies: [{ movieID: '', showtimes: [{ time: '', price: '', seats: [{ seatNumber: '', isReserved: false }] }] }] }]);
    };

    const removeDate = (index) => {
        const updatedDates = [...dates];
        updatedDates.splice(index, 1);
        setDates(updatedDates);
    };

    const addMovie = (dateIndex) => {
        const updatedDates = [...dates];
        updatedDates[dateIndex].movies.push({ movieID: '', showtimes: [{ time: '', price: '', seats: [{ seatNumber: '', isReserved: false }] }] });
        setDates(updatedDates);
    };

    const removeMovie = (dateIndex, movieIndex) => {
        const updatedDates = [...dates];
        updatedDates[dateIndex].movies.splice(movieIndex, 1);
        setDates(updatedDates);
    };

    const addShowtime = (dateIndex, movieIndex) => {
        const updatedDates = [...dates];
        updatedDates[dateIndex].movies[movieIndex].showtimes.push({ time: '', price: '', seats: [{ seatNumber: '', isReserved: false }] });
        setDates(updatedDates);
    };

    const removeShowtime = (dateIndex, movieIndex, showtimeIndex) => {
        const updatedDates = [...dates];
        updatedDates[dateIndex].movies[movieIndex].showtimes.splice(showtimeIndex, 1);
        setDates(updatedDates);
    };

    const addSeat = (dateIndex, movieIndex, showtimeIndex) => {
        const updatedDates = [...dates];
        updatedDates[dateIndex].movies[movieIndex].showtimes[showtimeIndex].seats.push({ seatNumber: '', isReserved: false });
        setDates(updatedDates);
    };

    const removeSeat = (dateIndex, movieIndex, showtimeIndex, seatIndex) => {
        const updatedDates = [...dates];
        updatedDates[dateIndex].movies[movieIndex].showtimes[showtimeIndex].seats.splice(seatIndex, 1);
        setDates(updatedDates);
    };

    return (
        <div
            className={`fixed right-0 top-0 bottom-0 w-96 p-12 pt-14 bg-black z-[60] border-l-2 border-l-neon overflow-scroll scrollbar-hidden transition-transform duration-300 ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
                }`}
        >
            <FaTimes
                className='absolute top-5 left-5 size-6 text-neon cursor-pointer'
                onClick={onClose}
            />
            <form className='flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                    <label className='text-neon font-semibold'>Theatre Name</label>
                    <input
                        type='text'
                        placeholder='Enter the theatre name...'
                        className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-neon font-semibold'>City</label>
                    <input
                        type='text'
                        placeholder='Enter the city...'
                        className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-neon font-semibold'>Dates</label>
                    {dates.map((dateItem, dateIndex) => (
                        <div key={dateIndex} className='flex flex-col gap-2 mb-4 border-b pb-2'>
                            <input
                                type='date'
                                name='date'
                                value={dateItem.date}
                                onChange={(e) => handleDateChange(dateIndex, e)}
                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                            />

                            <label className='text-neon font-semibold'>Movies</label>
                            {dateItem.movies.map((movie, movieIndex) => (
                                <div key={movieIndex} className='flex flex-col gap-2 mb-4 border-b pb-2'>
                                    <input
                                        type='text'
                                        name='movieID'
                                        placeholder='Movie ID'
                                        value={movie.movieID}
                                        onChange={(e) => handleMovieChange(dateIndex, movieIndex, e)}
                                        className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                                    />

                                    <label className='text-neon font-semibold'>Showtimes</label>
                                    {movie.showtimes.map((showtime, showtimeIndex) => (
                                        <div key={showtimeIndex} className='flex flex-col gap-2 mb-4 border-b pb-2'>
                                            <input
                                                type='time'
                                                name='time'
                                                placeholder='Showtime'
                                                value={showtime.time}
                                                onChange={(e) => handleShowtimeChange(dateIndex, movieIndex, showtimeIndex, e)}
                                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                                            />

                                            <input
                                                type='number'
                                                name='price'
                                                placeholder='Ticket Price'
                                                value={showtime.price}
                                                onChange={(e) => handleShowtimeChange(dateIndex, movieIndex, showtimeIndex, e)}
                                                className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                                            />

                                            <div className='flex flex-col gap-2'>
                                                <label className='text-neon'>Seats</label>
                                                {showtime.seats.map((seat, seatIndex) => (
                                                    <div key={seatIndex} className='flex gap-2 mb-2'>
                                                        <input
                                                            type='text'
                                                            name='seatNumber'
                                                            placeholder='Seat Number'
                                                            value={seat.seatNumber}
                                                            onChange={(e) => handleSeatChange(dateIndex, movieIndex, showtimeIndex, seatIndex, e)}
                                                            className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                                                        />
                                                        <label className='flex items-center text-neon'>
                                                            Reserved
                                                            <input
                                                                type='checkbox'
                                                                name='isReserved'
                                                                checked={seat.isReserved}
                                                                onChange={(e) => handleSeatChange(dateIndex, movieIndex, showtimeIndex, seatIndex, e)}
                                                                className='ml-2'
                                                            />
                                                        </label>
                                                        {showtime.seats.length > 1 && (
                                                            <button
                                                                type='button'
                                                                onClick={() => removeSeat(dateIndex, movieIndex, showtimeIndex, seatIndex)}
                                                                className='text-red-500 text-sm transition duration-150 ease-in-out cursor-pointer hover:scale-105'
                                                            >
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type='button'
                                                    onClick={() => addSeat(dateIndex, movieIndex, showtimeIndex)}
                                                    className='bg-neon text-black py-2 px-4 font-bold rounded-md transition duration-150 ease-in-out hover:scale-105'
                                                >
                                                    Add Seat
                                                </button>
                                            </div>

                                            {movie.showtimes.length > 1 && (
                                                <button
                                                    type='button'
                                                    onClick={() => removeShowtime(dateIndex, movieIndex, showtimeIndex)}
                                                    className='text-red-500 text-sm self-end transition duration-150 ease-in-out cursor-pointer hover:scale-105'
                                                >
                                                    Remove Showtime
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type='button'
                                        onClick={() => addShowtime(dateIndex, movieIndex)}
                                        className='bg-neon text-black py-2 px-4 font-bold rounded-md transition duration-150 ease-in-out hover:scale-105'
                                    >
                                        Add Showtime
                                    </button>
                                    {dateItem.movies.length > 1 && (
                                        <button
                                            type='button'
                                            onClick={() => removeMovie(dateIndex, movieIndex)}
                                            className='text-red-500 text-sm self-end transition duration-150 ease-in-out cursor-pointer hover:scale-105'
                                        >
                                            Remove Movie
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type='button'
                                onClick={() => addMovie(dateIndex)}
                                className='bg-neon text-black py-2 px-4 font-bold rounded-md transition duration-150 ease-in-out hover:scale-105'
                            >
                                Add Movie
                            </button>
                            {dates.length > 1 && (
                                <button
                                    type='button'
                                    onClick={() => removeDate(dateIndex)}
                                    className='text-red-500 text-sm self-end transition duration-150 ease-in-out cursor-pointer hover:scale-105'
                                >
                                    Remove Date
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type='button'
                        onClick={addDate}
                        className='bg-neon text-black py-2 px-4 font-bold rounded-md transition duration-150 ease-in-out hover:scale-105'
                    >
                        Add Date
                    </button>
                </div>

                {mode === 'add' ? (
                    <div className='flex items-center justify-around pt-10'>
                        <button type='submit' className='bg-neon text-black py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110'>ADD THEATRE</button>
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

export default TheatresSidebar;