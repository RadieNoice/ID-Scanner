import React from 'react'
import './App.css'
import Scanner from './components/Scanner'
import Dashboard from './Pages/Dashboard'
import Events from './Pages/Events'
import Attendance from './Pages/Attendance'
import Members from './Pages/Members'

const App = () => {
  return (
    <div>
      <Dashboard />
      <Events />
      <Attendance />
      <Members />
    </div>
  )
}

export default App