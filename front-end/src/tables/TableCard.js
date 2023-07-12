import React from 'react'

export default function TableCard({table}) {
  return (
    <div>
      <br />
      <h5>{table.table_name}
      , {table.capacity}
      </h5>
    </div>
  )
}
