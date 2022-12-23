import React, { useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import s from './SearchContainer.module.css'
// @ts-expect-error
import DatePicker from 'react-datepicker'
import calendarIcon from '../../../assets/grahpics/Calendar icon.png'

import 'react-datepicker/dist/react-datepicker.css'
export default function SearchContainer() {
  const [startDate, setStartDate] = useState(new Date(2023, 2, 22))
  function addDays(date: Date, days: number) {
    var result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }
  return (
    <form className={`${s['search-form']} d-flex w-100`}>
      <SearchBar />
      <div
        className={`${s['search-calendar']} d-flex align-items-center justify-content-center text-center`}
        onClick={() => {}}>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          showYearDropdown
          dateFormatCalendar='MMMM'
          yearDropdownItemNumber={15}
          scrollableYearDropdown
          minDate={new Date(2023, 2, 22)}
          maxDate={addDays(new Date(2023, 2, 22), 30)}
        />
        <img src={calendarIcon} className={`${s['calendar-icon']}`} />
      </div>
      <button type='submit'>Search</button>
    </form>
  )
}
