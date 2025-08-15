const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  matricNumber: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  otp: String,
  otpExpiry: Date,
  role: { type: String, enum: ["student", "admin"], default: "student" },
  hasVoted: { type: Map, of: Boolean }, // e.g. { "electionId": true }
}, { timestamps: true });


const User= mongoose.model('User',UserSchema)

module.exports=User;