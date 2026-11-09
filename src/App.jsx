import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log("API KEY LOADED:", Boolean(API_KEY));
console.log("ENV VALUE:", import.meta.env.VITE_TMDB_API_KEY);
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const categories = [
  { name: "All", id: null },
  { name: "Action", id: 28 },
  { name: "Sci-Fi", id: 878 },
  { name: "Drama", id: 18 },
  { name: "Fantasy", id: 14 },
];

function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_KEY) {
          throw new Error("API key missing. Check your .env file.");
        }

        const endpoint = search.trim()
          ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}`
          : `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Unable to load movies. Check your API key.");
        }

        const data = await response.json();

        if (!cancelled) {
          setMovies(data.results || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setMovies([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, search.trim() ? 400 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search]);

  const filteredMovies = movies.filter((movie) => {
    if (activeCategory === "All") return true;

    const category = categories.find(
      (item) => item.name === activeCategory
    );

    return movie.genre_ids?.includes(category?.id);
  });

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const getYear = (date) =>
    date ? date.split("-")[0] : "N/A";

  const getGenre = (genreIds = []) =>
    categories
      .filter((category) => category.id && genreIds.includes(category.id))
      .map((category) => category.name)
      .join(" • ") || "Movie";

  const heroMovie = movies.find((movie) => movie.backdrop_path || movie.poster_path);

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">M</span>
          <span>MOVI<span className="brand-highlight">E</span>X</span>
        </a>

        <nav className="nav-links">
          <a href="#home" className="nav-active">Home</a>
          <a href="#trending">Discover</a>
          <a href="#favorites">Watchlist</a>
        </nav>

        <div className="nav-right">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <a href="#favorites" className="favorite-link">
            ♡ <span>{favorites.length}</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR NEXT MOVIE NIGHT STARTS HERE
            </span>

            <h1>
              Discover stories<br />
              worth <span>watching.</span>
            </h1>

            <p>
              Explore extraordinary movies, discover hidden gems
              and find your next favourite film.
            </p>

            <div className="hero-actions">
              <a href="#trending" className="primary-btn">
                Explore Movies ↗
              </a>
              <a href="#favorites" className="secondary-btn">
                Browse Watchlist
              </a>
            </div>

            <div className="hero-stats">
              <div><strong>10K+</strong><small>Movies</small></div>
              <div><strong>100+</strong><small>Genres</small></div>
              <div><strong>24/7</strong><small>Discovery</small></div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-orbit orbit-one"></div>
            <div className="hero-orbit orbit-two"></div>

            <div className="hero-poster">
              {heroMovie?.poster_path && (
                <img
                  src={`${IMAGE_URL}${heroMovie.poster_path}`}
                  alt={heroMovie.title}
                />
              )}

              <div className="poster-caption">
                <span>FEATURED FILM</span>
                <strong>{heroMovie?.title || "Discover Movies"}</strong>
                <small>
                  ★ {heroMovie?.vote_average?.toFixed(1) || "8.5"} / 10
                </small>
              </div>
            </div>

            <div className="floating-note">
              ✦ CINEMA, REIMAGINED
            </div>
          </div>
        </section>

        <section className="movie-section" id="trending">
          <div className="section-heading">
            <div>
              <span className="eyebrow">HANDPICKED FOR YOU</span>
              <h2>
                {search ? "Search " : "Trending "}
                <span>Movies</span>
              </h2>
            </div>

            <span className="section-label">
              DISCOVER YOUR NEXT FAVOURITE ↗
            </span>
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category.name}
                className={
                  activeCategory === category.name
                    ? "category active"
                    : "category"
                }
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="movie-grid">
            {loading ? (
              <p className="empty-message">Loading movies...</p>
            ) : error ? (
              <p className="empty-message">{error}</p>
            ) : filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <article className="movie-card" key={movie.id}>
                  <div className="movie-poster">
                    {movie.poster_path ? (
                      <img
                        src={`${IMAGE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="empty-message">No poster available</div>
                    )}

                    <button
                      className="heart-btn"
                      onClick={() => toggleFavorite(movie.id)}
                      aria-label="Toggle favourite"
                    >
                      {favorites.includes(movie.id) ? "♥" : "♡"}
                    </button>

                    <span className="rating">
                      ★ {movie.vote_average?.toFixed(1) || "N/A"}
                    </span>
                  </div>

                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>
                      {getYear(movie.release_date)}
                      {" "}
                      <span>•</span>
                      {" "}
                      {getGenre(movie.genre_ids)}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <p className="empty-message">
                No movies found. Try another search.
              </p>
            )}
          </div>
        </section>

        <section className="favorites-section" id="favorites">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
              <h2>Your <span>Watchlist</span></h2>
            </div>

            <span className="section-label">
              {favorites.length} SAVED MOVIES
            </span>
          </div>

          <div className="watchlist">
            {favorites.length > 0 ? (
              movies
                .filter((movie) => favorites.includes(movie.id))
                .map((movie) => (
                  <span className="watchlist-item" key={movie.id}>
                    {movie.title}
                    <button onClick={() => toggleFavorite(movie.id)}>
                      ×
                    </button>
                  </span>
                ))
            ) : (
              <p>
                Your watchlist is waiting for its first movie.
                Tap ♡ to save one!
              </p>
            )}
          </div>
        </section>
      </main>

      <footer>
        <a href="#home" className="brand">
          <span className="brand-icon">M</span>
          MOVI<span className="brand-highlight">E</span>X
        </a>

        <p>Discover more. Watch better. Love cinema.</p>
        <span>© 2026 MOVIEX</span>
      </footer>
    </div>
  );
}

export default App;