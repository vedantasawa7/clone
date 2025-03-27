import React, { useState, useEffect, useContext } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { ThemeContext } from '../../context/ThemeContext'; 
import './fav.css';
import axios from 'axios';

function MyFavorites({ serverUrl }) {
    const [movies, setMovies] = useState([]);
    const { darkMode } = useContext(ThemeContext); 
    useEffect(() => {
        axios.get(`${serverUrl}favoriteMovies`)
            .then(res => {
                console.log(res.data);
                setMovies(res.data.favorites);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={`favorites-container ${darkMode ? 'favorites-dark' : 'favorites-light'}`}>
            {movies.length > 0 ? (
                movies.map(item => (
                    <MovieCard 
                        radius={"16px"} 
                        cardStyle={"popular-card"} 
                        width={"200px"} 
                        height={"300px"} 
                        imageUrl={item.movie[0].poster_path} 
                        key={item.movie[0]._id} 
                        data={item.movie[0]} 
                    />
                ))
            ) : (
                <p className="no-favorites">No favorite movies found.</p>
            )}
        </div>
    );
}

export default MyFavorites;
