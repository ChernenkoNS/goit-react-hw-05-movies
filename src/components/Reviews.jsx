import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Reviews = () => {
  const [review, setReview] = useState([]);
  const { movieId } = useParams();

  async function fetchMovieReview() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=41b8f9437bf3f899281f8a3f9bdc0891`
      );

      setReview(response.data.results);
    } catch (error) {
      console.log(` Error  ${error}`);
    }
  }

  useEffect(() => {
    fetchMovieReview();
  }, [movieId]);

  console.log(review);

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

