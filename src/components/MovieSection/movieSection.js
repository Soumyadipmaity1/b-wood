"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMoviebyId } from "../../actions/movie";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the styles

// Skeleton loader component for MovieDetails
const MovieDetailsSkeleton = () => (
  <div className="bg-black text-white mt-20 lg:mt-32">
    <div className="lg:px-32 sm:px-10 sm:mx-auto p-5">
      <div className="flex-col flex text-center sm:text-start justify-center sm:justify-start sm:flex-row sm:flex sm:items-start sm:gap-8 mb-14">
        <SkeletonTheme color="#2c2c2c" highlightColor="#444">
          <div className="relative h-[400px] w-[300px] rounded-lg mb-4 overflow-hidden mx-auto sm:mx-0">
            {/* Skeleton for the image */}
            <Skeleton height="100%" width="100%" />
          </div>
          <div className="flex-grow mx-auto sm:mx-0">
            {/* Skeleton for the title */}
            <Skeleton width="60%" height={40} className="mb-5 mt-10" />
            {/* Skeleton for rating section */}
            <Skeleton width="40%" height={30} className="mb-5" />
            {/* Skeleton for languages and formats */}
            <Skeleton width="80%" height={20} className="mb-3" />
            {/* Skeleton for duration, genre, release date */}
            <Skeleton width="60%" height={20} className="mt-4 mb-8" />
            {/* Skeleton for the button */}
            <Skeleton width="200px" height={50} />
          </div>
        </SkeletonTheme>
      </div>

      <div className="bg-[#00ff00]/[0.2] p-5 rounded-lg mt-8">
        {/* Skeleton for About the Movie */}
        <Skeleton width="40%" height={30} className="mb-4" />
        {/* Skeleton for movie description */}
        <Skeleton count={4} />
      </div>
    </div>
  </div>
);

export default function MovieDetails({ id }) {
  const [movie, setMovie] = useState({
    title: "",
    images: [],
    languages: "",
    release_date: "",
    description: "",
    duration: "",
    genre: "", // Add genre to the initial state
  });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const fetchedMovie = await getMoviebyId(id);
        // Ensure that fetchedMovie's date fields are converted to strings if necessary
        if (fetchedMovie.release_date instanceof Date) {
          fetchedMovie.release_date = fetchedMovie.release_date
            .toISOString()
            .split("T")[0]; // Format as YYYY-MM-DD
        }
        setMovie(fetchedMovie);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  return (
    <div className="bg-black text-white mt-20 lg:mt-32">
      <div className="lg:px-32 sm:px-10 sm:mx-auto p-5">
        <div className="flex-col flex text-center sm:text-start justify-center sm:justify-start sm:flex-row sm:flex sm:items-start sm:gap-8 mb-14">
          {movie.images[0] && (
            <Image
              src={movie.images[0]} // Update to use movie.images[0] if it’s the poster
              alt={`${movie.title}`}
              width={300}
              height={400}
              className="object-cover mx-auto sm:mx-0 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.3)]"
            />
          )}
          <div className="flex-grow mx-auto sm:mx-0">
            <h1 className="text-[2.5rem] mb-5 mt-10 font-bold text-[#00ff00]">
              {movie.title}
            </h1>
            <div className="flex justify-center items-center bg-gray-600 rounded-lg px-3 py-1 gap-2 mb-5 w-72">
              <span className="text-yellow-400 text-2xl">★</span>
              <span>8/10 (20k Votes)</span>
              <button className="bg-[#00ff00] hover:bg-yellow-400 text-black px-2 text-sm py-0.5 rounded-lg">
                Rate now
              </button>
            </div>
            <p className="mb-3">
              <span className="px-2 py-0.6 bg-lime-200 text-black rounded-sm mr-1">
                Hindi
              </span>
              <span className="mr-1 px-2 py-0.6 bg-lime-200 text-black rounded-sm">
                3D
              </span>
              <span className=" px-2 py-0.6 bg-lime-200 text-black rounded-sm">
                2D
              </span>
            </p>
            <p className="mt-4">
              {movie.duration} • {movie.genre} • {movie.release_date}
            </p>
            <Link href={`/${id}/booking`}>
              <button className="bg-[#00ff00] text-black sm:px-6 px-16 sm:py-2 py-3 mt-8 sm:text-lg text-xl font-semibold rounded transition-transform transform hover:bg-[#00cc00] hover:scale-105">
                Book tickets
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-[#00ff00]/[0.2] p-5 rounded-lg mt-8">
          <h2 className="text-[#00ff00] font-semibold text-2xl mb-4">
            About the movie
          </h2>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
