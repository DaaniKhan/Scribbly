import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import "./index.css"

// Pages and Components
import Landing from './pages/Landing'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

  const { user } = useAuthContext() 

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={!user ? <Landing /> : <Navigate to="/home" />}
            />
            <Route 
              path="/home"
              element={user ? <Home /> : <Navigate to="/" />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/home" />}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/home" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App