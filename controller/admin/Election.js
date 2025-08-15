const Election = require("../../model/Election");

// POST /api/elections/create
const createElection = async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  if (!title || !startDate || !endDate) {
    return res.json({ success: false, message: "Title, startDate, and endDate are required." });
  }

  try {
    const newElection = new Election({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      isActive: false, // default to inactive
    });

    await newElection.save();

    res.json({
      success: true,
      message: "Election created successfully.",
      election: newElection,
    });
  } catch (error) {
    console.error("Error creating election:", error.message);
    res.json({ success: false, message: "Server error while creating election." });
  }
};


const getElection= async(req,res)=>{
    try {
    const elections = await Election.find();
    if(!elections){
      return res.json({
        success:false,
        message:'No ongoing Election'
      })
    }
    res.json({ success: true, elections });
  } catch (error) {
    res.json({ success: false, message: 'Failed to fetch elections' });
  }
}
module.exports = { createElection, getElection };
