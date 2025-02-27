import React, { useState } from 'react'
import { Link } from 'react-router-dom';
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
            <div className='form-group'>
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
            </div>
            <button className="btn-lg btn-primary" onClick={handleSubmit} type="submit">Find</button>

        <hr />
        <h3>reservations</h3>

        {reservations.length ? 
        <div>
        {reservations.map((reservation) => (
            <div key={reservation.reservation_id}>
            <ReservationCard reservation={reservation}/>
            {/* displays Edit button */}
                <Link to={`/reservations/${reservation.reservation_id}/edit`}><button type='submit'>Edit</button></Link>
            </div>
        ))}
        </div>
        :
        <h5>No reservations found</h5>
        }
        </form>
    )
}
