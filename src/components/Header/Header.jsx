import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import axios from "axios";
import SearchResults from "../SearchResults/SearchResults";
import "./header.css";

function Header({ baseUrl, apiKey }) {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      axios
        .get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        .then((res) => setSearchResults(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [query]);

  const handleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <div className={`header-container ${darkMode ? "" : "header-light"}`}>
      <Link className="logo" to="/">NetfliX</Link>

      <div className="search-container">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`search-input ${query && "input-active"}`}
          placeholder="Search movies"
        />
        {query.trim() && (
          <div className="search-results-container">
            {searchResults.map((movie) => (
              <SearchResults setQuery={setQuery} key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {/* <button className="fav-button" onClick={() => navigate("/favorites")}>
        My Favorites
      </button> */}

      <div className="theme-buttons">
        {darkMode ? (
          <MdOutlineLightMode onClick={handleTheme} className="theme-icon" />
        ) : (
          <MdOutlineDarkMode onClick={handleTheme} className="theme-icon" />
        )}
      </div>
    </div>
  );
}

export default Header;
