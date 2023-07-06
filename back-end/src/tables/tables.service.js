const knex = require('../db/connection')

function read(reservationId){
    return knex('tables')
    .select('*')
    .where({table_id: reservationId })
    .first();
}

// function list(reservationsDate){
//     return knex('reservations')
//     .select("*")
//     .where({'reservation_date': reservationsDate})
//     .orderBy('reservation_time')
// }

module.exports = {
    read,
    list,
    create,
}