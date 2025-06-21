// import React, { useState } from "react"
// import "../styles/Signup.css"

// const Signup = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log(email, password)
//   }

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2 className="auth-heading">Create an Account</h2>

//         <label>Email</label>
//         <input 
//           type="email"
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//           required
//         />

//         <label>Password</label>
//         <input 
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//           required
//         />

//         <button type="submit" className="auth-btn">
//           <span className="material-symbols-rounded">person_add</span>
//           Sign Up
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Signup

import React, { useState } from "react"
import "../styles/Signup.css"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 1000)
    console.log(email, password)
  }

  return (
    <div className="signup-container fade-in">
      <form className={`signup-form ${submitted ? "bounce" : ""}`} onSubmit={handleSubmit}>
        <h2 className="signup-heading">Create an Account</h2>

        <label>Email</label>
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label>Password</label>
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button type="submit" className="signup-button">
          <span className="material-symbols-rounded">person_add</span>
          Sign Up
        </button>

        <div className="signup-separator">
            <span className="line" />
            <span className="or-text">or</span>
            <span className="line" />
        </div>

        <button className="login-redirect-btn" onClick={() => window.location.href = '/login'}>
            <span className="material-symbols-rounded">login</span>
            Log In
        </button>
      </form>
    </div>
  )
}

export default Signup