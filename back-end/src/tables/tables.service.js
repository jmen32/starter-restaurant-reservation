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
async function update(updatedTable, updatedReservation) {
    try{
    const trx = await knex.transaction();
    const updatedTableRecord = await trx("tables")
        .select("*")
        .where({"table_id": updatedTable.table_id})
        .update(updatedTable, "*")
        .then(updatedRecords => updatedRecords[0])

    const updatedReservationRecord = await trx("reservations")
        .select("*")
        .where({"reservation_id": updatedReservation.reservation_id})
        .update(updatedReservation, "*")
        .then(updatedResRecords => updatedResRecords[0]);
    
    await trx.commit()
    return{updatedTableRecord, updatedReservationRecord}
    }catch(error){
        await trx.rollback();
        console.error(error)
    }
}

module.exports = {
    readTable,
    readReservation,
    update,
    create,
    list,
}