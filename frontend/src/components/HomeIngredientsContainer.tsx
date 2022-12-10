import React from 'react'
import CarrotImg from '../assets/grahpics/images/ingredients/Carrot.png'
import OnionImg from '../assets/grahpics/images/ingredients/Onion.png'
import ParsleyImg from '../assets/grahpics/images/ingredients/Parsley.png'
import RiceImg from '../assets/grahpics/images/ingredients/Rice.png'
import TunaImg from '../assets/grahpics/images/ingredients/Tuna.png'
import TomatoPasteImg from '../assets/grahpics/images/ingredients/Tomato Paste.png'
import IngredientCard from './UI/IngredientCard'
import s from './HomeIngredientsContainer.module.css'

const INGREDIENTS = [
  { name: 'Carrot', image: CarrotImg },
  { name: 'Onion', image: OnionImg },
  { name: 'Parsley', image: ParsleyImg },
  { name: 'Rice', image: RiceImg },
  { name: 'Tuna', image: TunaImg },
  { name: 'Tomato Paste', image: TomatoPasteImg },
]
export default function HomeIngredientsContainer() {
  return (
    <div className={`${s['home-ingredients-container']} d-flex`}>
      {INGREDIENTS.map((item) => (
        <IngredientCard name={item.name} image={item.image} key={`ing-${item.name}`} />
      ))}
    </div>
  )
}
