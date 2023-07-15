const knex = require('../db/connection')



function list(){
    return knex('tables')
    .select("*")
    .orderBy("table_name")
}

function create(newTable){
    return knex('tables')
    .insert(newTable)
    .returning("*")
    .then(createdTable => createdTable[0])
}

function readTable(table_id){
    return knex('tables')
    .select("*")
    .where({table_id: table_id})
    .first();
}

function readReservation(reservation_id){
    return knex('reservations')
    .select("*")
    .where({reservation_id})
    .first();
}

// check implementation
function update(table_id, reservation_id){
    return knex('tables')
    .select("*")
    .where({table_id})
    .update({reservation_id})
}

module.exports = {
    readTable,
    readReservation,
    update,
    create,
    list,
}