import React from 'react'
import RecipeCard from '../UI/RecipeCard'
import ScrollContainer from 'react-indiana-drag-scroll'
import s from './RecipesContainer.module.css'
import CookingAnimation from '../UI/animations/CookingAnimation'

export default function RecipesContainer() {
  return (
    // <div className='d-flex overflow-scroll g-4'>
    <div className={`${s['recipes-container']}`}>
      <ScrollContainer className={`d-flex overflow-scroll`}>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </ScrollContainer>
    </div>
    // </div>
  )
}
