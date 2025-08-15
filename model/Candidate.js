const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manifesto: String,
  image: String,
  position: { type: mongoose.Schema.Types.ObjectId, ref: "Position" },
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
}, { timestamps: true });

const Candidate=mongoose.model("Candidate", candidateSchema);
module.exports = Candidate
