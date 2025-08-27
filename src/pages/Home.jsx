import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (query, pageNum) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = query
        ? await searchMovies(query, pageNum)
        : await getPopularMovies(pageNum);
      
      if (data.results.length === 0) {
        setError("No movies found for this query.");
      }

      setMovies(data.results);
      setPage(pageNum);
      setTotalPages(data.total_pages);

      window.scrollTo(0, 0);

    } catch (err) {
      console.error(err);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(null, 1);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchQuery.trim(), 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      fetchMovies(searchQuery.trim() || null, page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchMovies(searchQuery.trim() || null, page - 1);
    }
  };


  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePrevPage} disabled={page <= 1 || loading}>
              &larr; Previous Page
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={page >= totalPages || loading}>
              Next Page &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;