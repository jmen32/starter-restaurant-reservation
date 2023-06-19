/**
 * List handler for reservation resources
 */

const service = require('./reservations.service')
const reservationData = require('../db/seeds/00-reservations.json')
const { today } = require('../utils/date-time')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { json } = require('express');

async function validateBody(req, res, next){
  const { data: {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = {}} = req.body

  if(!first_name || first_name === ""){
    res.status(400).json({error: "Reservation must include a first_name"})
  }
  if(!last_name || last_name === ""){
    res.status(400).json({error: "Reservation must include a last_name"})
  }
  if(!mobile_number || mobile_number === ""){
    res.status(400).json({error: "Reservation must include a mobile_number"})
  }
  if(!reservation_date || reservation_date === "" || isNaN(Date.parse(reservation_date))){
    res.status(400).json({error: "Reservation must include a reservation_date"})
  }
  const timeFormat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  if(!reservation_time || reservation_time === "" || !timeFormat.test(reservation_time)){
    res.status(400).json({error: "Reservation must include a reservation_time"})
  }
  if(!people || people < 1 || !Number.isInteger(people)){
    res.status(400).json({error:"Reservation must include a valid number of people"})
  }
  next();
}

async function list(req, res) {
  const reservationsDate = req.query.date
  if(reservationsDate){
    const data = await service.list(reservationsDate)
    res.json({
      data
    });
  }
  const data = await service.list(today())
  console.log("data", JSON.stringify(data))
  res.json({data})
}

async function create(req, res){
  const { data: {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = {}} = req.body
  const newReservation = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  }
  const createdReservation = await service.create(newReservation)
  res.status(201).json({data: createdReservation})
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(validateBody), asyncErrorBoundary(create)],
};
