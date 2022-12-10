import React from 'react'
import s from './Header.module.css'
import logo from '../../assets/grahpics/Logo.png'

export default function Header() {
  return (
    <header className={`${s['header']} d-flex gap-4 align-items-center w-100`}>
      <img src={logo} />
      <h2>Ramadan Dishes</h2>
    </header>
  )
}
