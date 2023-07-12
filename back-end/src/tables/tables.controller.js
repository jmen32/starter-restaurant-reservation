/**
 * List handler for reservation resources
 */

const service = require('./tables.service')
const { today } = require('../utils/date-time')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { json } = require('express');

async function validateBody(req, res, next){
  const {data: {table_name, capacity} = {}} = req.body
  if(!table_name){
    return res.status(400).json({error: "table assignment must contain table_name"})
  }
  if(table_name.length < 2){
    return res.status(400).json({error: "table_name must have 2 or more characters"})
  }
  if(!capacity){
    return res.status(400).json({error: "table assignment must contain valid capacity"})
  }
  if(typeof capacity !== "number"){
    return res.status(400).json({error: "table capacity must be a valid number"})
  }
  next()
}

async function reservationExists(req, res, next){
  const {reservation_id} = res.params
  const reservation = await service.readReservation(reservation_id)
  if(reservation){
    res.locals.reservation = reservation
    return next()
  }else {
    return next({
      status: 404,
      message: "reservation not found"
    })
  }
}

async function tableExists(req, res, next){
  const { table_id } = res.params
  const table = await service.readTable(table_id)
  if(table){
    res.locals.table = table
    return next()
  } else {
    return next({
      status: 404,
      message: "table not found"
    })
  }
}

async function list(req, res, next){
  const data = await service.list();
  res.json({data})
}

async function create(req, res){
  const { data: {table_name, capacity} = {}} = req.body
  const newTable = {
    table_name,
    capacity,
  }
  const createdTable = await service.create(newTable)
  res.status(201).json({data: createdTable})
}

async function update(req, res){
  const updatedtable = {...res.locals.data,
  table_id: res.locals.table.table_id
  }
  const data = await service.update(updatedtable)
  res.json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(validateBody), 
    asyncErrorBoundary(create)],

  update: [ 
    asyncErrorBoundary(tableExists), 
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(update)]
};
