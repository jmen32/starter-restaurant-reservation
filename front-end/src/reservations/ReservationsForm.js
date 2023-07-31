import React, { useState } from 'react'
import { createReservation } from '../utils/api';
import { useHistory } from 'react-router-dom';
import { formatAsDate } from '../utils/date-time';
import ErrorAlert from '../layout/ErrorAlert'


export default function ReservationsForm() {
  
  const history = useHistory();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: '',
  })

  const [error, setError] = useState(null)

  //submit reservation callback for edit

  const handleCancel = (event) => {
    event.preventDefault()
    history.push("/dashboard")
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const reservationData = {
      ...formData,
      people: parseInt(formData.people),
    };

    createReservation(reservationData)
      .then((newReservation) =>
        history.push(`/dashboard?date=${formatAsDate(newReservation.reservation_date)}`)
      )
      .catch((error) => {
        setError(error);
      });
  };

  const handleChange = ({target}) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }

  return (

    <form onSubmit={handleSubmit}>

      {error && <ErrorAlert error={error} />}

      <label htmlFor="first_name">
        First Name:
        <input 
          className="form-control"
          name="first_name"
          type="text"
          id="first_name"
          value={formData.first_name}
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
          value={formData.last_name}
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
          value={formData.mobile_number}
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
          value={formData.reservation_date}
          onChange={handleChange}
          required
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
          value={formData.reservation_time}
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
          value={formData.people}
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
