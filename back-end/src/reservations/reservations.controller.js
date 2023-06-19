/**
 * List handler for reservation resources
 */
const service = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { today } = require('../utils/date-time')
const { json } = require('express');

async function reservationExists(req, res, next){
  const {reservationId} = req.params;
  const reservation = service.read(reservationId)
  if(reservation){
    res.locals.reservation = reservation;
    return next();
  }else{
    return next({
      status: 404,
      message: 'reservation cannot be found',
    })
  }
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
  res.json({data})
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)]
};
