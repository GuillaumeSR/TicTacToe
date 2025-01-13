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
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
