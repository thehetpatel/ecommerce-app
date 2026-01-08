const BASE_URL = 'https://dummyjson.com'

export const login = async (creds) => {
  // Dev bypass for testing
  if (creds.username === 'demo' && creds.password === 'demo') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 999,
          username: 'demo',
          email: 'demo@test.com',
          firstName: 'Demo',
          lastName: 'User',
          image: 'https://dummyjson.com/icon/emilys/128',
          token: `mock-token-${Date.now()}`,
        })
      }, 800)
    })
  }

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')
  return data
}

export const getProducts = async (limit = 10, skip = 0) => {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error('Could not load products')
  return res.json()
}

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`)
  if (!res.ok) throw new Error('Category fetch failed')
  return res.json()
}

export const getProductsByCategory = async (slug) => {
  const res = await fetch(`${BASE_URL}/products/category/${slug}`)
  if (!res.ok) throw new Error('Failed to load category items')
  return res.json()
}
