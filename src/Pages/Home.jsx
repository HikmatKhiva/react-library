import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header/Header'
import Books from './Books'
import Contact from './Contact'
const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index path='/' element={<Books />} />
        <Route index path='/contact' element={<Contact />} />
      </Routes>
    </>
  )
}
export default Home