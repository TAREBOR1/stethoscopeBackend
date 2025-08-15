const Vote = require("../../model/Vote");
const Candidate = require("../../model/Candidate");
const Position= require("../../model/Position")
const User=require("../../model/User")



const castVote = async (req, res) => {
  const { student, candidate, position, election } = req.body;
   if (!student || !candidate || !position || !election) {
    return res.status(400).json({ success:false, message: "All fields are required" });
  }

  try {
    // Check if student already voted for this position
    const existingVote = await Vote.findOne({ student, position });
    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: "You have already voted for this position.",
      });
    }

    // Save vote
    const newVote = await Vote.create({ student, candidate, position, election });

    res.status(201).json({
      success: true,
      message: "Vote cast successfully",
      vote: newVote,
    });

  } catch (error) {
    console.error("Error casting vote:", error);
    return res.status(500).json({
      success: false,
      message: "Error casting vote",
      error,
    });
  }
};





const getStudentVoteStatus = async (req, res) => {
  const {studentId} = req.params;; // or use req.user._id if auth middleware is used

  try {
    // Get all positions (acting like elections)
    const positions = await Position.find().populate("election", "title endDate");

    // Get all votes by this student
    const studentVotes = await Vote.find({ student: studentId });

    const response = await Promise.all(
      positions.map(async (position) => {
        // Check if student has voted for this position
        const hasVoted = studentVotes.some(
          (vote) => vote.position.toString() === position._id.toString()
        );

        // Count total candidates in this position
        const totalCandidates = await Vote.countDocuments({ position: position._id });

        return {
          id: position._id,
          title: position.title,
          description: `Vote for your ${position.title}`,
          endDate: position.election?.endDate || new Date(),
          totalCandidates,
          hasVoted,
        };
      })
    );

    res.status(200).json({ success: true, elections: response });
  } catch (error) {
    console.error("Error fetching student vote status:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};



const getAllVotes = async (req, res) => {
  try {
    const votes = await Vote.find()
      .populate('student', 'fullName matricNumber') // only return relevant fields
      .populate('candidate', 'fullName email position')
      .populate('position', 'title')
      .populate('election', 'title startDate endDate');

    res.status(200).json({
      success: true,
      count: votes.length,
      votes,
    });
  } catch (error) {
    console.error('Error fetching all votes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve votes',
    });
  }
};








module.exports = { castVote, getStudentVoteStatus, getAllVotes  };
