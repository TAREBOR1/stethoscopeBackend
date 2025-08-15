const express=require('express')

const { castVote } = require('../../controller/student/Vote')

const voteRoute=express.Router()



voteRoute.post('/cast',castVote)


module.exports=voteRoute