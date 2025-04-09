import { useState } from 'react'
import './App.css'
import './assets/css/style.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Register from './components/Register'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  
  return (
    <>
    <BrowserRouter >
    < Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    < Footer />
    </BrowserRouter>
    </>
  )
}

export default App
