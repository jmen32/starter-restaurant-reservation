import React from 'react'

export default function ReservationsForm({ reservation, handleChange, handleCancel, handleSubmit}) {

  return (

    <form onSubmit={handleSubmit}>

      <label htmlFor="first_name">
        First Name:
        <input 
          className="form-control"
          name="first_name"
          type="text"
          id="first_name"
          value={reservation.first_name}
          onChange={handleChange}
          required
        />
      </label>
      <br />

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
      <br />

      <label htmlFor="mobile_number">
        Mobile Number:
        <input 
          className="form-control"
          name="mobile_number"
          type="phone"
          id="mobile_number"
          value={reservation.mobile_number}
          onChange={handleChange}
          required
        />
      </label>
      <br />

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
      <br />

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
      <br />

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
      <br />

      <button 
      type="submit"
      className="btn btn-primary mr-2"
      onClick={handleSubmit}>
        Submit
      </button>

      <button 
      type="button"
      className="btn btn-secondary mr-2"
      onClick={handleCancel}>
        Cancel  
      </button>
    </form>
  )
}
