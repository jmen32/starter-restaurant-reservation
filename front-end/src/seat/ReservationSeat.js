import React, {useState, useEffect} from 'react'
import { listTables, updateTable } from '../utils/api'
import { useHistory, useParams } from 'react-router-dom';

export default function ReservationSeat({date}) {
  const [tables, setTables] = useState([])
  const [assignTable, setAssignTable] = useState('')

  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    async function LoadTables(){
      const tablesData = await listTables()
      setTables(tablesData)
    }
    LoadTables()
  }, [date])

  // console.log(assignTable)

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateTable(assignTable.table_id, reservation_id, assignTable)
    history.push('/')
  }

  console.log("here", assignTable.table_id)

  const handleCancel = () => {
    history.go(-1)
  }

  console.log("This reservation ID: ", reservation_id)

  return (
    <div>
      <form>
        <label  htmlFor='table_id'> 
            Assign this reservation to table number: 
            <select
                className='form-control'
                id='table_id'
                name='table_id'
                onChange={(event) => setAssignTable(event.target.value)}
                value={assignTable}
                >
                    {tables.map((table) => (
                    <option key={table.table_id} value={table.table_id}>
                    {`${table.table_name} - ${table.capacity}`}
                    </option>
                    ))}
            </select>
        </label>
        <br />
        <button 
        type="submit"
        onClick={handleSubmit}
        >
            Submit
        </button>
        <button 
        type="button" 
        onClick={handleCancel}>
            Cancel
        </button>
      </form>
    </div>
  )
}
