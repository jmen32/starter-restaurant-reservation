import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readReservation, updateReservation } from '../utils/api';
import ReservationsForm from './ReservationsForm';
import ErrorAlert from '../layout/ErrorAlert';

export default function EditReservationForm() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [reservation, setReservation] = useState('')
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReservation(){
      const data = await readReservation(reservation_id)
      setReservation(data)
    }
    loadReservation();
  }, [reservation_id]);

  console.log("reservation//////", reservation)

  const handleChange = ({target}) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }

const handleSubmit = (event) => {
  event.preventDefault();

  updateReservation({ ...formData, reservation_id: reservation_id })
    .then(() => history.push(`/dashboard`))
    .catch((error) => setError(error));
};

  return (
    <div>
      <h1>Edit Reservation</h1>
      {error && <ErrorAlert error={error} />}

        <ReservationsForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onCancel={() => history.push('/dashboard')}
      />

    </div>
  );
}
