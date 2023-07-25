import MovieDetails from 'components/MovieDetails';
import { Home } from 'pages/Home';
import { Movies } from 'pages/Movies';
import { NotFound } from 'pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import { Cast } from './Cast';
import { Layout } from './Layout';
import { Reviews } from './Reviews';
import Search from './Search';

export const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />}/>
          <Route path="movies" element={<Movies/>}/>
            {/* <Route path="query=:search" element={<Search/>}/> */}
          {/* </Route> */}
          <Route path="movies/:movieId" element={<MovieDetails/>}>
            <Route path="cast" element={<Cast/>}/>
            <Route path="reviews" element={<Reviews/>}/>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};
