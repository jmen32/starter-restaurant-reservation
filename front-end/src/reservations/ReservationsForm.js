import React from 'react'
import './Reservations.css'

export default function ReservationsForm({ reservation, handleChange, handleCancel, handleSubmit}) {

  return (

    <form onSubmit={handleSubmit}>
      <div className='form-group'>
      <label htmlFor="first_name">
        First Name:
        <input 
          className="form-control"
          name="first_name"
          type="text"
          id="first_name"
          value={reservation.first_name}
          onChange={handleChange}
          autoComplete='name'
          required
        />
      </label>
      </div>

    <div className='form-group'>
    <label htmlFor="last_name">
        Last Name:
        <input 
          className="form-control"
          name="last_name"
          type="text"
          id="last_name"
          value={reservation.last_name}
          onChange={handleChange}
          required
        />
      </label>
    </div>

    <div className='form-group'>
      <label htmlFor="mobile_number">
        Mobile Number:
        <input 
          className="form-control"
          name="mobile_number"
          type="tel"
          pattern='xxx-xxx-xxxx'
          id="mobile_number"
          value={reservation.mobile_number}
          onChange={handleChange}
          placeholder='555-555-5555'
          required
        />
      </label>
    </div>

    <div className='form-group'>
      <label htmlFor="reservation_date">
        Reservation Date:
        <input 
          className="form-control"
          name="reservation_date"
          type="date"
          id="reservation_date"
          value={reservation.reservation_date}
          onChange={handleChange}
          required
          placeholder="YYYY-MM-DD"
        />
      </label>
    </div>

    <div className='form-group'>
      <label htmlFor="reservation_time">
        Reservation Time:
        <input 
          className="form-control"
          name="reservation_time"
          type="time"
          id="reservation_time"
          value={reservation.reservation_time}
          onChange={handleChange}
          required
        />
      </label>
    </div>

    <div className='form-group'>
      <label htmlFor="people">
        People:
        <input 
          className="form-control"
          name="people"
          type="number"
          id="people"
          min="1"
          value={reservation.people}
          onChange={handleChange}
          required
        />
      </label>
      </div>

      <div className='form-group'>
      <button 
      type="submit"
      className="btn-lg btn-primary mr-2"
      onClick={handleSubmit}>
        Submit
      </button>

      <button 
      type="button"
      className="btn-lg btn-secondary mr-2"
      onClick={handleCancel}>
        Cancel  
      </button>
      </div>
    </form>
  )
}
