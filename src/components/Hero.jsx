import { Play, Heart, Info, Star, Clock, Calendar, Sparkles } from "lucide-react";

function Hero({
  movie,
  featuredList = [],
  onSelectMovie,
  onExplore,
  onWatchTrailer,
  isSaved,
  onToggleSave,
  onOpenDetails
}) {
  if (!movie) return null;

  return (
    <section className="hero-section" id="spotlight">
      {/* Background Cinematic Canvas */}
      <div className="hero-backdrop-container">
        <img
          key={movie.backdrop || movie.poster}
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="hero-backdrop-image"
        />
        <div className="hero-backdrop-vignette" />
        <div className="hero-backdrop-gradient" />
      </div>

      <div className="hero-inner">
        <div className="hero-editorial">
          <div className="hero-badge-row">
            <span className="editorial-badge">
              <Sparkles size={12} className="badge-sparkle" />
              CURATOR'S SPOTLIGHT
            </span>
            <span className="editorial-divider">/</span>
            <span className="editorial-meta-tag">35MM MASTERWORK</span>
          </div>

          <h1 className="hero-title">{movie.title}</h1>

          {movie.tagline && (
            <p className="hero-tagline">
              &ldquo;{movie.tagline}&rdquo;
            </p>
          )}

          {/* Metadata Bar */}
          <div className="hero-meta-strip">
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
            {movie.director && (
              <span className="meta-director">Dir. {movie.director}</span>
            )}
          </div>

          {/* Mood Tags */}
          {movie.mood && movie.mood.length > 0 && (
            <div className="hero-mood-tags">
              {movie.mood.map((tag) => (
                <span key={tag} className="mood-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <p className="hero-synopsis">{movie.description}</p>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="btn-primary-cinematic"
              onClick={() => onWatchTrailer(movie)}
            >
              <Play size={16} fill="currentColor" />
              <span>Watch Trailer</span>
            </button>

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
              <span>{isSaved ? "In Watchlist" : "Add to Watchlist"}</span>
            </button>

            <button
              type="button"
              className="btn-tertiary-subtle"
              onClick={() => onOpenDetails(movie)}
              title="View full film dossier"
            >
              <Info size={16} />
              <span>Film Dossier</span>
            </button>
          </div>
        </div>

        {/* Right side Spotlight Showcase with Mini-Carousel */}
        <div className="hero-showcase">
          <div
            className="hero-poster-frame"
            onClick={() => onOpenDetails(movie)}
            title="Click to view full dossier"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="hero-main-poster"
            />
            <div className="poster-ambient-glow" />
            <div className="poster-hover-hint">
              <Info size={18} />
              <span>View Dossier</span>
            </div>
          </div>

          {/* Spotlight switcher thumbnails */}
          {featuredList.length > 1 && (
            <div className="spotlight-switcher">
              <span className="switcher-label">FEATURED ROTATION</span>
              <div className="switcher-cards">
                {featuredList.map((item, index) => {
                  const isActive = item.id === movie.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`switcher-thumb-btn ${isActive ? "active" : ""}`}
                      onClick={() => onSelectMovie(item)}
                      title={`Switch to ${item.title}`}
                    >
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="switcher-thumb-img"
                      />
                      <span className="switcher-thumb-idx">
                        0{index + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Aesthetic bottom scroll indicator */}
      <div className="hero-scroll-invite" onClick={onExplore}>
        <span className="scroll-text">EXPLORE THE ARCHIVE</span>
        <div className="scroll-line">
          <span className="scroll-dot" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
