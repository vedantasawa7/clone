import React, { useState, useEffect, useContext } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './fav.css';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { ThemeContext } from '../../context/ThemeContext';

function MyFavorites({ serverUrl }) {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext); // Get dark mode state

  useEffect(() => {
    if (user) {
      axios
        .get(`${serverUrl}favoriteMovies/user/${user._id}`)
        .then((res) => {
          setMovies(res.data.favorites);
          localStorage.setItem('favoriteMovies', JSON.stringify(res.data.favorites));
        })
        .catch((err) => console.log(err));
    } else {
      const storedFavorites = localStorage.getItem('favoriteMovies');
      if (storedFavorites) {
        setMovies(JSON.parse(storedFavorites));
      }
    }
  }, [user, serverUrl]);

  const removeFromFavorites = async (movieId) => {
    try {
      await axios.delete(`${serverUrl}favoriteMovies/${movieId}`);
      const updatedMovies = movies.filter((item) => item.movie[0]._id !== movieId);
      setMovies(updatedMovies);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedMovies));
    } catch (error) {
      console.error('Error removing movie:', error);
    }
  };

  return (
    <div className={`favorites-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      {movies.length > 0 ? (
        movies.map((item) => (
          <MovieCard
            key={item.movie[0]._id}
            radius="16px"
            cardStyle="popular-card"
            width="200px"
            height="300px"
            imageUrl={item.movie[0].poster_path}
            data={item.movie[0]}
            onRemove={() => removeFromFavorites(item.movie[0]._id)}
          />
        ))
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
}

export default MyFavorites;
