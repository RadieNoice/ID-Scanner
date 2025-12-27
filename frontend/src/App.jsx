import React from 'react'
import Scanner from './components/Scanner'
import Dashboard from './Pages/Dashboard'
import Events from './Pages/Events'
import Attendance from './Pages/Attendance'

const App = () => {
  return (
    <div>
      <Dashboard />
      <Events />
      <Attendance />
    </div>
  )
}

export default App