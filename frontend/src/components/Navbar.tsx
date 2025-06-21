import { useState } from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import "../styles/Navbar.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { logout } = useLogout()

  const { user } = useAuthContext() 

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

        {user ?
          <div className="user-section">
            <span className="user-email">{user.email}</span>
            <button onClick={handleClick} className="logout-btn">Log out</button>
          </div>
          :
          <div className="user-section">
            <Link to="/login" className="login-btn">Log In</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        }
      </div>
    </header>
  )
}

export default Navbar
