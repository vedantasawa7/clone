import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import SearchResults from '../SearchResults/SearchResults';
import axios from 'axios';

function Header({ baseUrl, apiKey }) {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      axios
        .get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        .then((res) => {
          setSearchResults(res.data.results);
        })
        .catch((err) => console.log(err));
    }
  }, [query]);

  const handleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };



  return (
    <div className={darkMode ? 'header-container' : 'header-container header-light'}>
      <Link className="logo" to="/">NetfliX</Link>

      <div className="search-container">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`search-input ${query && 'input-active'} ${!query && !darkMode && query}`}
          placeholder="Search movies"
        />
        {query.trim() !== '' && (
          <div className="search-results-container">
            {searchResults.map((movie) => (
              <SearchResults setQuery={setQuery} key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      <button className="fav-button" onClick={() => navigate('/favorites')}>
          My Favorites
        </button>

      <div className="header-buttons-container">
      <div className="theme-buttons">
        {darkMode ? (
          <MdOutlineLightMode onClick={handleTheme} className="theme-icon" />
        ) : (
          <MdOutlineDarkMode onClick={handleTheme} className="theme-icon" />
        )}
      </div>

       
        
      </div>
    </div>
  );
}

export default Header;