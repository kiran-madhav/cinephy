import { Search, X, SlidersHorizontal, Star, Heart, Sparkles } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  genre,
  setGenre,
  genres,
  collectionFilter,
  setCollectionFilter,
  sortBy,
  setSortBy,
  totalResults,
  watchlistCount,
}) {
  return (
    <div className="discovery-controls">
      {/* Search & Sort Row */}
      <div className="search-sort-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="aesthetic-search-input"
            placeholder="Search films by title, director, cast, theme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="sort-wrapper">
          <SlidersHorizontal size={14} className="sort-icon" />
          <span className="sort-label">Sort:</span>
          <select
            className="aesthetic-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="curated">Curated Default</option>
            <option value="rating">Highest Rated</option>
            <option value="year-desc">Newest Release</option>
            <option value="year-asc">Classic First</option>
            <option value="runtime">Longest Runtime</option>
          </select>
        </div>
      </div>

      {/* Curated Collection Tabs */}
      <div className="curation-tabs">
        <button
          type="button"
          className={`curation-tab ${collectionFilter === "all" ? "active" : ""}`}
          onClick={() => setCollectionFilter("all")}
        >
          <Sparkles size={13} />
          <span>All Films</span>
        </button>

        <button
          type="button"
          className={`curation-tab ${collectionFilter === "masterpieces" ? "active" : ""}`}
          onClick={() => setCollectionFilter("masterpieces")}
        >
          <Star size={13} fill={collectionFilter === "masterpieces" ? "currentColor" : "none"} />
          <span>8.5+ Masterpieces</span>
        </button>

        <button
          type="button"
          className={`curation-tab ${collectionFilter === "mind-bending" ? "active" : ""}`}
          onClick={() => setCollectionFilter("mind-bending")}
        >
          <span>Mind-Bending</span>
        </button>

        <button
          type="button"
          className={`curation-tab ${collectionFilter === "watchlist" ? "active" : ""}`}
          onClick={() => setCollectionFilter("watchlist")}
        >
          <Heart
            size={13}
            fill={collectionFilter === "watchlist" || watchlistCount > 0 ? "currentColor" : "none"}
            className={watchlistCount > 0 ? "tab-heart-glow" : ""}
          />
          <span>My Watchlist</span>
          {watchlistCount > 0 && <span className="tab-count-badge">{watchlistCount}</span>}
        </button>
      </div>

      {/* Genre Pills */}
      <div className="genre-pills-container">
        <div className="genre-pills-track">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              className={`genre-pill ${genre === g ? "selected" : ""}`}
              onClick={() => setGenre(g)}
            >
              {g === "All" ? "All Genres" : g}
            </button>
          ))}
        </div>
        <div className="results-counter">
          <span>{totalResults} {totalResults === 1 ? "Film" : "Films"}</span>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
