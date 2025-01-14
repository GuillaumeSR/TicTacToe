// import { useState } from 'react'
// import circle from './assets/circle.svg'
// import cross from './assets/cross.svg'

import './App.css'

import { Outlet } from 'react-router-dom'
import Header from '../header';
import Footer from '../footer'


function App() {

  return (
    <>
      <div className='flex flex-col justify-between h-screen bg-gray-800'>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
      
    </>
  )
}

export default App
