const express = require('express')
const app=express();
const cors=require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./route/AuthRoute');
const electionRoute = require('./route/admin/ElectionRoute');
const positionRoute = require('./route/admin/PositionRoute');
const candidateRoute = require('./route/admin/CandidateRoute');
const VoteRoute = require('./route/student/VoteRoute');
const userRoute = require('./route/userRoute');
const resultRoute = require('./route/admin/ResultRoute');


app.use(express.json())



app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:[
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],credentials:true
}))
app.use(cookieParser())

app.use('/api/auth/',authRoute)

// admin functionality
app.use('/api/election/',electionRoute)
app.use('/api/position/',positionRoute)
app.use('/api/candidate/',candidateRoute)

// student functiinality

app.use('/api/vote/',VoteRoute)

// user

app.use('/api/user/',userRoute)

//

app.use('/api/results/',resultRoute)




module.exports=app