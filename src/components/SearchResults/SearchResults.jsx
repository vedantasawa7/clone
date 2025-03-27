import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import noImage from '../../assets/no-image.png';

function SearchResults({ movie, setQuery }) {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);
    const searchRef = useRef(null);

    const handleNavigation = () => {
        setQuery('');
        navigate(`/moviedetails/${movie.id}`);
    };

    return (
        <div 
            className="search-results-container" 
            ref={searchRef} 
            tabIndex={0} 
            onBlur={() => setQuery('')}
        >
            <div className="search-results-item" onClick={handleNavigation}>
                <img 
                    className="result-img" 
                    src={imageError ? noImage : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                    onError={() => setImageError(true)} 
                    alt={movie.title}
                />
                <p>{movie.title}</p>
            </div>
        </div>
    );
}

export default SearchResults;
