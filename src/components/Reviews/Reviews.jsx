import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Reviews = () => {
  const [review, setReviews] = useState([]);
  const { movieId } = useParams();

  const fetchMovieReview = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=41b8f9437bf3f899281f8a3f9bdc0891`
      );

      if (response.data.results) {
        setReviews(response.data.results);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      setReviews([]);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieReview();
  }, [fetchMovieReview]);

  return (
    <div>
      {review.length !== 0
        ? review.map(rev => (
            <div key={rev.id}>
              <h4>{rev.author}</h4>
              <p>{rev.content}</p>
            </div>
          ))
        : 'We don`t have ahy reviews for this movie'}
    </div>
  );
};

export default Reviews

