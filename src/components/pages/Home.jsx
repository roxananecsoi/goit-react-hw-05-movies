import React, { useEffect, useState } from 'react';
import MovieList from '../movieList/MovieList';
import { fetchTrendingMovies } from '../services/api';
import Loader from '../Loader';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await fetchTrendingMovies();

        setTimeout(() => {
          setTrendingMovies(movies);
          setLoading(false);
        }, 750);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Trending today:</h2>
      {loading ? <Loader /> : <MovieList films={trendingMovies} />}
      {}
    </div>
  );
};

export default Home;
