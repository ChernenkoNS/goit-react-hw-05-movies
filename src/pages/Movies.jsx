import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

// const API_KEY = 'b67c8518c930f00572f5eefdd7a9d563'
// const API_KEY = '58fde9f9a3392c3dbee86a1f2142354e'
const API_KEY = '41b8f9437bf3f899281f8a3f9bdc0891';

const Movies = () => {
  const [movName, setMovName] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchMovie = searchParams.get('query');
  console.log(searchMovie);

  const location = useLocation();
  console.log(location);

  const handleSubmit = event => {
    event.preventDefault();
    const searchValue = event.target.children.search.value;
    console.log(searchValue);
    setSearchParams({
      query: searchValue,
    });
  };

  useEffect(() => {
    if (!searchMovie) return;

    async function fetchMovieCast() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&api_key=${API_KEY}`
        );

        setMovName(response.data.results);
      } catch (error) {
        console.log(` Error  ${error}`);
      }
    }
    fetchMovieCast();
  }, [searchMovie]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" required minLength={2} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movName.length !== 0 &&
          movName.map(mov => (
            <li key={mov.id}>
              <Link to={`${mov.id}`} state={{ from: location }}>
                {mov.original_title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Movies
