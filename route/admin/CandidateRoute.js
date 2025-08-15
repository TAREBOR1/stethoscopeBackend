const express=require('express')

const { createCandidate, HandleImageUpload, getAllCandidates } = require('../../controller/admin/Candidates')
const { upload } = require('../../config/cloudinary')

const candidateRoute=express.Router()


candidateRoute.post('/uploadImage',upload.single('my_file'),HandleImageUpload)
candidateRoute.post('/create',createCandidate)
candidateRoute.get('/allCandidate',getAllCandidates)


module.exports=candidateRoute