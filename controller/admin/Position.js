const Position = require("../../model/Position");
const Election = require("../../model/Election");
const Candidate = require("../../model/Candidate");
const Vote = require("../../model/Vote");
// Create a new position for a specific election
const createPosition = async (req, res) => {
  const { title, electionId } = req.body;

  if (!title || !electionId) {
    return res.json({ message: "Title and election ID are required" });
  }

  try {
    const newPosition = new Position({ title, election: electionId });
    await newPosition.save();

    // Add to election
    await Election.findByIdAndUpdate(electionId, {
      $push: { positions: newPosition._id },
    });

    res.json({
      success: true,
      message: "Position created",
      position: newPosition,
    });
  } catch (err) {
    res.json({ success: false, message: "Failed to create position" });
  }
};

const getAllPosition = async (req, res) => {
  try {
    const positions = await Position.find().populate("election");
    res.json({ success: true, positions });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch positions" });
  }
};






const getPositionById = async (req, res) => {
  const { positionId } = req.params;
  const { userId } = req.query;

  try {
    const position = await Position.findById(positionId).populate('election');

    if (!position) {
      return res.status(404).json({ success: false, message: 'Position not found' });
    }

    // Get candidates for this position
    const candidates = await Candidate.find({ position: positionId });

    // Check if the student has voted for this position
    const vote = await Vote.findOne({
      student: userId,
      position: positionId
    });

    const hasVoted = !!vote;
    const votedCandidate = vote?.candidate || null;

    res.status(200).json({
      success: true,
      position: {
        _id: position._id,
        title: position.title,
        description: position.description,
        endDate: position.election?.endDate || position.endDate,
        electionId: position.election?._id || null,
        candidates,
        hasVoted,
        votedCandidate
      }
    });
  } catch (error) {
    console.error('Error fetching position by ID:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error fetching position by ID'
    });
  }
};



module.exports = { createPosition, getAllPosition, getPositionById };
