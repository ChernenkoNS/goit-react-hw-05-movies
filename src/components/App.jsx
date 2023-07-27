// import MovieDetails from 'components/MovieDetails';
import { Layout } from './Layout';
// import Home from 'pages/Home';
// import Movies from 'pages/Movies';
import { NotFound } from 'pages/NotFound';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { Cast } from './Cast';
// import { Reviews } from './Reviews';

const Home = lazy(() => import('pages/Home'))
const Movies = lazy(() => import('pages/Movies'))
const MovieDetails = lazy(() => import('components/MovieDetails'))
const Cast = lazy(() => import('./Cast'))
const Reviews = lazy(() => import('./Reviews'))



export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
