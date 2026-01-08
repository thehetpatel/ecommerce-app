import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from '../features/products/productsSlice'

function Home() {
  const dispatch = useDispatch()
  const { products, categories, total, isLoading } = useSelector(
    (state) => state.products
  )

  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    dispatch(fetchProducts({ limit, skip: (page - 1) * limit }))
    dispatch(fetchCategories())
  }, [dispatch, page])

  const handleCategoryChange = (categorySlug) => {
    if (categorySlug === 'all') {
      setPage(1)
      dispatch(fetchProducts({ limit, skip: 0 }))
    } else {
      dispatch(fetchProductsByCategory(categorySlug))
    }
  }

  return (
    <div>
      <h2>Products</h2>

      {/* Category Filter */}
      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="all">All</option>

        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      {isLoading && <p>Loading...</p>}

      {/* Product List */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.title}</strong> – ₹{product.price}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span> Page {page} </span>

        <button
          disabled={page * limit >= total}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Home
