import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Hero from './components/ui/hero'

import './App.css'
import Login from './components/costom/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login/>
    {/* <Hero/> */}
    </>
  )
}

export default App
