const knex = require('../db/connection')

function read(reservationId){
    return knex('reservations')
    .select("*")
    .where({"reservation_id": reservationId })
    .first();
}

function list(reservationsDate){
    return knex('reservations')
    .select("*")
    .where({'reservation_date': reservationsDate})
    .orderBy('reservation_time')
}

function create(newReservation){
    return knex('reservations')
    .insert(newReservation)
    .returning("*")
    .then(createdReservation => createdReservation[0])
}

function update(updatedReservation){
    return knex('reservations')
    .select("*")
    .where({"reservation_id": updatedReservation.reservation_id})
    .update(updatedReservation, "*")
}

module.exports = {
    read,
    list,
    create,
    update,
}