import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const location = useLocation()
  const backLinkHref = location.state?.from ?? "/"
  console.log(location.state );
  

  async function fetchMovieById() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=41b8f9437bf3f899281f8a3f9bdc0891`
      );
      setMovie(response.data);
    } catch (error) {
      console.log(` Error  ${error}`);
    }
  }

  useEffect(() => {
    fetchMovieById();
  }, []);

  return (
    <>
    <Link to={backLinkHref}>Go to back</Link>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}` }
          alt={movie.original_title}
          width="200"
          height="300"
        />
        <div>
          <h2>{movie.original_title}</h2>
          <p>User score: {Math.round(movie.vote_average * 10)} %</p>
          <h3>Overview</h3>
          <p> {movie.overview}</p>
          <h3>Genres</h3>
          {movie.genres?.map(genre => (
            <span key={genre.name}>{genre.name} </span>
          ))}
        </div>
      </div>
      <p>Additional information</p>
      <ul>
        <li>
          <Link to={'cast'}>Cast</Link>
        </li>
        <li>
          <Link to={'reviews'}>Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
export default MovieDetails;
