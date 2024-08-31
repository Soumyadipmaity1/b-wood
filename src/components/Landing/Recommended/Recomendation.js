"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMovies } from "../../../actions/movie.js";

const Card = ({ title, poster, id }) => {
  return (
    <Link href={`/${id}`}>
      <div className="relative border-2 ml-6 w-60 cursor-pointer text-center border-neon rounded-xl shadow-lg flex flex-col justify-center p-2 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-80">
        <div className="relative h-80 w-full rounded-md mb-4 overflow-hidden">
          <Image
            src={poster}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
        <h2 className="font-bold mb-2">{title}</h2>
      </div>
    </Link>
  );
};

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getMovies();
        setMovies(movies.result);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div
      className="w-full h-full overflow-x-auto py-5 pr-2 rounded-xl"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex space-x-6" style={{ minWidth: "max-content" }}>
        {movies.map((movie, index) => (
          <Card
            key={index}
            title={movie.title}
            poster={movie.images[0]}
            id={movie._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
