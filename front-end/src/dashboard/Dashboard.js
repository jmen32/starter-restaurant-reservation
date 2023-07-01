import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "../reservations/ReservationCard";
import DashButtons from "./DashButtons";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  if(reservations.length > 0){
    return(
      <main>
        <h1>Dashboard</h1>
        <div>
          <h4>reservation list</h4>
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.reservation_id} reservation={reservation}/>
          ))}
          <DashButtons date={date}/>
        </div>
      </main>
    )
  }

  if(!reservations.length){
    return(
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">

        <h4 className="mb-0">there are no reservations for date</h4>
        <DashButtons date={date}/>
      </div>
    </main>
    )
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
