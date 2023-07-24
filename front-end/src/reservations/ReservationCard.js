import React from 'react'
import { formatAsTime } from '../utils/date-time'

export default function ReservationCard({reservation}) {

  const resTime = formatAsTime(reservation.reservation_time)

  return (
    <div className="card" style={{width: "16rem"}}>
      <div className="card-header"
      data-reservation-id-status={reservation.reservation_id}>
        status: {reservation.status}
      </div>
      <div className="card-body">
        <h6 className="card-title">Reservation Details: </h6>
        <p>Name: {reservation.last_name}, {reservation.first_name}</p>
        <p>Party Size: {reservation.people}</p>
        <p>Date: {reservation.reservation_date}</p>
        <p>Time: {resTime}</p>
      </div>
    </div>
  )
}
