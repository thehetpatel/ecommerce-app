import { useSelector } from 'react-redux'

function App() {
  const auth = useSelector((state) => state.auth)

  console.log(auth)

  return (
    <div>
      <h1>E-Commerce App</h1>
    </div>
  )
}

export default App
