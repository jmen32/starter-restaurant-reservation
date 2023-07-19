import React, { useState, useEffect } from 'react';
import { listTables, updateTable} from '../utils/api';
import { useHistory, useParams } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert'

export default function ReservationSeat() {
  const [tables, setTables] = useState([]);
  const [assignTable, setAssignTable] = useState({table_id: ''});
  const { reservation_id } = useParams();
    const [error, setError] = useState(null)

  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      const tablesData = await listTables();
      setTables(tablesData);
    }
    loadData();
  }, []);

const handleChange = ({target})=> {
  setAssignTable({...assignTable, [target.name]: target.value})
}

const handleSubmit = async (event) => {
  event.preventDefault();
    try {
        await updateTable(assignTable.table_id, reservation_id);
        history.push('/dashboard');
      } catch (error) {
        setError(error);
        console.log(error);
      }
  }


  const handleCancel = () => {
    history.go(-1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <ErrorAlert error={error} />}
        <label htmlFor="table_id">
          Assign this reservation to table number:
          <select
            name="table_id"
            id="table_id"
            value={assignTable.table_id}
            onChange={handleChange}
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