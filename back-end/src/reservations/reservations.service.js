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
    .whereNot('status', 'finished')
    .orderBy('reservation_time')
}

function create(newReservation){
    return knex('reservations')
    .insert(newReservation)
    .returning("*")
    .then(createdReservation => createdReservation[0])
}

function updateRes(reservation){
    return knex('reservations')
    .select("*")
    .where({"reservation_id": reservation.reservation_id})
    .update(reservation, "*")
    .returning("*")
    .then(updatedReservation => updatedReservation[0])
}

function updateStatus(reservation_id, status) {
    return knex('reservations')
    .where({ reservation_id })
    .update({ status }, '*')
    .then(updatedReservation => updatedReservation[0]);
}

function search(mobile_number) {
    return knex("reservations")
    .whereRaw(
    "translate(mobile_number, '() -', '') like ?",
    `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
    read,
    list,
    create,
    updateRes,
    search,
    updateStatus,
}