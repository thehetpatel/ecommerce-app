import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { isLoading, error, token } = useSelector((state) => state.auth)
  
  const [username, setUsername] = useState('kminchelle') // Pre-fill for easier testing (common dev habit)
  const [password, setPassword] = useState('0lelplR')

  useEffect(() => {
    if (token) navigate('/home', { replace: true })
  }, [token, navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username || !password) return

    dispatch(login({ username, password }))
  }

  return (
    <div style={{ maxWidth: '360px', margin: '4rem auto', textAlign: 'center' }}>
      <h1>Welcome Back</h1>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '8px' }}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px' }}
        />

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          {isLoading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '1rem', fontSize: '0.9rem' }}>
          Login failed: {error}
        </div>
      )}
      
      <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '2rem' }}>
        Tip: Use 'kminchelle' / '0lelplR' to test.
      </p>
    </div>
  )
}

export default Login
