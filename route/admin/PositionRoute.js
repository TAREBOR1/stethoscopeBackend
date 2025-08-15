const express = require('express');

const {
  createPosition,
  getAllPosition,
  getPositionById,
} = require('../../controller/admin/Position');

const positionRoute = express.Router();

positionRoute.post('/create', createPosition);
positionRoute.get('/get', getAllPosition);
positionRoute.get('/:positionId', getPositionById)

module.exports = positionRoute;
