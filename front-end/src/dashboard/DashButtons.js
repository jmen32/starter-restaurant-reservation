import React, { useState } from 'react'
import { previous, next, today } from '../utils/date-time'
import { useHistory } from 'react-router-dom';

export default function DashButtons({date}) {
    const [currentDate, setCurrentDate] = useState(date)

    const history = useHistory()

    const previousHandler = (event) => {
        event.preventDefault()
        history.push(`/dashboard?date=${previous(currentDate)}`)
        setCurrentDate(previous(currentDate))
        console.log(currentDate)
    }

    const todayHandler = (event) => {
        event.preventDefault();
        history.push(`/dashboard?date=${today()}`)
        setCurrentDate(today())
    }

    const NextHandler = (event) => {
        event.preventDefault()
        history.push(`/dashboard?date=${next(currentDate)}`)
        setCurrentDate(next(currentDate))
        console.log(currentDate)
    }

// console.log(today())
// console.log(previous(today()))
// console.log(next(today()))

  return (
    <div>
      <button onClick={previousHandler}>
        Previous
      </button>

      <button onClick={todayHandler}>
        Today
      </button>
      
      <button onClick={NextHandler}>
        Next
      </button>
    </div>
  )
}
