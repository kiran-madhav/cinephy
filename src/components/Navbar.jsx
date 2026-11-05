import { Sparkles, Film, Heart } from "lucide-react";

function Navbar({ watchlistCount, onOpenWatchlist, isWatchlistActive, onSurpriseMe }) {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <a href="#spotlight" className="brand-logo">
          <div className="brand-icon">
            <Film size={18} strokeWidth={2.2} />
          </div>
          <div className="brand-text">
            <span className="brand-title">CINEPHY</span>
            <span className="brand-subtitle">CURATED ARCHIVE</span>
          </div>
        </a>

        <div className="nav-links">
          <a href="#spotlight" className="nav-link">
            <span>Spotlight</span>
          </a>
          <a href="#archive" className="nav-link">
            <span>The Archive</span>
          </a>
          <button
            type="button"
            className="nav-link nav-btn-surprise"
            onClick={onSurpriseMe}
            title="Curator's Random Surprise Pick"
          >
            <Sparkles size={14} className="sparkle-icon" />
            <span>Surprise Me</span>
          </button>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className={`watchlist-pill-btn ${isWatchlistActive ? "active" : ""}`}
            onClick={onOpenWatchlist}
            aria-label="View Watchlist"
          >
            <Heart
              size={15}
              className={watchlistCount > 0 ? "heart-filled" : ""}
              fill={watchlistCount > 0 ? "currentColor" : "none"}
            />
            <span className="watchlist-label">Watchlist</span>
            <span className="watchlist-badge">{watchlistCount}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
