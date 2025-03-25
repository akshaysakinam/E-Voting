const express = require("express");
const userandadminauth = require("../middlewares/userandadminauth");
const Election = require("../models/election");

const adminRouter = express.Router();

adminRouter.post(
  "/createelection",
  userandadminauth("admin"),
  async (req, res) => {
    try {
    //   console.log(req.user);
      const { role } = req.user;

      if (role !== "admin") {
        return res.status(403).json({ msg: "Only admin can create election" });
      }
      let { title, section, year, startTime, endTime, isActive,participants } = req.body;
      startTime = new Date(startTime);
      endTime = new Date(endTime);

      // Validate if date conversion was successful
      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        return res.status(400).json({ msg: "Invalid date format. Use ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ)" });
      }
      // Ensure participants are provided as an array
      if (!Array.isArray(participants)) {
        return res.status(400).json({ msg: "Participants must be an array" });
      }

      // Validate each participant
      const formattedParticipants = participants.map((p) => ({
        userId: p.userId, // MongoDB ObjectId of user (candidate)
        name: p.name, // Candidate's name
        votes: 0, // Initialize vote count to 0
      }));

      const election = new Election({
        title,
        section,
        year,
        startTime,
        endTime,
        isActive,
        createdBy: req.user._id,
        participants: formattedParticipants,
      });

      await election.save();
      res.status(201).json({ message: "Election created successfully" ,election});
    } catch (error) {
        // console.log(error)
      return res.status(400).json({ msg: error.message });
    }
  }
);

adminRouter.post("/admin/elections/:id/close", userandadminauth("admin"), async (req, res) => {
  try {
    const election = await Election.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { isActive: false },
      { new: true }
    );
    if (!election) return res.status(404).json({ message: "Election not found" });
    res.status(200).json({ message: "Election closed", election });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


adminRouter.get("/elections", userandadminauth("admin"), async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({ msg: "Only admin can view elections" });
    }

    // Fetch all elections created by the admin
    const elections = await Election.find({ createdBy: req.user._id });

    res.status(200).json({ elections });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
// In your admin router (e.g., adminRouter.js)
adminRouter.get("/admin/elections/:id", userandadminauth("admin"), async (req, res) => {
  try {
    // Fetch the election that was created by this admin
    const election = await Election.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }
    res.status(200).json({ election });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

adminRouter.delete("/admin/elections/:id", userandadminauth("admin"), async (req, res) => {
  try {
    const election = await Election.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!election) return res.status(404).json({ message: "Election not found" });
    res.status(200).json({ message: "Election deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = adminRouter;
