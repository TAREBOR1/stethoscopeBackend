const express = require("express");
const { castVote, getStudentVoteStatus, getAllVotes } = require("../../controller/student/Vote");
const VoteRoute= express.Router();





VoteRoute.post("/cast", castVote);
VoteRoute.get('/getVoteByStudent/:studentId',getStudentVoteStatus)
VoteRoute.get('/all',getAllVotes)

module.exports = VoteRoute;
