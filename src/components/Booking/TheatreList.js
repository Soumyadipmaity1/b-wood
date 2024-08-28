import React from 'react';

const theatres = [
    { name: 'Theatre 1', showtimes: ['8 am', '10 pm'] },
    { name: 'Theatre 2', showtimes: ['8 am', '10 pm'] },
];

const TheatreList = ({ location }) => {
    return (
        <div className="bg-black p-6 w-2/3 text-neon border-[1px] border-white rounded-md">
            <h2 className="text-white text-lg flex items-center pb-4 font-bold tracking-wide">
                Theatres in your Area
            </h2>
            <hr className='w-full mb-8 border-0 h-[2px] bg-white' />
            <div className="h-40 overflow-y-auto">
                {theatres.map((theatre, index) => (
                    <div key={index} className="mb-4 border-2 p-4 rounded-md">
                        <div className="text-white mb-2">{theatre.name}</div>
                        <div className="flex justify-start">
                            {theatre.showtimes.map((time, idx) => (
                                <button key={idx} className="bg-gray-800 text-neon px-4 py-2 rounded-md hover:bg-black border-2 border-neon font-bold transition-all duration-200 ease-in-out mr-2">
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TheatreList;