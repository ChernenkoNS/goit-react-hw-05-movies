import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/trending/all/day?api_key=41b8f9437bf3f899281f8a3f9bdc0891'
      );

      setMovies(response.data.results);
    } catch (error) {
      console.log(` Error  ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>
              {movie.title ?? movie.original_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
