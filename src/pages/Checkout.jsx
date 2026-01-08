import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '../features/cart/cartSlice'

function Checkout() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart)

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handlePlaceOrder = () => {
    alert('Order placed successfully! (Demo)')
    dispatch(clearCart())
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Your cart is empty</h2>
        <p>Go back to products to add some items.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 20px' }}>
      <h2>Shopping Cart</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Product</th>
            <th style={{ padding: '10px' }}>Price</th>
            <th style={{ padding: '10px' }}>Qty</th>
            <th style={{ padding: '10px' }}>Total</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{item.title}</td>
              <td style={{ padding: '10px' }}>₹{item.price}</td>
              <td style={{ padding: '10px' }}>{item.quantity}</td>
              <td style={{ padding: '10px' }}>₹{(item.price * item.quantity).toFixed(2)}</td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <h3>Total: ₹{total.toFixed(2)}</h3>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button 
            onClick={() => dispatch(clearCart())}
            style={{ padding: '10px 20px', background: '#ccc', border: 'none', cursor: 'pointer' }}
          >
            Clear Cart
          </button>
          
          <button 
            onClick={handlePlaceOrder}
            style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
