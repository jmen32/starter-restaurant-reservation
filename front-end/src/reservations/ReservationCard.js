import React from 'react'

export default function ReservationCard({reservation}) {
    console.log(reservation)
  return (
    <div>
      <br />
      <h5>{reservation.last_name}
      , {reservation.first_name} 
      : {reservation.reservation_date}
      </h5>
    </div>
  )
}
