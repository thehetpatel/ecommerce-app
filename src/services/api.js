export const loginUserApi = async (credentials) => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
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
