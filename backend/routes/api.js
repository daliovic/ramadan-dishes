import express from 'express'
import axios from 'axios'
import e from 'express'

const router = express.Router()

const prayerTimesApiRamadan =
  'http://api.aladhan.com/v1/hijriCalendarByCity?city=Mecca&country=Saudi Arabia&method=1&month=09&year=1444'
const dishesSource =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7c1daa75-3bea-4684-bf17-be07a0800452/dishes.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221209%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221209T055022Z&X-Amz-Expires=86400&X-Amz-Signature=e1d566342a03684f6597072d68f0658386b898e5b315a59f66e834c901ae731f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22dishes.json%22&x-id=GetObject'

const timeToMinutes = (time) => {
  return +time.substring(0, 2) * 60 + +time.substring(3, 5)
}

const addCookTimetoDishes = (dishes, asrTimeInMinutes, maghribTimeInMinutes) => {
  dishes.forEach((dish) => {
    let relativeAsrTimeInMinutes = maghribTimeInMinutes - 15 - dish.duration - asrTimeInMinutes
    dish.cooktime =
      relativeAsrTimeInMinutes > 0
        ? `${relativeAsrTimeInMinutes} minutes after Asr`
        : `${-relativeAsrTimeInMinutes} minutes before Asr`
    delete dish.duration
  })
}

router.get('/cooktime', (req, res) => {
  // 'https://aladhan.com/prayer-times-api'

  const ingredient = req.query.ingredient
  const day = req.query.day

  let dishes = [].find
  let possibleDishes = []

  // if (!ingredient || isNaN(+day)) return

  try {
    getPrayerTimesByDay(day)
      .then(({ Maghrib: maghribTime, Asr: asrTime }) => {
        let maghribTimeInMinutes = timeToMinutes(maghribTime)
        let asrTimeInMinutes = timeToMinutes(asrTime)

        getAllDishes()
          .then((dishesResponse) => {
            dishes = dishesResponse.data
            dishes.forEach((element) => {
              if (element.ingredients.some((el) => el.toLowerCase() === ingredient.toLowerCase())) {
                let relativeAsrTimeInMinutes = maghribTimeInMinutes - 15 - element.duration - asrTimeInMinutes
                possibleDishes.push({
                  name: element.name,
                  ingredients: element.ingredients,
                  cooktime:
                    relativeAsrTimeInMinutes > 0
                      ? `${relativeAsrTimeInMinutes} minutes after Asr`
                      : `${-relativeAsrTimeInMinutes} minutes before Asr`,
                })
              }
            })
            console.log(possibleDishes)
            return { dishes, possibleDishes }
          })
          .then((data) => res.json(data.possibleDishes))
          .catch((error) => res.status(400).send({ message: `Error: please enter valid info | ${error.message}` }))
      })
      .catch((error) => res.status(400).send({ message: `Error: please enter valid info | ${error.message}` }))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }

  // console.log(`Hi from cooktime | ingredient: ${req.query.ingredient} day: ${req.query.day}`)
})

router.get('/suggest', (req, res) => {
  const day = req.query.day
  try {
    getPrayerTimesByDay(day)
      .then(({ Maghrib: maghribTime, Asr: asrTime }) => {
        let maghribTimeInMinutes = timeToMinutes(maghribTime)
        let asrTimeInMinutes = timeToMinutes(asrTime)

        getAllDishes()
          .then((dishesResponse) => {
            let dishes = []
            dishes = dishesResponse.data
            addCookTimetoDishes(dishes, asrTimeInMinutes, maghribTimeInMinutes)
            return dishes.at(Math.random() * dishes.length)
          })
          .then((data) => res.json(data))
          .catch((error) => res.status(400).send({ message: `Error: please enter valid info | ${error.message}` }))
      })
      .catch((error) => res.status(400).send({ message: `Error: please enter valid info | ${error.message}` }))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }

  console.log('Hi from suggest')
})

const getAllDishes = () => {
  return new Promise((resolve, reject) =>
    axios
      .get(dishesSource)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  )
}
const getPrayerTimesByDay = (day) => {
  try {
    return new Promise((resolve, reject) =>
      axios
        .get(prayerTimesApiRamadan)
        .then((response) => resolve(response.data.data[day].timings))
        .catch((error) => reject(error))
    )
  } catch (error) {}
}

router.get('/axios', (req, res) => {
  // getAllDishes().then((data) => console.log(data.data))
  getPrayerTimesByDay(req.query.day).then((data) => console.log(data))
  console.log('Hi from axios')
})

router.get('/getPrayerTimes', (req, res) => {
  try {
    const currentDate = new Date()
    const currentDay = currentDate.getDate()
    const currentMonth = String(currentDate.getUTCMonth() + 1).padStart(2, '0')
    const currentYear = currentDate.getUTCFullYear()
    // console.log(currentDay)

    axios
      .get(
        `http://api.aladhan.com/v1/calendarByCity?city=Mecca&country=Saudi Arabia&method=1&month=${currentMonth}&year=${currentYear}`
      )
      .then((response) => {
        // console.log(response.data.data[currentDay - 1].timings)
        res.json(response.data.data[currentDay - 1].timings)
        return response.data.data[currentDay - 1].timings
      })
      .catch((error) => res.status(400))
  } catch (error) {}
})
export default router
