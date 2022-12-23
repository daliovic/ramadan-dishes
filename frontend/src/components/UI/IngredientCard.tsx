import React from 'react'
import CookingAnimation from './animations/CookingAnimation'
import s from './IngredientCard.module.css'
export default function IngredientCard({ name, image }: { name: string; image: string }) {
  return (
    <div className={`${s['ingredient-card']} d-flex flex-column text-center align-items-center`}>
      <div className={`${s['ingredient-img']}`}>
        <div className={`${s['ingredient-overlay']}`}></div>
        <div className={`${s['svg-animation']}`}>
          <CookingAnimation />
        </div>
        <img src={image} />
      </div>
      <div className={`${s['ingredient-name']} d-flex align-items-center my-auto`}>
        <p className='my-auto'>{name}</p>
      </div>
    </div>
  )
}
