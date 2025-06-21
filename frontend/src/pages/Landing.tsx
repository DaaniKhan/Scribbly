import "../styles/Landing.css"

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <section className="hero">
        <h1>Welcome to <span className="scribbly-logo">Scribbly</span></h1>
        <p>
          Track your reading, jot down your thoughts, rate books, and explore what others are thinking
          all in one beautiful space.
        </p>
        <button className="hero-btn" onClick={() => window.location.href = "/signup"}>
          <span className="material-symbols-rounded">menu_book</span>
          Get Started
        </button>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <span className="material-symbols-rounded feature-icon">rate_review</span>
          <h3 className="feature-title">Write Reviews</h3>
          <p className="feature-desc">
            Share your insights and thoughts on books you've read with a vibrant community.
          </p>
        </div>

        <div className="feature-card">
          <span className="material-symbols-rounded feature-icon">visibility</span>
          <h3 className="feature-title">Control Privacy</h3>
          <p className="feature-desc">
            Make your reviews public or private — you decide who sees your bookshelf.
          </p>
        </div>

        <div className="feature-card">
          <span className="material-symbols-rounded feature-icon">explore</span>
          <h3 className="feature-title">Discover Books</h3>
          <p className="feature-desc">
            Browse others’ reviews and ratings to find your next favorite read.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Landing