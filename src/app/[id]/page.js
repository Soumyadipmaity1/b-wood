"use client"
import React from "react";
import MovieSection from "../../components/MovieSection/movieSection";
import CrewTable from "../../components/MovieSection/crew";
import CastTable from "../../components/MovieSection/cast";
import Recommendation from '../../components/Landing/Recommended/Recomendation';
function Movies({ params }) {
  const { id } = params;
  console.log(id);
  return (
    <div>
      <MovieSection id={id} />
      <CastTable />
      <div className="p-2 lg:px-10">
        <h1 className="text-3xl text-neon font-bold mb-6">Recommended</h1>
        <Recommendation />
      </div>
    </div>
  );
}

export default Movies;
