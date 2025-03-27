import React from 'react';
import './movie.css';
import {useNavigate } from 'react-router-dom';
import Ratings from '../Ratings/Ratings';

export default function MovieCard({ data, imageUrl, width, height, cardStyle, radius }) {
  const rating = Math.round(data?.vote_average / 2);
  const navigate = useNavigate();

  const imageStyle = {
    backgroundImage: `url("https://image.tmdb.org/t/p/w500/${imageUrl}")`,
    width: width,
    height: height,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    borderRadius: radius,
    boxShadow: cardStyle === 'popular-card' ? '0px 0px 10px 0px rgba(118,118,118,0.75)' : null,
  };

  const handleClick = () => {
    navigate(`/moviedetails/${data.id}`);
  };

  return (
    <div className={cardStyle} onClick={handleClick}>
      <div style={imageStyle}>
        <div className="moviestar">
          <Ratings movieRating={rating} />
        </div>
        <div className="movierating">
          <p>{data?.title}</p>
          <p>Rating: {rating}</p>
        </div>
      </div>
      {cardStyle === 'top-rated-card' ? <p>{data?.title}</p> : null}
    </div>
  );
}
