import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import s from './App.module.css'
import Home from './components/pages/Home'
import RecipesContainer from './components/RecipesContainer'
import SearchContainer from './components/SearchContainer'
import Sidebar from './components/Sidebar'
import Header from './components/UI/Header'
import RecipeCard from './components/UI/RecipeCard'
import SearchBar from './components/UI/SearchBar'
import panIcon from './assets/grahpics/pan elements/pan.svg'

function App() {
  return (
    <div className={`${s['main-container']}`}>
      {/* <Header />
      <div className={`${s['page']} d-flex`}>
        <div className='d-flex flex-column col-8'>
          <SearchContainer />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/recepies-by-ingredient' element={<Home />}></Route>
            <Route path='/recepies-for-day' element={<Home />}></Route>
          </Routes>
          <h2>Today suggestions</h2>
          <RecipesContainer />
        </div>
        <Sidebar />
      </div> */}
      <img src={panIcon} />
    </div>
  )
}

export default App
