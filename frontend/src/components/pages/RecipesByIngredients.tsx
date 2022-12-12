import React from 'react'
import HomeIngredientsContainer from '../HomeIngredientsContainer'
import RecipesContainer from '../RecipesContainer'
import s from './Home.module.css'

export default function RecipesByIngredients() {
  return (
    <div className={`${s['home']}`}>
      <h2>Ingredients suggestions</h2>
      <HomeIngredientsContainer />
    </div>
  )
}
