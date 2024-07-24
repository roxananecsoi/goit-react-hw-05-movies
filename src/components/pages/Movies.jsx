import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { handleSearch } from '../services/api';
import { SearchForm } from '../searchForm/SearchForm';
import MovieList from '../movieList/MovieList';
import Loader from '../Loader';

const Movies = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') || '';
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const updateQueryString = query => {
    setSearchParams({ query });
  };

  const performSearch = async query => {
    try {
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 750));

      const movies = await handleSearch(query);
      setSearchResults(movies);

      if (movies.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const performSearchEffect = async () => {
      if (movieName !== '') {
        performSearch(movieName);
      } else {
        setSearchResults([]);
        setNoResults(false);
      }
    };

    performSearchEffect();
  }, [movieName]);

  const handleSearchSubmit = async query => {
    performSearch(query);
  };

  return (
    <div>
      <SearchForm
        value={movieName}
        onChange={updateQueryString}
        onSubmit={handleSearchSubmit}
      />
      {loading ? (
        <Loader />
      ) : noResults ? (
        <h3>No movie with this name. Try something else.</h3>
      ) : (
        <MovieList films={searchResults} />
      )}
      {}
    </div>
  );
};

export default Movies;
