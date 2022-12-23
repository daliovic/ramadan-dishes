import React from 'react'
import HomeIngredientsContainer from './HomeIngredientsContainer'
import RecipesContainer from '../../UI/RecipesContainer'
import s from './Home.module.css'

export default function Home() {
  return (
    <div className={`${s['home']}`}>
      <h2>Ingredients suggestions</h2>
      <HomeIngredientsContainer />
    </div>
  )
}
