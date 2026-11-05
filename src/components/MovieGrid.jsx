import MovieCard from "./MovieCard";
import { Film, Sparkles, Heart } from "lucide-react";

function MovieGrid({
  movies,
  onSelect,
  savedMovies,
  onToggleSave,
  onWatchTrailer,
  isWatchlistFilter,
  onResetFilters,
}) {
  if (movies.length === 0) {
    if (isWatchlistFilter) {
      return (
        <div className="cine-empty-state">
          <div className="empty-state-icon-wrap">
            <Heart size={36} className="empty-heart-icon" />
          </div>
          <h3 className="empty-title">Your Watchlist is a Blank Reel</h3>
          <p className="empty-desc">
            You haven&apos;t saved any cinematic works yet. Browse our curated archive and tap the heart icon on any film to save it for your next screening.
          </p>
          <button
            type="button"
            className="btn-primary-cinematic empty-action-btn"
            onClick={onResetFilters}
          >
            <Sparkles size={15} />
            <span>Discover Masterworks</span>
          </button>
        </div>
      );
    }

    return (
      <div className="cine-empty-state">
        <div className="empty-state-icon-wrap">
          <Film size={36} className="empty-film-icon" />
        </div>
        <h3 className="empty-title">No Cinematic Matches Found</h3>
        <p className="empty-desc">
          We couldn&apos;t find any films matching your criteria. Try a different query, or clear your filters to explore the entire catalog.
        </p>
        <button
          type="button"
          className="btn-primary-cinematic empty-action-btn"
          onClick={onResetFilters}
        >
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="cine-movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelect}
          isSaved={savedMovies.includes(movie.id)}
          onToggleSave={onToggleSave}
          onWatchTrailer={onWatchTrailer}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
