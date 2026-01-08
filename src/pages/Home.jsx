import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadProducts,
  loadCategories,
  loadCategoryProducts,
} from '../features/products/productsSlice'
import { addToCart } from '../features/cart/cartSlice'

function Home() {
  const dispatch = useDispatch()
  const { items, categories, total, isLoading } = useSelector((state) => state.products)
  
  const [page, setPage] = useState(1)
  const LIMIT = 10

  useEffect(() => {
    dispatch(loadCategories())
  }, [dispatch])

  useEffect(() => {
    // Basic pagination logic
    const skip = (page - 1) * LIMIT
    dispatch(loadProducts({ limit: LIMIT, skip }))
  }, [dispatch, page])

  const onFilterChange = (e) => {
    const slug = e.target.value
    if (slug === 'all') {
      dispatch(loadProducts({ limit: LIMIT, skip: 0 }))
      setPage(1)
    } else {
      dispatch(loadCategoryProducts(slug))
      setPage(1) // Reset to first page on filter
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Product Catalog</h2>
        
        <select onChange={onFilterChange} style={{ padding: '5px' }}>
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </header>

      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {items.map((p) => (
            <div key={p.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h4>{p.title}</h4>
              <p>Price: ₹{p.price}</p>
              <button 
                onClick={() => dispatch(addToCart(p))}
                style={{ background: 'blue', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer' }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          &laquo; Prev
        </button>
        <span>Page {page}</span>
        <button disabled={page * LIMIT >= total} onClick={() => setPage(p => p + 1)}>
          Next &raquo;
        </button>
      </div>
    </div>
  )
}

export default Home
