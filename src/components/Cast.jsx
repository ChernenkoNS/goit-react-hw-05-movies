import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  async function fetchMovieCast() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=41b8f9437bf3f899281f8a3f9bdc0891`
      );

      setCast(response.data.cast);
    } catch (error) {
      console.log(` Error  ${error}`);
    }
  }

  useEffect(() => {
    fetchMovieCast();
  }, []);

  return (
    <div>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
              alt=""
              width="100"
            />
            <p>{actor.name}</p>
            <p>Character : {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
