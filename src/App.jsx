import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import TrailerModal from "./components/TrailerModal";
import movies from "./data/movies";
import { Sparkles, Film, Heart } from "lucide-react";
import "./App.css";

const CURRENT_YEAR = new Date().getFullYear();

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("curated");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTrailerMovie, setActiveTrailerMovie] = useState(null);

  // Curated spotlight rotation films
  const featuredList = useMemo(() => {
    return movies.filter((m) => m.featured);
  }, []);

  const [activeFeatured, setActiveFeatured] = useState(featuredList[0] || movies[0]);

  // Persist watchlist in localStorage
  const [savedMovies, setSavedMovies] = useState(() => {
    try {
      const stored = localStorage.getItem("cinephy_watchlist");
      return stored ? JSON.parse(stored) : [1, 4];
    } catch {
      return [1, 4];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cinephy_watchlist", JSON.stringify(savedMovies));
    } catch {
      // LocalStorage fallback
    }
  }, [savedMovies]);

  const genres = useMemo(() => {
    return ["All", ...Array.from(new Set(movies.map((m) => m.genre)))];
  }, []);

  const toggleSave = (id) => {
    setSavedMovies((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  // Filter & Sort pipeline
  const filteredMovies = useMemo(() => {
    let result = movies.filter((movie) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        movie.title.toLowerCase().includes(q) ||
        (movie.director && movie.director.toLowerCase().includes(q)) ||
        (movie.mood && movie.mood.some((m) => m.toLowerCase().includes(q))) ||
        (movie.cast && movie.cast.some((c) => c.toLowerCase().includes(q)));

      const matchesGenre = genre === "All" || movie.genre === genre;

      let matchesCollection = true;
      if (collectionFilter === "masterpieces") {
        matchesCollection = movie.rating >= 8.5;
      } else if (collectionFilter === "mind-bending") {
        matchesCollection =
          movie.mood &&
          movie.mood.some((m) =>
            ["Mind-Bending", "Cosmic", "Philosophical", "Multiverse"].includes(m)
          );
      } else if (collectionFilter === "watchlist") {
        matchesCollection = savedMovies.includes(movie.id);
      }

      return matchesSearch && matchesGenre && matchesCollection;
    });

    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "year-desc") {
      result = [...result].sort((a, b) => b.year - a.year);
    } else if (sortBy === "year-asc") {
      result = [...result].sort((a, b) => a.year - b.year);
    } else if (sortBy === "runtime") {
      result = [...result].sort((a, b) => {
        const durA = parseInt(a.duration) || 0;
        const durB = parseInt(b.duration) || 0;
        return durB - durA;
      });
    }

    return result;
  }, [search, genre, collectionFilter, sortBy, savedMovies]);

  const scrollToArchive = () => {
    const el = document.getElementById("archive");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenWatchlist = () => {
    setCollectionFilter((prev) => (prev === "watchlist" ? "all" : "watchlist"));
    scrollToArchive();
  };

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setSelectedMovie(movies[randomIndex]);
  };

  const handleResetFilters = () => {
    setSearch("");
    setGenre("All");
    setCollectionFilter("all");
    setSortBy("curated");
  };

  return (
    <div className="cine-app">
      {/* Floating Glass Navigation */}
      <Navbar
        watchlistCount={savedMovies.length}
        onOpenWatchlist={handleOpenWatchlist}
        isWatchlistActive={collectionFilter === "watchlist"}
        onSurpriseMe={handleSurpriseMe}
      />

      <main>
        {/* Cinematic Stage Spotlight */}
        <Hero
          movie={activeFeatured}
          featuredList={featuredList}
          onSelectMovie={setActiveFeatured}
          onExplore={scrollToArchive}
          onWatchTrailer={(m) => setActiveTrailerMovie(m)}
          isSaved={savedMovies.includes(activeFeatured.id)}
          onToggleSave={toggleSave}
          onOpenDetails={(m) => setSelectedMovie(m)}
        />

        {/* The Archive Section */}
        <section className="archive-section" id="archive">
          <div className="archive-header">
            <div className="archive-header-left">
              <div className="section-kicker">
                <Sparkles size={13} className="kicker-sparkle" />
                <span>THE COMPLETE RETROSPECTIVE</span>
              </div>
              <h2 className="section-heading">
                The Cinematic <em>Archive</em>
              </h2>
              <p className="section-subtext">
                An intentional catalog of influential films, transcendent scores, and auteur storytelling.
              </p>
            </div>

            <div className="archive-header-stat">
              <span className="stat-number">{movies.length}</span>
              <span className="stat-label">TITLES ARCHIVED</span>
            </div>
          </div>

          {/* Discovery Controls */}
          <SearchBar
            search={search}
            setSearch={setSearch}
            genre={genre}
            setGenre={setGenre}
            genres={genres}
            collectionFilter={collectionFilter}
            setCollectionFilter={setCollectionFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalResults={filteredMovies.length}
            watchlistCount={savedMovies.length}
          />

          {/* Active Watchlist Banner */}
          {collectionFilter === "watchlist" && (
            <div className="active-filter-banner">
              <div className="banner-left">
                <Heart size={16} fill="currentColor" className="banner-heart" />
                <span>
                  Viewing your personalized watchlist ({savedMovies.length}{" "}
                  {savedMovies.length === 1 ? "film" : "films"})
                </span>
              </div>
              <button
                type="button"
                className="banner-reset-link"
                onClick={() => setCollectionFilter("all")}
              >
                Show All Films
              </button>
            </div>
          )}

          {/* Film Grid */}
          <MovieGrid
            movies={filteredMovies}
            onSelect={(m) => setSelectedMovie(m)}
            savedMovies={savedMovies}
            onToggleSave={toggleSave}
            onWatchTrailer={(m) => setActiveTrailerMovie(m)}
            isWatchlistFilter={collectionFilter === "watchlist"}
            onResetFilters={handleResetFilters}
          />
        </section>
      </main>

      {/* Editorial Footer */}
      <footer className="cine-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Film size={20} />
              <span>CINEPHY</span>
            </div>
            <p className="footer-quote">
              &ldquo;Cinema is a matter of what&apos;s in the frame and what&apos;s out.&rdquo;
              <span className="quote-author">— Martin Scorsese</span>
            </p>
          </div>

          <div className="footer-nav-columns">
            <div className="footer-col">
              <h4>Curations</h4>
              <button
                type="button"
                onClick={() => {
                  setCollectionFilter("masterpieces");
                  scrollToArchive();
                }}
              >
                Masterpieces (8.5+)
              </button>
              <button
                type="button"
                onClick={() => {
                  setCollectionFilter("mind-bending");
                  scrollToArchive();
                }}
              >
                Mind-Bending
              </button>
              <button
                type="button"
                onClick={() => {
                  setGenre("Sci-Fi");
                  scrollToArchive();
                }}
              >
                Sci-Fi Visions
              </button>
            </div>

            <div className="footer-col">
              <h4>Navigation</h4>
              <a href="#spotlight">Spotlight</a>
              <a href="#archive">The Archive</a>
              <button type="button" onClick={handleOpenWatchlist}>
                My Watchlist ({savedMovies.length})
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-credit">
            Crafted with editorial intention for cinephiles. Preserving the magic of 35mm storytelling.
          </p>
          <p className="footer-copy">
            © {CURRENT_YEAR} CINEPHY ARCHIVE. All film stills & posters copyright their respective studios.
          </p>
        </div>
      </footer>

      {/* Film Dossier Modal */}
      <MovieDetails
        key={selectedMovie?.id ?? "none"}
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        isSaved={selectedMovie ? savedMovies.includes(selectedMovie.id) : false}
        onToggleSave={toggleSave}
        onWatchTrailer={(m) => setActiveTrailerMovie(m)}
      />

      {/* Official HD Trailer Lightbox Modal */}
      <TrailerModal
        movie={activeTrailerMovie}
        onClose={() => setActiveTrailerMovie(null)}
      />
    </div>
  );
}

export default App;
