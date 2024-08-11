'use client'
import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa';

const ReservationsSidebar = () => {

    const languageOptions = [
        { label: 'Choose the Language', value: 'NULL' },
        { label: 'Hindi', value: 'Hindi' },
        { label: 'English', value: 'English' }
    ];

    const genreOptions = [
        { label: 'Choose the Genre', value: 'null' },
        { label: 'Thriller', value: 'thriller' },
        { label: 'Romantic', value: 'romantic' },
        { label: 'Horror', value: 'horror' }
    ];

    const [language, setLanguage] = useState('NULL');
    const [genre, setGenre] = useState('null');

    const handleLanguages = (e) => {
        setLanguage(e.target.value);
    };

    const handleGenre = (e) => {
        setGenre(e.target.value);
    }


    return (
        <>
        <div className="absolute inset-0 flex items-center justify-center bg-black opacity-60 z-[55]"></div>
        <div className='fixed right-0 top-0 bottom-0 p-12 pt-14 bg-black z-[60] border-l-2 border-l-neon overflow-scroll scrollbar-hidden'>
            <FaTimes className='absolute top-5 left-5 size-6 text-neon border-0' />
            <form className='flex flex-col gap-5'>

                <div className='flex flex-col gap-2'>
                    <label for='input' className='text-neon font-semibold'>Title</label>
                    <input
                        type='text'
                        placeholder='Enter the title...'
                        className='p-1 pl-3 w-64 rounded-sm text-black focus:ring-2 focus:ring-neon'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label for='input' className='text-neon font-semibold'>Poster</label>
                    <input
                        type='file'
                        placeholder='Enter the title...'
                        className='p-1 pl-3 w-64 rounded-sm'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-neon font-semibold'>Language</label>
                    <select
                        value={language}
                        onChange={handleLanguages}
                        className='text-black p-1 pl-3 rounded-sm focus:ring-2 focus:ring-neon'
                    >
                        {languageOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label for='input' className='text-neon font-semibold'>Title</label>
                    <select
                        value={genre}
                        onChange={handleGenre}
                        className='text-black p-1 pl-3 rounded-sm focus:ring-2 focus:ring-neon'
                    >
                        {genreOptions.map((genreOption) => (
                            <option value={genreOption.value}>{genreOption.label}</option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label for='input' className='text-neon'>Release Date</label>
                    <input
                        type='date'
                        placeholder='Enter the title...'
                        className='p-1 pl-3 w-64 rounded-sm text-black' 
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label for='input' className='text-neon'>Description</label>
                    <textarea
                        type='text'
                        rows={4}
                        cols={4}
                        placeholder='Enter the description...'
                        className='p-1 pl-3 w-64 rounded-sm text-black focus:ring-2 focus:ring-neon' 
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label for='input' className='text-neon'>Duration</label>
                </div>
                
                <div className='flex items-center justify-around gap-3 pt-10'>
                    <button type='submit' className='bg-neon text-black py-2 px-5 font-bold rounded-sm transition duration-150 ease-in-out hover:scale-110'>UPDATE</button>
                    <button type='submit' className='bg-black border-2 border-neon text-neon py-2 px-5 font-bold rounded-sm transition duration-150 ease-in-out hover:scale-110'>DELETE</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default ReservationsSidebar