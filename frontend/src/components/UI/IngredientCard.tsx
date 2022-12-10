import React from 'react'
import s from './IngredientCard.module.css'
export default function IngredientCard({ name, image }: { name: string; image: string }) {
  return (
    <div className={`${s['ingredient-card']} d-flex flex-column text-center align-items-center`}>
      <img src={image} />
      <div className='d-flex align-items-center h-100'>
        <p className='my-auto'>{name}</p>
      </div>
    </div>
  )
}
