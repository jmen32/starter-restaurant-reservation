import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import TableForm from './TableForm'
import { createTable } from '../utils/api'

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
      setError(error.message)
    }
  }

  const handleCancel = () => {
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
      <h1>Assign Table</h1>
      <TableForm 
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      tableData={tableData}
      />
    </div>
  )
}
