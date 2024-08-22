import React from 'react';
import offer from '../../../public/assets/offer.jpg'

const OfferCard = () => {
    return (
        <div className='px-10 rounded-md w-1/3'>
            <div className="bg-neon text-black text-center w-full h-full">
                <img src={offer} alt='Offer Card' className='w-full h-full' />
            </div>
        </div>
    );
};

export default OfferCard;