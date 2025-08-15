const express=require('express')

const { getResultByPosition } = require('../../controller/admin/Result')

const resultRoute=express.Router()


resultRoute.get('/:positionId',getResultByPosition)


module.exports=resultRoute