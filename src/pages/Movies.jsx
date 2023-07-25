import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// const API_KEY = 'b67c8518c930f00572f5eefdd7a9d563'
// const API_KEY = '58fde9f9a3392c3dbee86a1f2142354e'
const API_KEY = '41b8f9437bf3f899281f8a3f9bdc0891';

export const Movies = () => {
  const [movName, setMovName] = useState([]);
  const [search, setSearch] = useState('');
  const location = useLocation()
  console.log(location);
  

  const updateQueryString = event => {
    const searchValue = event.target.value;
    if (searchValue === '') {
      return setSearch({});
    }
    setSearch(searchValue);
  };

  async function fetchMovieCast() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`
      );

      setMovName(response.data.results);
    } catch (error) {
      console.log(` Error  ${error}`);
    }
  }

  return (
    <div>
      <input type="text" value={search} onChange={updateQueryString} />
      <button onClick={fetchMovieCast}>search</button>
      <ul>
        {movName.length !== 0 &&
          movName.map(mov => (
            <li key={mov.id}>
              <Link to={`${mov.id}`} state={{ from : location }}>{mov.original_title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
