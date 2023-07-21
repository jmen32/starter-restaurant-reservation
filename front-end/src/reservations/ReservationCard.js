import React from 'react'

export default function ReservationCard({reservation}) {
  return (
    <div>
      <br />
      <h5>{reservation.last_name}
      , {reservation.first_name} 
      : {reservation.reservation_date}
      <br />
      status: {reservation.status}
      </h5>
    </div>
  )
}
