import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout/MainLayout'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Challenge from './pages/Challenge/Challenge'
import Profile from './pages/Profile/Profile'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Admin from './pages/Admin/Admin'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
          <Route path="/" element={<Challenge />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/profile" element={<Profile darkMode={darkMode} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
