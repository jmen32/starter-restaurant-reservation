import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import TableForm from './TableForm'
import { createTable, listTables } from '../utils/api'
// import { today } from '../utils/date-time'
import ErrorAlert from '../layout/ErrorAlert'

export default function CreateTable() {
  const [tableData, setTableData] = useState({
    table_name: "",
    capacity: "",
  })
  const [error, setError] = useState('')

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    await createTable(tableData)
    history.push('/dashboard')
    } catch(error){
      setError(error)
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    history.go(-1)
  }

  const handleChange = ({target}) => {
    setTableData({
      ...tableData,
      [target.name]: target.value
    })
  }

  return (
    <div>
      <h1>Add Table</h1>
      {error && <ErrorAlert error={error} />}
      <TableForm 
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      tableData={tableData}
      />
    </div>
  )
}
