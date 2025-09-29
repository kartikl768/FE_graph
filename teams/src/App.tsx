import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ScheduleForm from './ScheduleForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ScheduleForm />
    </>
  )
}

export default App
