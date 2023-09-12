import React from 'react'

export default function TableForm({tableData, handleSubmit, handleCancel, handleChange}) {
  return (
    <form onSubmit={handleSubmit}>

      <div className='form-group'>
        <label htmlFor="table_name">
        Table Name:
        <input 
            className="form-control"
            name="table_name"
            type="text"
            id="table_name"
            minLength='2'
            value={tableData.table_name}
            onChange={handleChange}
            required
        />
        </label>
      </div>

      <div className='form-group'>
      <label htmlFor="capacity">
        capacity:
        <input 
          className="form-control"
          name="capacity"
          type="number"
          id="capacity"
          min="1"
          value={tableData.capacity}
          onChange={handleChange}
          required
        />
      </label>
      </div>

      <button 
      type="submit"
      className="btn-lg btn-primary mr-2"
      onClick={handleSubmit}>
        Submit
      </button>

      <button 
      type="button"
      className="btn-lg btn-secondary mr-2"
      onClick={handleCancel}>
        Cancel  
      </button>
    </form>
  )
}
