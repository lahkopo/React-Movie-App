import { forwardRef } from 'react';
import "../css/MovieDetailsCard.css";

const MovieDetailsCard = forwardRef(({ movie, onClose, style, credits, creditsLoading, trailerKey, onPlayTrailer }, ref) => {
  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  const handlePlayTrailerClick = (e) => {
    e.stopPropagation();
    onPlayTrailer();
  };

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div
      className="movie-details-card"
      ref={ref}
      style={style}
      onClick={handleCardClick}
    >
      
      {trailerKey && (
          <button className="play-trailer-btn" onClick={handlePlayTrailerClick}>
            ► Play Trailer
          </button>
      )}

      <h3>{movie.title}</h3>
      <p><strong>Release:</strong> {movie.release_date || "N/A"}</p>
      <p><strong>Rating:</strong> {rating}/10</p>
      <p>{movie.overview || "No description available."}</p>

      <div className="details-credits">
        {creditsLoading ? (
          <p>Loading credits...</p>
        ) : (
          <>
            {credits.director && <p><strong>Director:</strong> {credits.director}</p>}
            {credits.cast?.length > 0 && (
              <div className="cast-list">
                <strong>Cast:</strong>
                <ul>
                  {credits.cast.map((actor) => (
                    <li key={actor.id}>{actor.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default MovieDetailsCard;