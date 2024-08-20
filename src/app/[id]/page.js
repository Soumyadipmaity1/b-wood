"use client"
import React from "react";
import MovieSection from "../../components/MovieSection/movieSection";
import CrewTable from "../../components/MovieSection/crew";
import CastTable from "../../components/MovieSection/cast";
function Movies({params}) {
  const { id } = params;
  console.log(id);
  return (
    <div>
      <MovieSection id={id} />
      <div className="lg:flex justify-evenly">
        <CastTable />
        <CrewTable />
      </div>{" "}
    </div>
  );
}

export default Movies;
