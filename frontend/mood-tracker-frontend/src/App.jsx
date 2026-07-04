import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Calm = lazy(() => import('./components/Calm'))
const Bored = lazy(() => import('./components/Bored'))
const Celebrate = lazy(() => import('./components/Celebrate'))
const Comfort = lazy(() => import('./components/Comfort'))
const AiCompanion = lazy(() => import('./components/AiCompanion'))

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="bottom-right" />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] dark:bg-[#1c1917]">
          <div className="w-8 h-8 border-2 border-[#1c1917] dark:border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/calm' element={<Calm />} />
          <Route path='/bored' element={<Bored />} />
          <Route path='/celebrate' element={<Celebrate />} />
          <Route path='/comfort' element={<Comfort />} />
          <Route path='/ai-companion' element={<AiCompanion />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
