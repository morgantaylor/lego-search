import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/header.js'
import Home from './components/home.js'
import SetsPage from './pages/sets.js'
import MinifigsPage from './pages/minifig.js'
import ColorsPage from './pages/colors.js'
import PartsPage from './pages/parts.js'
import PartIDPage from './pages/partid.js'
import './App.scss'

const App = () => {
  return (
    <>
      <Header />
      <main className='page'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/minifigs' element={<MinifigsPage />} />
          <Route path='/sets' element={<SetsPage />} />
          <Route path='/colors' element={<ColorsPage />} />
          <Route path='/parts' element={<PartsPage />} />
            <Route path='/parts/:partId' element={<PartIDPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
