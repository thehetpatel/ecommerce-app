import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../features/auth/authSlice'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { items } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem',
      background: '#f8f9fa',
      borderBottom: '1px solid #ddd'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link to="/home" style={{ textDecoration: 'none', color: '#333' }}>ShopApp</Link>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/home" style={{ textDecoration: 'none', color: '#555' }}>Products</Link>
        <Link to="/checkout" style={{ textDecoration: 'none', color: '#555' }}>
          Cart ({cartCount})
        </Link>
        
        {token && (
          <button 
            onClick={handleLogout}
            style={{ 
              background: 'none', 
              border: '1px solid #ccc', 
              padding: '5px 10px', 
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
