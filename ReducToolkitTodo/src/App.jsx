import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import LoadingIndicator from './components/LoadingIndicator'
import { useSelector } from 'react-redux'
import { Toaster } from 'sonner'
import { Home } from 'lucide'
import HomePage from './components/HomePage'


function App() {
  const loading = useSelector(state => state.loading)
  return (
    <>
      {loading && <LoadingIndicator />}
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/todos' element={<AddTodo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
