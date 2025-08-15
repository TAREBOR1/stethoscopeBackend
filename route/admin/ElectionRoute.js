const express=require('express')

const { createElection, getElection } = require('../../controller/admin/Election')

const electionRoute=express.Router()



electionRoute.post('/create',createElection)
electionRoute.get('/get',getElection)


module.exports=electionRoute