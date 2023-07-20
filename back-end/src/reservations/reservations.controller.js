/**
 * List handler for reservation resources
 */

const service = require('./reservations.service')
const { today } = require('../utils/date-time')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { json } = require('express');

async function validateBody(req, res, next){
  const { data: {first_name, last_name, mobile_number, reservation_date, reservation_time, people, status} = {}} = req.body

  if(!first_name || first_name === ""){
    return res.status(400).json({error: "Reservation must include a first_name"})
  }
  if(!last_name || last_name === ""){
    return res.status(400).json({error: "Reservation must include a last_name"})
  }
  if(!mobile_number || mobile_number === ""){
    return res.status(400).json({error: "Reservation must include a mobile_number"})
  }
  if(!reservation_date || reservation_date === "" || isNaN(Date.parse(reservation_date))){
    return res.status(400).json({error: "Reservation must include a reservation_date"})
  }
  const timeFormat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  if(!reservation_time || reservation_time === "" || !timeFormat.test(reservation_time)){
    return res.status(400).json({error: "Reservation must include a reservation_time"})
  }
  if(!people || people < 1 || !Number.isInteger(people)){
    return res.status(400).json({error:"Reservation must include a valid number of people"})
  }
  next();
}

async function validReservationDay(req, res, next) {
  const { data: {  reservation_date } = {} } = req.body;

  const reservationDate = new Date(reservation_date);
  const reservationDay = reservationDate.getDay(); //UTC 2
  console.log(reservationDay)

  if (reservationDay === 1) {
    return res.status(400).json({ error: "The restaurant is closed on Tuesdays" });
  } 
  if (reservation_date < today()) {
    return res.status(400).json({ error: "Reservation can only be made for current or future dates" });
  }
  next();
}

async function validReservationTime(req, res, next){
  const {data: {reservation_time} = {}} = req.body

  const hours = new Date().getHours()
  const minutes = new Date().getMinutes()
  const currentTime = `${hours}:${minutes}`
  console.log(currentTime)

  if(reservation_time < "10:30"){
    return res.status(400).json({error: "Restaurant opens at 10:30am"})
  }
  if(reservation_time >= "21:30"){
    return res.status(400).json({error: "Reservations must be made 60 minutes before restaurant closes"})
  }
  if(reservation_time >= currentTime){ //2pm
    return res.status(400).json({error: "Reservations can only be made for future days and times"})
  }
  next();
}

async function reservationExists(req, res, next){
  const { reservation_id } = req.params
  const reservation = await service.read(parseInt(reservation_id))
  if(reservation){
    res.locals.reservation = reservation
    return next()
  }else{
    next({
      status: 404,
      message: `Reservation ${reservation_id} cannot be found`
    })
  }
}

async function reservationStatus(req, res, next){
  const reservation = req.body.data
  console.log("//////////////////", reservation)
  if(reservation.status === "booked"){
    return next()
  }else{
    next({
      status: 400,
      message: `status is ${reservation.status}`
    })
  }
}

async function reservationIsFinished(req, res, next){
  const reservation = req.body.data
  if(reservation.status === 'seated' ||
  reservation.status === 'booked'){
    return next()
  }else{
    next({
      status: 400, 
      message: 'finished reservations cannot be updated'
    })
  }
}

async function read(req, res){
  const data = res.locals.reservation
  return res.status(200).json({data})
}

async function list(req, res) {
  const reservationsDate = req.query.date
  if(reservationsDate){
    const data = await service.list(reservationsDate)
    return res.json({
      data
    });
  }
  const data = await service.list(today())
  res.json({data})
}

async function create(req, res){
  const createdReservation = await service.create(req.body.data)
  res.status(201).json({data: createdReservation})
}

async function update(req, res) {
  const updatedData = await service.update(req.body.data);
  res.status(200).json({ data: updatedData });
}

module.exports = {
  read: [asyncErrorBoundary(reservationExists), read],
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(validateBody), 
    asyncErrorBoundary(validReservationDay),
    asyncErrorBoundary(validReservationTime),
    asyncErrorBoundary(reservationStatus),
    asyncErrorBoundary(create)
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(reservationStatus),
    asyncErrorBoundary(reservationIsFinished),
    asyncErrorBoundary(update)
  ]
};
