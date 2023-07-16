import React from 'react'

export default function TableCard({table}) {
  return (
    <div>
      <br />
      <card>
      <h5>{table.table_name}
      , {table.capacity}
      </h5>
      </card>
    </div>
  )
}
