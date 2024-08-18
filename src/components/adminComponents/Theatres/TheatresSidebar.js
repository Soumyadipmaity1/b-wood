'use client';
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

// Mock function to fetch movies list (replace this with actual API call)
const fetchMoviesList = async () => {
    return [
        { id: '1', title: 'Movie 1' },
        { id: '2', title: 'Movie 2' },
        { id: '3', title: 'Movie 3' },
        // Add more movies as needed
    ];
};

const TheatresSidebar = ({ isOpen, onClose, mode }) => {
    const [theatre, setTheatre] = useState({ name: '', city: '', image: '', moviesId: '' });
    const [showtimes, setShowtimes] = useState([{ startAt: '', endAt: '', price: '', moviesId: '' }]);
    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await fetchMoviesList(); // Replace with actual API call
            setMoviesList(movies);
        };
        fetchMovies();
    }, []);

    const handleTheatreChange = (event) => {
        const { name, value } = event.target;
        setTheatre((prev) => ({ ...prev, [name]: value }));
    };

    const handleShowtimeChange = (index, event) => {
        const { name, value } = event.target;
        const updatedShowtimes = [...showtimes];
        updatedShowtimes[index][name] = value;
        setShowtimes(updatedShowtimes);
    };

    const addShowtime = () => {
        setShowtimes([...showtimes, { startAt: '', endAt: '', price: '', moviesId: '' }]);
    };

    const removeShowtime = (index) => {
        const updatedShowtimes = [...showtimes];
        updatedShowtimes.splice(index, 1);
        setShowtimes(updatedShowtimes);
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
                <div className='flex flex-col gap-2'>
                    <label className='text-neon font-semibold'>Name</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Enter the theatre name...'
                        value={theatre.name}
                        onChange={handleTheatreChange}
                        className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-neon font-semibold'>City</label>
                    <input
                        type='text'
                        name='city'
                        placeholder='Enter the city...'
                        value={theatre.city}
                        onChange={handleTheatreChange}
                        className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-neon font-semibold'>Image</label>
                    <input
                        type='file'
                        name='image'
                        value={theatre.image}
                        onChange={handleTheatreChange}
                        className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-neon font-semibold'>MoviesId</label>
                    <select
                        name='moviesId'
                        value={theatre.moviesId}
                        onChange={handleTheatreChange}
                        className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                    >
                        <option value=''>Select a Movie</option>
                        {moviesList.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title} (ID: {movie.id})
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type='button'
                    onClick={addShowtime}
                    className='bg-neon text-black py-2 px-4 font-bold rounded-md transition duration-150 ease-in-out hover:scale-105'
                >
                    Add Showtime
                </button>

                {showtimes.map((showtime, index) => (
                    <div key={index} className='flex flex-col gap-2 mb-4 border-b pb-2'>
                        <label className='text-neon font-semibold'>Start At</label>
                        <input
                            type='time'
                            name='startAt'
                            placeholder='Start time...'
                            value={showtime.startAt}
                            onChange={(e) => handleShowtimeChange(index, e)}
                            className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                        />

                        <label className='text-neon font-semibold'>End At</label>
                        <input
                            type='time'
                            name='endAt'
                            placeholder='End time...'
                            value={showtime.endAt}
                            onChange={(e) => handleShowtimeChange(index, e)}
                            className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                        />

                        <label className='text-neon font-semibold'>Price</label>
                        <input
                            type='number'
                            name='price'
                            placeholder='Price...'
                            value={showtime.price}
                            onChange={(e) => handleShowtimeChange(index, e)}
                            className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                        />

                        <label className='text-neon font-semibold'>MoviesId</label>
                        <select
                            name='moviesId'
                            value={showtime.moviesId}
                            onChange={(e) => handleShowtimeChange(index, e)}
                            className='p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon'
                        >
                            <option value=''>Select a Movie</option>
                            {moviesList.map((movie) => (
                                <option key={movie.id} value={movie.id}>
                                    {movie.title} (ID: {movie.id})
                                </option>
                            ))}
                        </select>

                        {showtimes.length > 1 && (
                            <button
                                type='button'
                                onClick={() => removeShowtime(index)}
                                className='text-red-500 text-sm self-end transition duration-150 ease-in-out cursor-pointer hover:scale-105'
                            >
                                Remove Showtime
                            </button>
                        )}
                    </div>
                ))}

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