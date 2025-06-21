import { useState } from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import "../styles/Navbar.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          <h1>Scribbly</h1>
        </Link>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-rounded">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </div>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/browse" onClick={() => setMenuOpen(false)}>Browse Books</Link>
          <Link to="/my-reviews" onClick={() => setMenuOpen(false)}>My Reviews</Link>
          <Link to="/community" onClick={() => setMenuOpen(false)}>Community</Link>
        </nav>

        <div className="user-section">
          <button onClick={handleClick} className="logout-btn">Log out</button>
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
