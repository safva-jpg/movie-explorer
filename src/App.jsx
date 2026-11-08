import { useState } from "react";
import "./App.css";

const movies = [
  {
    id: 1,
    title: "Interstellar",
    year: "2014",
    rating: "8.7",
    genre: "Sci-Fi",
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 2,
    title: "Inception",
    year: "2010",
    rating: "8.8",
    genre: "Action",
    image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    id: 3,
    title: "Dune: Part Two",
    year: "2024",
    rating: "8.5",
    genre: "Sci-Fi",
    image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    id: 4,
    title: "The Batman",
    year: "2022",
    rating: "7.8",
    genre: "Action",
    image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 5,
    title: "Joker",
    year: "2019",
    rating: "8.4",
    genre: "Drama",
    image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    id: 6,
    title: "Avatar",
    year: "2009",
    rating: "7.9",
    genre: "Fantasy",
    image: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
  },
  {
    id: 7,
    title: "Oppenheimer",
    year: "2023",
    rating: "8.3",
    genre: "Drama",
    image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
  },
  {
    id: 8,
    title: "Spider-Man",
    year: "2021",
    rating: "8.2",
    genre: "Action",
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || movie.genre === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  return (
    <div className="app">
      <header className="navbar">
        <a href="/" className="brand">
          <span className="brand-icon">M</span>
          <span>MOVI<span className="brand-highlight">E</span>X</span>
        </a>

        <nav className="nav-links">
          <a href="#home" className="nav-active">Home</a>
          <a href="#trending">Discover</a>
          <a href="#popular">Popular</a>
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
            <span className="eyebrow">YOUR NEXT MOVIE NIGHT STARTS HERE</span>
            <h1>Discover stories<br />worth <span>watching.</span></h1>
            <p>
              Explore extraordinary movies, discover hidden gems
              and find your next favourite film.
            </p>

            <div className="hero-actions">
              <a href="#trending" className="primary-btn">Explore Movies ↗</a>
              <a href="#popular" className="secondary-btn">Browse Collection</a>
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
              <img
                src="https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"
                alt="Dune Part Two poster"
              />
              <div className="poster-caption">
                <span>FEATURED FILM</span>
                <strong>Dune: Part Two</strong>
                <small>★ 8.5 / 10</small>
              </div>
            </div>
            <div className="floating-note">✦ CINEMA, REIMAGINED</div>
          </div>
        </section>

        <section className="movie-section" id="trending">
          <div className="section-heading">
            <div>
              <span className="eyebrow">HANDPICKED FOR YOU</span>
              <h2>Trending <span>Now</span></h2>
            </div>
            <span className="section-label">DISCOVER YOUR NEXT FAVOURITE ↗</span>
          </div>

          <div className="category-list">
            {["All", "Action", "Sci-Fi", "Drama", "Fantasy"].map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "category active" : "category"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="movie-grid">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <article className="movie-card" key={movie.id}>
                  <div className="movie-poster">
                    <img src={movie.image} alt={movie.title} />
                    <button
                      className="heart-btn"
                      onClick={() => toggleFavorite(movie.id)}
                      aria-label="Toggle favourite"
                    >
                      {favorites.includes(movie.id) ? "♥" : "♡"}
                    </button>
                    <span className="rating">★ {movie.rating}</span>
                  </div>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.year} <span>•</span> {movie.genre}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="empty-message">No movies found. Try another search.</p>
            )}
          </div>
        </section>

        <section className="favorites-section" id="favorites">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
              <h2>Your <span>Watchlist</span></h2>
            </div>
            <span className="section-label">{favorites.length} SAVED MOVIES</span>
          </div>

          <div className="watchlist">
            {movies.filter((movie) => favorites.includes(movie.id)).length > 0
              ? movies
                  .filter((movie) => favorites.includes(movie.id))
                  .map((movie) => (
                    <span className="watchlist-item" key={movie.id}>
                      {movie.title}
                      <button onClick={() => toggleFavorite(movie.id)}>×</button>
                    </span>
                  ))
              : <p>Your watchlist is waiting for its first movie. Tap ♡ to save one!</p>}
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