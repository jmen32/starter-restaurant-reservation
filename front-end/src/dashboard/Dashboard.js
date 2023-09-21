import React, { useEffect, useState } from "react";
import { listReservations, listTables, updateReservationStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "../reservations/ReservationCard";
import DashButtons from "./DashButtons";
import TableCard from "../tables/TableCard";
import { useHistory, Link }  from "react-router-dom"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [tables, setTables] = useState([])
  let history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null)

    Promise.all([
      listReservations({ date }, abortController.signal),
      listTables(abortController.signal)
    ])
    .then(([reservationsData, tablesData]) => {
        setReservations(reservationsData);
        setTables(tablesData);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return;
        }
        // Check which API call caused the error and update the corresponding error state
        if (error.source === 'reservations') {
          setReservationsError(error);
        } else if (error.source === 'tables') {
          setTablesError(error);
        }
      });
    return () => abortController.abort();
  }

const handleCancel = async (event, reservationId) => {
  event.preventDefault();
  try {
    const message = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
    if (message) {
      const updatedReservation = reservations.find(res => res.reservation_id === reservationId);
      
      if (updatedReservation) {
        const updatedReservationWithStatus = {
          ...updatedReservation,
          status: "cancelled"
        };
        await updateReservationStatus(updatedReservationWithStatus);
        const updatedReservations = reservations.map(res => {
          if (res.reservation_id === reservationId) {
            return updatedReservationWithStatus;
          }
          return res;
        });
        setReservations(updatedReservations);
        history.push(`/reservations?date=${date}`)
      }
    }
  } catch (error) {
    console.error(error);
  }
};

  if(reservations.length > 0){
    return(
      <main>
        <h1>Dashboard</h1>
        <br/>
        <h4 className="mb-3">Reservations for {date}</h4>
        <div><DashButtons date={date}/></div>
        <br/>
        <div className="reservations d-flex mb-3 p-2">
          {reservations.map((reservation) => (
            reservation.status !== "cancelled" && (
            <div className="m-2" key={reservation.reservation_id}>

            <ReservationCard reservation={reservation}/>

            {/* displays seat button only for "booked" reservations */}
            {reservation && reservation.status === 'booked' &&(
              <Link to={`/reservations/${reservation.reservation_id}/seat`}><button type='submit'>Seat</button></Link>
            )}

            {/* displays Edit button */}
              <Link to={`/reservations/${reservation.reservation_id}/edit`}><button type='submit'>Edit</button></Link>

            {/* displays cancel button */}
            <button
            type="submit"
            onClick={(event) =>
              handleCancel(event, reservation.reservation_id)
            }
            data-reservation-id-cancel={reservation.reservation_id}
            >
            Cancel
            </button>
          </div>
          )
          ))}
        </div>
        <div className="tables p-2 mb-3">
          <h4>Tables</h4>
          {tables.map((table) => (
            <TableCard key={table.table_id} table={table} reservations={reservations}/>
          ))}
        </div>
        <ErrorAlert error={reservationsError} />
        <ErrorAlert error={tablesError} />
      </main>
    )
  }

  if(!reservations.length){
    return(
    <main>
      <h1>Dashboard</h1>
      <div>
        <div className="d-md-flex mb-3">
        <h4 className="mb-0">There are currently no reservations for: {date}</h4>
        </div>
        <DashButtons date={date}/>
        <div className="restaurant-tables p-2">
        <h4>Tables</h4>
            {tables.map((table) => (
            <TableCard key={table.table_id} table={table} reservations={reservations}/>
          ))}
          </div>
      </div>
        <ErrorAlert error={reservationsError} />
        <ErrorAlert error={tablesError} />
    </main>
    
    )
  }
}

export default Dashboard;
