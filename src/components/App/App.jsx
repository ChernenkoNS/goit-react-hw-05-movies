import { Layout } from '../Layout/Layout';
import { NotFound } from 'pages/NotFound';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'))
const Movies = lazy(() => import('pages/Movies'))
const MovieDetails = lazy(() => import('components/MovieDetails/MovieDetails'))
const Cast = lazy(() => import('../Cast/Cast'))
const Reviews = lazy(() => import('../Reviews/Reviews'))



export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes >
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
