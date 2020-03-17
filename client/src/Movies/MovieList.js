import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieList = () => {
  // 0. Initialize state
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // 1. Get movies from the API/Server
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies")
        .then(response => {
          // 2. Save the movies to state
          console.log(response);
          setMovies(response.data);
        })
        .catch(error => {
          console.error("Server Error", error);
        });
    };

    getMovies();
  }, []);

  // 3. Render the movies
  return (
    <div className="movie-list">
      {movies.map(m => (
        <Link to={`/movies/${m.id}`}>
          <MovieDetails key={m.id} movie={m} />
        </Link>
      ))}
    </div>
  );
};

function MovieDetails({ movie }) {
  const { title, director, metascore, stars } = movie;
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
    </Link>
  );
}

export default MovieList;
