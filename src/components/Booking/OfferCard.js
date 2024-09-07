'use client'
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const OfferCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {!isModalOpen ? null : (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 lg:hidden">
                    <div className="bg-white p-5 rounded-md w-11/12 relative">
                        <button onClick={closeModal} className="absolute -top-5 -right-3 bg-red-500 p-2 rounded-full">
                            <FaTimes className="size-6" />
                        </button>
                        <div className="text-center">
                            <img src='/offer.jpg' alt='Offer Card' className='w-full h-auto rounded-md' />
                        </div>
                    </div>
                </div>
            )}

            <div className='hidden lg:block px-10 rounded-md w-1/3'>
                <div className="text-black text-center w-full h-full flex items-center justify-center">
                    <img src='/offer.jpg' alt='Offer Card' className='w-full h-full' />
                </div>
            </div>
        </>
    );
};

export default OfferCard;