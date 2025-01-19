import './App.css'
import './bootstrap.min.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import { authContext } from './Context/ContextApi'

function App() {

  const { authContextStatus } = useContext(authContext)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={authContextStatus ? <Home /> : <Navigate to={'/'} />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
