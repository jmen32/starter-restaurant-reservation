/**
 * List handler for reservation resources
 */

const service = require('./reservations.service')
const reservationData = require('../db/seeds/01-tables.json')
const { today } = require('../utils/date-time')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { json } = require('express');

async function list(req, res) {
  const reservationsDate = req.query.date
  if(reservationsDate){
    const data = await service.list(reservationsDate)
    return res.json({
      data
    });
  }
  const data = await service.list(today())
  console.log("data", JSON.stringify(data))
  res.json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
};
