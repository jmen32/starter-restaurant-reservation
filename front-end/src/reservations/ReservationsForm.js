import React, {useState} from 'react'
import { createReservation } from '../utils/api';
import { useHistory } from 'react-router-dom';

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

  //submit reservation callback for edit

  const handleCancel = (event) => {
    history.push("/")
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formData))
    createReservation(formData)
    // logic
  }

  const handleChange = ({target}) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
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
          id="first_name"
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
          type="tel"
          id="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label htmlFor="reservation_date">
        Reservation Time:
        <input 
          className="form-control"
          name="reservation_date"
          type="text"
          id="reservation_date"
          value={formData.reservation_date}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label htmlFor="reservation_time">
        First Name:
        <input 
          className="form-control"
          name="reservation_time"
          type="text"
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
      type="button"
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
