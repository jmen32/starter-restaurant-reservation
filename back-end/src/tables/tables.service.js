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

function read(table_id){
    return knex('tables')
    .where({table_id: table_id})
    .first();
}

function update(updatedTable){
    return knex('tables')
    .select("*")
    .where({table_id: updatedTable.table_id})
    .update(updatedTable);
}

module.exports = {
    read,
    update,
    create,
    list,
}