import React from 'react'

export default function ReservationCard({reservation}) {
    console.log(reservation)
  return (
    <div>
      <h4>{reservation.first_name}</h4>
    </div>
  )
}
