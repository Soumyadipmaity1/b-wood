
"use client";
import Image from 'next/image';
import Link from 'next/link';

export default function MovieDetails() {
  const movie = {
    title: 'Deadpool and Wolverine',
    poster: '/image.png',
    rating: 6.4,
    votes: '2.5K',
    duration: '2h 25m',
    genres: 'Drama, Romantic',
    certification: 'UA',
    releaseDate: '2 Aug, 2024',
    description: 'In "Deadpool & Wolverine," the irreverent mercenary Deadpool joins forces with the brooding, clawed mutant Wolverine. They embark on a wild, action-packed adventure, blending intense battles, witty banter, and unexpected camaraderie as they face formidable foes together.'
  };

  return (
    <div className="bg-black text-white mt-20  ">
      <div className="lg:px-32 sm:px-10 sm:mx-auto p-5">
        <div className="flex-col flex text-center sm:text-start justify-center sm:justify-start sm:flex-row sm:flex sm:items-start sm:gap-8 mb-8">
          {movie.poster && (

            <Image
              src={movie.poster}
              alt={`${movie.title} `}
              width={300}
              height={400}
              className="object-cover mx-auto sm:mx-0 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.3)]"
            />
          )}
          <div className="flex-grow mx-auto sm:mx-0">
            <h1 className="text-[2.5rem] mb-5 mt-10 font-bold text-[#00ff00]">{movie.title}</h1>
            <div className="flex sm:justify-start mx-auto sm:mx-0 sm:mx-start justify-center items-center bg-gray-600 w-72 rounded-lg px-3 py-2.5 gap-2 mb-5">
              <span className="text-yellow-400 text-2xl">★</span>
              <span>{movie.rating}/10 ({movie.votes} Votes)</span>
              <button className="bg-[#00ff00] hover:bg-yellow-400 text-black px-2 text-sm py-0.5 rounded-lg">Rate now</button>
            </div>
            <p className='mb-3' ><span className='px-2 py-0.6 bg-lime-200 text-black rounded-sm mr-1 '>Hindi</span> <span className='mr-1 px-2 py-0.6 bg-lime-200 text-black rounded-sm'>3D</span> <span className=' px-2 py-0.6 bg-lime-200 text-black rounded-sm'>2D</span></p>
            <p className='mt-4'>{movie.duration} • {movie.genres} • {movie.certification} • {movie.releaseDate}</p>
            <Link href="/movies/booking" >
              <button className="bg-[#00ff00] text-black sm:px-6 px-16 sm:py-2 py-3 mt-8 sm:text-lg text-xl font-semibold rounded transition-transform transform hover:bg-[#00cc00] hover:scale-105">
                Book tickets
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-[#00ff00]/[0.2] p-5 rounded-lg mt-8">
          <h2 className="text-[#00ff00] font-semibold text-2xl mb-4">About the movie</h2>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
