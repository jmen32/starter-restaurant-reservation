import React from 'react';
import { removeTableReservation } from '../utils/api';

export default function TableCard({ table, reservations }) {

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    const message = window.confirm("Is this table ready to seat new guests? This cannot be undone.")
    if(message){
      await removeTableReservation(table.table_id)
      window.location.reload()
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
          {table.reservation_id ? `Party Size: ${table.reservation_id}` : `Capacity: ${table.capacity}`}
          <br/>
          {table.reservation_id ? "Occupied" : "Free"} 
        </div>
        <div>
          {table.reservation_id ? <button onClick={handleSubmit}>Finish</button> : null}
        </div>
      </div>
    </div>
  );
}