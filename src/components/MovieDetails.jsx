import { useEffect } from "react";
import { X, Play, Heart, Star, Calendar, Clock, Sparkles } from "lucide-react";

function MovieDetails({
  movie,
  onClose,
  isSaved,
  onToggleSave,
  onWatchTrailer,
}) {
  useEffect(() => {
    if (!movie) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movie, onClose]);

  if (!movie) return null;

  return (
    <div className="cine-modal-overlay" onClick={onClose}>
      <div className="cine-dossier-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-icon-btn dossier-close-btn"
          onClick={onClose}
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        {/* Ambient Backdrop Banner */}
        <div className="dossier-backdrop">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="dossier-backdrop-img"
          />
          <div className="dossier-backdrop-scrim" />
        </div>

        {/* Body */}
        <div className="dossier-body">
          {/* Floating Poster */}
          <div className="dossier-poster-wrap">
            <img src={movie.poster} alt={movie.title} className="dossier-poster" />
            <div className="dossier-poster-glow" />
          </div>

          {/* Info */}
          <div className="dossier-info">
            <div className="dossier-header-bar">
              <span className="editorial-badge">
                <Sparkles size={11} className="badge-sparkle" />
                ARCHIVE DOSSIER
              </span>
              <span className="dossier-id">CATALOG № {String(movie.id).padStart(3, "0")}</span>
            </div>

            <h2 className="dossier-title">{movie.title}</h2>

            {movie.tagline && (
              <p className="dossier-tagline">&ldquo;{movie.tagline}&rdquo;</p>
            )}

            {/* Meta Strip */}
            <div className="dossier-meta-strip">
              <div className="meta-pill rating-pill">
                <Star size={13} fill="currentColor" />
                <span>{movie.rating}</span>
              </div>
              <div className="meta-pill">
                <Calendar size={13} />
                <span>{movie.year}</span>
              </div>
              <div className="meta-pill">
                <Clock size={13} />
                <span>{movie.duration}</span>
              </div>
              <span className="meta-genre-badge">{movie.genre}</span>
            </div>

            {/* Mood Tags */}
            {movie.mood && (
              <div className="dossier-mood-row">
                {movie.mood.map((m) => (
                  <span key={m} className="mood-tag">
                    #{m}
                  </span>
                ))}
              </div>
            )}

            {/* Synopsis */}
            <div className="dossier-section">
              <h4 className="dossier-section-title">Synopsis</h4>
              <p className="dossier-description">{movie.description}</p>
            </div>

            {/* Personnel */}
            <div className="dossier-credits-grid">
              {movie.director && (
                <div className="credit-item">
                  <span className="credit-label">Director</span>
                  <span className="credit-value">{movie.director}</span>
                </div>
              )}
              {movie.cast && movie.cast.length > 0 && (
                <div className="credit-item">
                  <span className="credit-label">Principal Cast</span>
                  <span className="credit-value">{movie.cast.join(", ")}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="dossier-actions">
              {movie.trailerId && (
                <button
                  type="button"
                  className="btn-primary-cinematic"
                  onClick={() => {
                    onClose();
                    onWatchTrailer(movie);
                  }}
                >
                  <Play size={16} fill="currentColor" />
                  <span>Play Official Trailer</span>
                </button>
              )}
              <button
                type="button"
                className={`btn-secondary-glass ${isSaved ? "saved" : ""}`}
                onClick={() => onToggleSave(movie.id)}
              >
                <Heart
                  size={16}
                  fill={isSaved ? "currentColor" : "none"}
                  className={isSaved ? "heart-active" : ""}
                />
                <span>{isSaved ? "Saved to Watchlist" : "Add to Watchlist"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
