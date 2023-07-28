import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import css from '../MovieDetails/MovieDetails.module.css'

const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;


  &:hover {
    color: red;
  }
`;

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const fetchMovieById = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=41b8f9437bf3f899281f8a3f9bdc0891`
      );
      if (response.data) {
        setMovie(response.data);
      } else {
        setMovie([]);
      }
    } catch (error) {
      console.log(` Error  ${error}`);
      setMovie([]);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieById();
  }, [fetchMovieById]);

  return (
    <>
      <div className={css.button}><StyledLink to={backLinkHref}>Go to back</StyledLink></div>
      <div>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.original_title}
            width="200"
            height="300"
          />
        )}
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
