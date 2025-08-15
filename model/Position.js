const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
  maxVotes: { type: Number, default: 1 }, // if multi-vote per position is allowed
}, { timestamps: true });

const Position= mongoose.model("Position", positionSchema);
module.exports =Position
