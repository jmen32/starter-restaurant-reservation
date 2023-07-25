/**
 * List handler for reservation resources
 */

const service = require('./reservations.service')
const { today } = require('../utils/date-time')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { json } = require('express');

async function validateBody(req, res, next){
  const { data: {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = {}} = req.body

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
  console.log({reservation_date})

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
  const {data: {reservation_date, reservation_time} = {}} = req.body

  //parseInt remove : 

  //new UTCDate
  const hours = new Date().getHours()
  const minutes = new Date().getMinutes()
  const currentTime = `${hours}:${minutes}`
  console.log(typeof currentTime)
  console.log(reservation_time, ">", currentTime)

  if(reservation_time < "10:30"){
    return res.status(400).json({error: "Restaurant opens at 10:30am"})
  }
  if(reservation_time >= "21:30"){
    return res.status(400).json({error: "Reservations must be made 60 minutes before restaurant closes"})
  }
  if(reservation_date === today() && reservation_time >= currentTime){ //2pm
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

//breaks US-1 POST when used to pass US-6 POST
async function reservationStatus(req, res, next){
  const reservation = req.body.data
  console.log("//////////////////", reservation)
  if (reservation.status && reservation.status !== "booked") {
    return next({
      status: 400,
      message: `Invalid field(s): status cannot be ${reservation.status}.`,
    });
  }
  next();
}

async function availableReservationStatus(req, res, next){
  const { status } = req.body.data;

  //handle finished reservation
  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: "Can't update finished reservation",
    });
  }

  //handle unknown status
  if (status === "unknown") {
    return next({
      status: 400,
      message: `Invalid status: ${status}`,
    });
  }

  next();
}

async function read(req, res){
  const data = res.locals.reservation
  return res.status(200).json({data})
}


// query date

async function list(req, res) {
  const reservationDate = req.query.date
  const reservationMobileNumber = req.query.mobile_number
  if(reservationDate){
    const data = await service.list(reservationDate)
    return res.json({data});
  }else if(req.query.mobile_number){
    const data = await service.search(reservationMobileNumber)
    return res.json({data})
  }else{
  const data = await service.list(today())
  res.json({data})
  }
}

async function create(req, res){
  const createdReservation = await service.create(req.body.data)
  res.status(201).json({data: createdReservation})
}

async function update(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.update(updatedReservation);
  res.json({ data });
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
    asyncErrorBoundary(availableReservationStatus),
    asyncErrorBoundary(update)
  ]
};
