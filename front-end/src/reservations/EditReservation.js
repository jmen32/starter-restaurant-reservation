import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readReservation, updateReservation } from '../utils/api';
import ReservationsForm from './ReservationsForm';
import ErrorAlert from '../layout/ErrorAlert';
import formatReservationDate from '../utils/format-reservation-date';
import formatReservationTime from '../utils/format-reservation-time'

export default function EditReservationForm() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [reservation, setReservation] = useState({
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
      try{
      const data = await readReservation(reservation_id)
      const formatResDate = formatReservationDate(data);
      const formattedResTime = formatReservationTime(formatResDate)
      setReservation(formattedResTime)
      }catch(error){
        setError(error)
      }
    }
    loadReservation();
  }, [reservation_id]);


  const handleCancel = () => {
    history.go(-1)
  }

  const handleChange = ({target}) => {
    setReservation({
      ...reservation,
      [target.name]: target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    updateReservation({ ...reservation, people: Number(reservation.people), })
      .then(() => history.push(`/dashboard?date=${reservation.reservation_date.slice(0, 10)}`))
      .catch((error) => setError(error));
  };

  return (
    <div>
      <h1>Edit Reservation</h1>
      {error && <ErrorAlert error={error} />}

        <ReservationsForm
        reservation={reservation}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />

    </div>
  );
}
