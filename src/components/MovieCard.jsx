import { Play, Heart, Star, Clock } from "lucide-react";

function MovieCard({
  movie,
  onSelect,
  isSaved,
  onToggleSave,
  onWatchTrailer,
}) {
  return (
    <article className="cine-card">
      <div className="cine-card-poster-wrap">
        <img
          src={movie.poster}
          alt={movie.title}
          className="cine-card-poster"
          loading="lazy"
          onClick={() => onSelect(movie)}
        />

        <div className="cine-poster-overlay" />

        {/* Top bar */}
        <div className="cine-card-top-bar">
          <div className="cine-rating-pill">
            <Star size={11} fill="currentColor" />
            <span>{movie.rating}</span>
          </div>
          <button
            type="button"
            className={`cine-save-btn ${isSaved ? "saved" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(movie.id);
            }}
            aria-label={isSaved ? "Remove from watchlist" : "Add to watchlist"}
            title={isSaved ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Heart
              size={15}
              fill={isSaved ? "currentColor" : "none"}
              className={isSaved ? "heart-active" : ""}
            />
          </button>
        </div>

        {/* Hover quick-actions */}
        <div className="cine-card-hover-actions">
          {movie.trailerId && (
            <button
              type="button"
              className="quick-trailer-btn"
              onClick={(e) => {
                e.stopPropagation();
                onWatchTrailer(movie);
              }}
              title="Watch Trailer"
            >
              <Play size={14} fill="currentColor" />
              <span>Trailer</span>
            </button>
          )}
          <button
            type="button"
            className="quick-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(movie);
            }}
            title="View Details"
          >
            <span>Details</span>
          </button>
        </div>

        <div className="cine-card-genre-pill">{movie.genre}</div>
      </div>

      <div className="cine-card-details" onClick={() => onSelect(movie)}>
        <div className="cine-card-meta-row">
          <span className="cine-meta-year">{movie.year}</span>
          <span className="cine-meta-dot">•</span>
          <span className="cine-meta-duration">
            <Clock size={11} />
            {movie.duration}
          </span>
        </div>
        <h3 className="cine-card-title">{movie.title}</h3>
        {movie.director && (
          <p className="cine-card-director">
            Dir. <span>{movie.director}</span>
          </p>
        )}
      </div>
    </article>
  );
}

export default MovieCard;
