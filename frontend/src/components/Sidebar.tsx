import React, { useEffect, useState } from 'react'
import s from './Sidebar.module.css'
import mosque from '../assets/grahpics/mosque-vector.svg'
import axios from 'axios'
const DEFAULT_PRAYER_TIMES = {
  Asr: '...',
  Dhuhr: '...',
  Fajr: '...',
  Isha: '...',
  Maghrib: '...',
  Sunrise: '...',
}
const OFFSET = 20

export default function Sidebar() {
  const [currentTime, setCurrentTime] = React.useState(new Date())
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(DEFAULT_PRAYER_TIMES)
  const [nextPrayer, setNextPrayer] = useState('Fajr')
  const [timeLeftNextPrayer, setTimeLeftNextPrayer] = useState(0)

  const timeToMinutes = (time: string) => {
    return +time.substring(0, 2) * 60 + +time.substring(3, 5)
  }
  const minutesToTime = (minutes: number) => {
    const hours = Math.round(minutes / 60)
    const min = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(min).padStart(2, '0')}`
  }

  const getNextPrayer = () => {
    const currentTimeInMinutes
     = timeToMinutes(
      currentTime.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })
    )

    const prayerTimesArray = Object.entries(prayerTimes)
    let i = prayerTimesArray.length - 1
    let currentPrayerTimeInMinutes = timeToMinutes(prayerTimesArray[i][1])
    setTimeLeftNextPrayer(24 * 60 - currentTimeInMinutes + timeToMinutes(prayerTimesArray[0][1]))

    let timeDiff = currentTimeInMinutes - currentPrayerTimeInMinutes

    while (timeDiff < 0 && i > 0) {

      i--

      currentPrayerTimeInMinutes = timeToMinutes(prayerTimesArray[i][1])
      timeDiff = currentTimeInMinutes - currentPrayerTimeInMinutes

      setNextPrayer(Object.entries(prayerTimes)[i + 1][0])
      setTimeLeftNextPrayer(-(currentTimeInMinutes - timeToMinutes(prayerTimesArray[i + 1][1])))
    }
  }

  useEffect(() => {
    // const tempDate = new Date()
    // tempDate.setHours(OFFSET)
    setInterval(() => setCurrentTime(new Date()), 1000)

    axios
      .get('http://localhost:3000/getPrayerTimes')
      .then((data) => {
        // console.log(data.data)

        let tempPrayers: any = {}
        Object.keys(data.data).forEach((prayer) => {
          if (Object.keys(DEFAULT_PRAYER_TIMES).includes(prayer)) {
            tempPrayers[prayer] = data.data[prayer]
          }
        })

        setPrayerTimes(tempPrayers)
      })
      .catch((err) => console.log(err))
  }, [nextPrayer])

  useEffect(() => {
    if (!(prayerTimes.Asr === '...')) getNextPrayer()
  }, [prayerTimes])

  return (
    <aside className={`${s['sidebar']} d-flex col-4 flex-column`}>
      <p className={`${s['current-time']}`}>
        {currentTime
          .toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          })}
      </p>
      <p className={`${s['current-day']}`}>{currentTime.toLocaleDateString('en-GB', { weekday: 'long' })}</p>
      <p className={`${s['current-date']}`}>
        {currentTime.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </p>
      <p className={`${s['next-prayer-label']}`}>Next prayer</p>
      <p className={`${s['next-prayer-time']}`}>{prayerTimes[nextPrayer].substring(0, 6)}</p>
      <p className={`${s['next-prayer-time-left']}`}>
        {minutesToTime(timeLeftNextPrayer)} left to {nextPrayer}
      </p>
      <div className={`${s['prayer-time']} d-flex justify-content-between`}>
        <p>Fajr </p>
        <p>{prayerTimes.Fajr?.substring(0, 6)}</p>
      </div>
      <div className={`${s['prayer-time']} d-flex justify-content-between`}>
        <p>Shuruk </p>
        <p>{prayerTimes.Sunrise?.substring(0, 6)}</p>
      </div>
      <div className={`${s['prayer-time']} d-flex justify-content-between`}>
        <p>Dhuhr </p>
        <p>{prayerTimes.Dhuhr?.substring(0, 6)}</p>
      </div>
      <div className={`${s['prayer-time']} d-flex justify-content-between`}>
        <p>Asr </p>
        <p>{prayerTimes.Asr?.substring(0, 6)}</p>
      </div>
      <div className={`${s['prayer-time']} d-flex justify-content-between`}>
        <p>Maghrib </p>
        <p>{prayerTimes.Maghrib?.substring(0, 6)}</p>
      </div>
      <div className={`${s['prayer-time']} d-flex justify-content-between`}>
        <p>Isha </p>
        <p>{prayerTimes.Isha?.substring(0, 6)}</p>
      </div>

      <img src={mosque} className={`${s['background-image']} mt-auto align`} />
    </aside>
  )
}
