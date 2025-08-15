// Controller: controllers/resultController.js
const Vote = require('../../model/Vote')
const Candidate = require('../../model/Candidate');
const User = require('../../model/User');
const Position = require('../../model/Position');

const getResultByPosition = async (req, res) => {
  try {
    const { positionId } = req.params;

    // Get all candidates for this position
    const candidates = await Candidate.find({ position: positionId });

    // Get all votes for this position
    const votes = await Vote.find({ position: positionId });

    // Count total users eligible to vote (you can filter if needed)
    const totalVoters = await User.countDocuments();

    const votesCast = votes.length;

    const participationRate = ((votesCast / totalVoters) * 100).toFixed(2);

    const candidateStats = candidates.map((candidate) => {
      const votesForCandidate = votes.filter(
        (vote) => vote.candidate.toString() === candidate._id.toString()
      ).length;

      return {
        _id: candidate._id,
        name: candidate.name,
        image: candidate.image, // Assuming you have image in candidate model
        votes: votesForCandidate,
        percentage: ((votesForCandidate / votesCast) * 100).toFixed(2) || 0
      };
    });

    // Sort descending by votes
    candidateStats.sort((a, b) => b.votes - a.votes);

    const position = await Position.findById(positionId);

    res.json({
      positionTitle: position.title,
      totalVoters,
      totalVotesCast: votesCast,
      participationRate,
      candidates: candidateStats
    });
  } catch (error) {
    console.error('Error fetching election results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getResultByPosition
};
