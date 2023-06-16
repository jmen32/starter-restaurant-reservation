/**
 * List handler for reservation resources
 */
const service = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

async function list(req, res) {
  res.json({
    data: [],
  });
}

async function create(req, res){
  res.json({data})
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
