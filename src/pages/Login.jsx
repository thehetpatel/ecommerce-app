import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../features/auth/authSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, error, token } = useSelector((state) => state.auth)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // 🔹 Auto-redirect if already logged in (page refresh case)
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      navigate('/home', { replace: true })
    }
  }, [navigate])

  // 🔹 Redirect after successful login
  useEffect(() => {
    if (token) {
      navigate('/home', { replace: true })
    }
  }, [token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      loginUser({
        username: username.trim(),
        password: password.trim(),
      })
    )
  }

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{ marginTop: '1rem' }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export default Login
