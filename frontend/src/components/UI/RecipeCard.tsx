import React from 'react'
import s from './RecipeCard.module.css'
import img from '../../assets/grahpics/images/spaghetti.png'
import timeIcon from '../../assets/grahpics/Time icon.svg'

export default function RecipeCard() {
  return (
    <div className={`${s['recipe-card']} `}>
      <div>
        <img src={img} className={`${s['cover']}`} alt='...' />
      </div>

      <div className={`${s['body']}`}>
        <h5 className=''>Card title</h5>
        <p className=''>Carrot, Garlic, Harissa and Onion</p>
        <div className={`${s['time']}`}>
          <img src={timeIcon} height={26} width={26} /> <span>1h 45m</span>
        </div>
      </div>
    </div>
  )
}
