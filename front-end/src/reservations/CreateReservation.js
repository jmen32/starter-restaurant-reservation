import React from 'react'
import ReservationsForm from './ReservationsForm'
import { createReservation } from '../utils/api';
import { useHistory } from 'react-router-dom';
import { formatAsDate } from '../utils/date-time';
import ErrorAlert from '../layout/ErrorAlert'

export default function CreateReservation() {

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
    <div>
      <h1>Create new reservation</h1>
      <ReservationsForm 
      handleChange={handleChange}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      />
    </div>
  )
}
