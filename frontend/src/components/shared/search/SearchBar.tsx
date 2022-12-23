import React from 'react'
import s from './SearchBar.module.css'
import searchIcon from '../../../assets/grahpics/search-icon.svg'
// import searchIcon from 'https://www.svgrepo.com/download/331705/cdn.svg'
export default function SearchBar() {
  return (
    <div className={`${s['search-bar']} d-flex align-items-center w-50 w-md-50`}>
      <img src={searchIcon} width={27} height={27} />
      <input type="text" className={`${s['']}`} />
    </div>
  )
}
