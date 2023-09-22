import React from 'react';
import { useHistory } from 'react-router-dom'
import { removeTableReservation } from '../utils/api';

export default function TableCard({ table, reservations }) {

  let history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    const message = window.confirm("Is this table ready to seat new guests? This cannot be undone.")
    if(message){
      await removeTableReservation(table.table_id)
      history.go(-1)
    }
    }catch(error){
      console.error(error)
    }
  }

  
return (
  <div className="card">
    <div className="card-header">
      {table.table_name}
    </div>
    <div className="card-body">
      <h5 className="card-title">Reservation ID: {table.reservation_id}</h5>
      {reservations.map((reservation) => (
        reservation.reservation_id === table.reservation_id && (
          <p key={reservation.reservation_id} className="card-text">
            Party Name: {reservation.last_name}, {reservation.first_name}
          </p>
        )
      ))}
      <div data-table-id-status={`${table.table_id}`}>
        {reservations.map((reservation) => (
          reservation.reservation_id === table.reservation_id && (
            <p key={reservation.reservation_id} className="card-text">
              {table.reservation_id ? `Party Size: ${reservation.people}` : `Capacity: ${table.capacity}`}
              <br />
              {table.reservation_id ? "Occupied" : "Free"}
            </p>
          )
        ))}
        <br/> 
      </div>
      <div>
        {table.reservation_id ? <button onClick={handleSubmit} data-table-id-finish={`${table.table_id}`}
        >Finish</button> : null}
      </div>
    </div>
  </div>
);
}