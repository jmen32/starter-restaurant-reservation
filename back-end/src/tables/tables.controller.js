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
  const {reservation_id} = req.body.data
  const reservation = await service.readReservation(reservation_id)
  if(reservation){
    res.locals.reservation = reservation
    return next()
  }else {
    return next({
      status: 404,
      message: `${reservation_id}`
    })
  }
}

async function tableExists(req, res, next){
  const { table_id } = req.params
  const table = await service.readTable(table_id)
  if(table){
    res.locals.table = table
    return next()
  } else {
    return next({
      status: 404,
      message: `table ${table_id} not found`
    })
  }
}

async function validSeatResBody(req, res, next){
  const data = req.body.data
  if(!data){
    return res.status(400).json({error: "Reservation seating must contain all necessary data."})
  }
  next()
}

async function validReservationId(req, res, next){
  const {reservation_id} = req.body.data
  if(!reservation_id){
    return res.status(400).json({error: "Reservation is missing reservation_id"})
  }
  next()
}

async function tableCapacity(req, res, next){
  const reservation = res.locals.reservation
  const table = res.locals.table
  if(table.capacity >= reservation.people){
    return next()
  } else {
      return next({status: 400,
      message: "reservation size is greater than table capacity"
      })
    }
}

async function tableAvailability(req, res, next){
  const table = res.locals.table
  if(table.reservation_id){
    return next({
      status:400,
      message:'Table is already occupied'
    })
  }
  next()
}

async function tableIsNotBar(req, res, next){
  const table = res.locals.table
  if(!table.table_name.includes("Bar") ){
    return next()
  }else {
    return next({
      status: 400,
      message: "Bar seats cannot be occupied by reservations"
    })
  }
}

async function tableIsNotOccupied(req, res, next){
  const table = res.locals.table
  if(table.reservation_id){
    return next();
  }else{
    next({
      status:400,
      message: "table selected is not occupied by a reservation"
    })
  }
}

async function reservationIsSeated(req, res, next){
  const reservation = res.locals.reservation
  if(reservation.status !== "seated"){
    return next();
  }else{
    next({
      status: 400,
      message: 'This table has already been seated'
    })
  }
}

async function list(req, res, next){
  const data = await service.list();
  res.json({data})
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };
  const updatedReservation = {
    ...res.locals.reservation,
    status: "seated"
  }
  const data = await service.update(updatedTable, updatedReservation);
  res.json({ data });
}

async function findReservation(req, res, next) {
  const reservation_id = res.locals.table.reservation_id;
  const reservation = await service.readReservation(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `reservation ${reservation_id} not found` });
}

async function destroy(req, res){
  const table = res.locals.table;
  const updatedTable = {
    ...table,
    reservation_id: null,
  };
  const updatedReservation = {
    ...res.locals.reservation,
    reservation_id: res.locals.reservation.reservation_id,
    status: "finished",
  }
  const data = await service.update(updatedTable, updatedReservation);
  res.json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(validateBody),
    asyncErrorBoundary(create)],

  update: [ 
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(validSeatResBody),
    asyncErrorBoundary(validReservationId),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(reservationIsSeated),
    asyncErrorBoundary(tableCapacity),
    asyncErrorBoundary(tableIsNotBar),
    asyncErrorBoundary(tableAvailability),
    asyncErrorBoundary(update)],

  delete: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableIsNotOccupied),
    asyncErrorBoundary(findReservation),
    asyncErrorBoundary(destroy)
  ]
};
