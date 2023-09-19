import React from 'react'
import { formatAsTime } from '../utils/date-time'

export default function ReservationCard({reservation}) {

  function loadTime(time) {
    const resTime = formatAsTime(time);
    const [hours, minutes] = resTime.split(':');
    const timeAsNumber = Number(hours) * 60 + Number(minutes);

    if (timeAsNumber < 720) {
      // Before 12:00 PM
      return `${resTime} AM`;
    } else if (timeAsNumber === 720) {
      // 12:00 PM
      return `${resTime} PM`;
    } else {
      // After 12:00 PM
      const pmHours = Number(hours) - 12;
      const pmTime = `${pmHours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      return `${pmTime} PM`;
    }
  }

  return (
    <div className="card my-2">
      <div className="card-header"
      data-reservation-id-status={reservation.reservation_id}>
        status: {reservation.status}
      </div>
      <div className="card-body">
        <h6 className="card-title">Reservation Details: </h6>
        <p>Name: {reservation.last_name}, {reservation.first_name}</p>
        <p>Party Size: {Number(reservation.people)}</p>
        <p>Date: {reservation.reservation_date}</p>
        <p>Time: {loadTime(reservation.reservation_time)}</p>
        <p>Mobile Number: {reservation.mobile_number}</p>
      </div>
    </div>
  )
}
