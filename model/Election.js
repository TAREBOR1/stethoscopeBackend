const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: false },
  positions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Position" }]
}, { timestamps: true });

const Election =mongoose.model("Election", electionSchema);

module.exports = Election
