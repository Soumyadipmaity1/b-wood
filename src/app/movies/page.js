import React from "react";
import MovieSection from "../../components/MovieSection/movieSection";
import CrewTable from "../../components/MovieSection/crew";
import CastTable from "../../components/MovieSection/cast";
function Movies() {
  return (
    <div>
      <MovieSection />
      <div className="lg:flex justify-evenly">
        <CastTable />
        <CrewTable />
      </div>{" "}
    </div>
  );
}

export default Movies;
