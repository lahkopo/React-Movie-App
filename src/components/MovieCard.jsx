import { useState, useRef, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext.jsx";
import MovieDetailsCard from "./MovieDetailsCard.jsx";
import TrailerModal from "./TrailerModal.jsx";
import { getMovieCredits, getMovieVideos } from "../services/api.js";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [credits, setCredits] = useState({ director: null, cast: [] });
  const [creditsLoading, setCreditsLoading] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const [detailsStyle, setDetailsStyle] = useState({ visibility: "hidden" });
  const cardRef = useRef(null);
  const detailsRef = useRef(null);

  const favorite = isFavorite(movie.id);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile && showDetails && cardRef.current && detailsRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const detailsRect = detailsRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const spaceOnRight = viewportWidth - cardRect.right;
      
      if (spaceOnRight < detailsRect.width + 16) {
        setDetailsStyle({ visibility: "visible", top: "0px", right: "105%", animationName: "fadeInLeft" });
      } else {
        setDetailsStyle({ visibility: "visible", top: "0px", left: "105%", animationName: "fadeInRight" });
      }
    } else {
      setDetailsStyle({ visibility: "hidden" });
    }
  }, [showDetails, isMobile]);

  async function handlePosterClick() {
    if (!showDetails) {
      setCreditsLoading(true);
      try {
        const [fetchedCredits, fetchedTrailerKey] = await Promise.all([
          getMovieCredits(movie.id),
          getMovieVideos(movie.id)
        ]);
        setCredits(fetchedCredits);
        setTrailerKey(fetchedTrailerKey);
      } catch (error) {
        console.error("Failed to fetch details:", error);
      } finally {
        setCreditsLoading(false);
      }
    }
    setShowDetails(prev => !prev);
  }

  function onFavoriteClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <>
      <div className="movie-card" ref={cardRef}>
        <div className="movie-poster" onClick={handlePosterClick}>
          <img src={posterUrl} alt={movie.title} />
          <div className="movie-overlay">
            <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
              ♥
            </button>
          </div>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>

        {showDetails && isMobile && (
          <MovieDetailsCard
            movie={movie}
            credits={credits}
            creditsLoading={creditsLoading}
            trailerKey={trailerKey}
            onPlayTrailer={() => setShowTrailer(true)}
            onClose={() => setShowDetails(false)}
          />
        )}

        {showDetails && !isMobile && (
          <MovieDetailsCard
            ref={detailsRef}
            style={detailsStyle}
            movie={movie}
            credits={credits}
            creditsLoading={creditsLoading}
            trailerKey={trailerKey}
            onPlayTrailer={() => setShowTrailer(true)}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>

      {showTrailer && trailerKey && (
        <TrailerModal videoKey={trailerKey} onClose={() => setShowTrailer(false)} />
      )}
    </>
  );
}

export default MovieCard;