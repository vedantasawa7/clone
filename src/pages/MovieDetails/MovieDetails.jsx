import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { ThemeContext } from '../../context/ThemeContext';
import Ratings from '../../components/Ratings/Ratings';
import './movie.css';


export default function MovieDetails({ baseUrl, apiKey, serverUrl }) {
    const { movieid } = useParams();
    const [videoLink, setVideoLink] = useState('');
    const [movie, setMovie] = useState([]);
    const [movieRating, setMovieRating] = useState(0);
    const { darkMode } = React.useContext(ThemeContext);
    const [added, setAdded] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}`)
            .then(res => {
                setMovie(res.data);
                setMovieRating(res.data.vote_average / 2);
            })
            .catch(err => console.log(err));

        axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}&language=en-US`)
            .then(res => {
                const youtubeLink = res.data.results.find(item => item.site === "YouTube" && item.type === "Trailer");
                setVideoLink(youtubeLink?.key);
            })
            .catch(err => console.log(err));
    }, [movieid]);

    const addToFavorites = () => {
        setFavorites(prev => [...prev, movie]);
        setAdded(true);
    };

    const removeFromFavorites = () => {
        setFavorites(prev => prev.filter(item => item.id !== movie.id));
        setAdded(false);
    };

    return (
        <div className={darkMode ? "movie-details-container" : "movie-details-container details-light"}>
            {
                videoLink ?
                    <div className="trailer-container">
                        <ReactPlayer
                            className="trailer-player"
                            url={`https://www.youtube.com/watch?v=${videoLink}`}
                            config={{ youtube: { playerVars: { showinfo: 1, origin: "http://localhost:3000" } } }}
                            width='100%'
                            height='100%'
                            controls={true}
                        />
                    </div>
                    :
                    <div className="trailer-container-blank"
                        style={{
                            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.poster_path}")`,
                            backgroundPosition: "center",
                            backgroundSize: "cover"
                        }}>
                        <h1>No Trailers Released Yet</h1>
                    </div>
            }

            <div className={darkMode ? "details-container" : "details-container details-light"}>
                <div className="title-container">
                    <h1>{movie.title}</h1>
                    {
                        added
                            ? <span className="remove-btn" onClick={removeFromFavorites}>Remove from favorites.</span>
                            : <span className="add-btn" onClick={addToFavorites}>Add to favorites.</span>
                    }
                </div>
                <Ratings movieRating={movieRating} />
                <div className="info-container">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="details-poster" alt={movie.title} />
                    <div className="movie-info">
                        <h2>{movie.tagline}</h2>
                        <h4>{movie.overview}</h4>
                        <h4>Status: <span>{movie.status}</span></h4>
                        <h4>Runtime: <span>{movie.runtime} min.</span></h4>
                        <h4>Budget: <span>{movie.budget}</span></h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
