import React, { useState, useEffect } from 'react';
import { listTables, updateTable, listReservations } from '../utils/api';
import { useHistory, useParams } from 'react-router-dom';
import { today } from '../utils/date-time';

export default function ReservationSeat() {
  const [tables, setTables] = useState([]);
  const [assignTable, setAssignTable] = useState('');
  const [reservations, setReservations] = useState([]);
  const { reservation_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      const tablesData = await listTables();
      const reservationsData = await listReservations(today());
      setTables(tablesData);
      setReservations(reservationsData);
    }
    loadData();
  }, []);

const handleSubmit = async (event) => {
  event.preventDefault();

  const selectedTable = tables.find((table) => table.table_id === parseInt(assignTable, 10));
  const reservation = reservations.find((res) => res.reservation_id === parseInt(reservation_id, 10));

  if (selectedTable && reservation) {
    if (reservation.people <= selectedTable.capacity) {
      await updateTable(selectedTable.table_id, reservation.reservation_id);
      history.push('/dashboard');
    }
  }
};

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_id">
          Assign this reservation to table number:
          <select
            name="table_id"
            id="table_id"
            value={assignTable}
            onChange={(event) => setAssignTable(event.target.value)}
            required
          >
            <option value="">Select a table</option>
            {tables.map((table) => (
              <option key={table.table_id} value={table.table_id}>
                {`${table.table_name} - ${table.capacity}`}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}