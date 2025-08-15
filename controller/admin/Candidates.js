const { ImageUploadUtil } = require("../../config/cloudinary");
const Candidate = require("../../model/Candidate");






const HandleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const createCandidate = async (req, res) => {
  const { name, manifesto, positionId, electionId, image } = req.body;

  if (!name || !positionId || !electionId) {
    return res.status(400).json({ message: "Name, positionId, and electionId are required" });
  }

  try {
    const newCandidate = new Candidate({
      name,
      manifesto,
      position: positionId,
      election: electionId,
      image: image || "", // optional image URL
    });

    await newCandidate.save();

    res.status(201).json({ success: true, message: "Candidate created", candidate: newCandidate });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create candidate" });
  }
};


const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .populate('election', 'title')  // optional: populate election title
      .populate('position', 'title')  // optional: populate position title
      .sort({ createdAt: -1 });         // optional: newest first

    res.status(200).json({
      success: true,
      candidates,
    });
  } catch (error) {
    console.error('Failed to fetch candidates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch candidates',
    });
  }
};




module.exports = { createCandidate ,HandleImageUpload, getAllCandidates};
