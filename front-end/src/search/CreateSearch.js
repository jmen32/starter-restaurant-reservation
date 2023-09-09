import React, { useState } from 'react'
import { listReservations } from '../utils/api'
import ReservationCard from '../reservations/ReservationCard.js'

export default function CreateSearch() {
    const [reservations, setReservations] = useState([])
    const [mobile_number, setMobileNumber] = useState('')

    const handleChange = ({target}) => {
        setMobileNumber(target.value)
    }

    const handleSubmit = async (event) => {
        try{
            event.preventDefault();
            const filteredReservations = await listReservations({mobile_number})
            setReservations(filteredReservations)
            setMobileNumber(''); 
        }catch(error){
            console.error(error)
    }
}

    return (
        <form>
            <h1>Search</h1>
            <label htmlFor="search">Search :  
            <input 
                name="mobile_number"
                className='form-control'
                placeholder="Enter a customer's phone number"
                id='search'
                value={mobile_number}
                onChange={handleChange}
                type='phone' 
                required
            /> 
            </label>
            <button onClick={handleSubmit} type="submit">Find</button>

        <h3>reservations</h3>

        {reservations.length ? 
        <div>
        {reservations.map((reservation) => (
            <div key={reservation.reservation_id}>
            <ReservationCard reservation={reservation}/>
            {/* displays Edit button */}
                <button type='submit'><a href={`/reservations/${reservation.reservation_id}/edit`}>Edit</a></button>
            </div>
        ))}
        </div>
        :
        'No reservations found'
        }
        </form>
    )
}
