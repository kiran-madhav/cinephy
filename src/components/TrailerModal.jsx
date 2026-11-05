import { useEffect } from "react";
import { X, Film } from "lucide-react";

function TrailerModal({ movie, onClose }) {
  useEffect(() => {
    if (!movie) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movie, onClose]);

  if (!movie || !movie.trailerId) return null;

  return (
    <div className="cine-modal-overlay" onClick={onClose}>
      <div
        className="cine-trailer-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="trailer-header">
          <div className="trailer-title-meta">
            <Film size={16} className="trailer-film-icon" />
            <span className="trailer-badge">OFFICIAL PREVIEW</span>
            <span className="trailer-film-name">{movie.title} ({movie.year})</span>
          </div>

          <button
            type="button"
            className="modal-close-icon-btn"
            onClick={onClose}
            aria-label="Close trailer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="trailer-video-aspect">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${movie.trailerId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${movie.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="trailer-iframe"
          />
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;

