export const loginUserApi = async (credentials) => {
  // ---------------------------------------------------------
  // DEMO / INTERVIEW MOCK LOGIC
  // ---------------------------------------------------------
  // Explicitly separate demo auth from production auth
  if (credentials.username === 'demo' && credentials.password === 'demo') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 999,
          username: 'demo',
          email: 'demo@example.com',
          firstName: 'Demo',
          lastName: 'User',
          gender: 'neutral',
          image: 'https://dummyjson.com/icon/emilys/128', // Use valid placeholder
          token: 'mock-jwt-token-' + Date.now(),
        })
      }, 500) // Simulate network delay
    })
  }

  // ---------------------------------------------------------
  // REAL API LOGIC
  // ---------------------------------------------------------
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Invalid credentials')
  }

  return data
}


export const fetchProductsApi = async (limit = 10, skip = 0) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}

export const fetchCategoriesApi = async () => {
  const response = await fetch(
    'https://dummyjson.com/products/categories'
  )

  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }

  return response.json()
}

export const fetchProductsByCategoryApi = async (category) => {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch category products')
  }

  return response.json()
}
