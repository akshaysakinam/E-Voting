const express = require("express");
const userandadminauth = require("../middlewares/userandadminauth");
const Vote = require("../models/vote");
const Election = require("../models/election");

const voteRouter = express.Router();

voteRouter.post("/vote", userandadminauth("student"), async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "student") {
      return res.status(403).json({ msg: "Only students can vote" });
    }

    const { electionId, participantId } = req.body;

    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ msg: "Election not found" });
    }

    const participant = election.participants.find(
      (p) => p._id.toString() === participantId
    );

    if (!participant) {
      return res.status(404).json({ msg: "Invalid candidate for this election" });
    }

    const existingVote = await Vote.findOne({
      electionId,
      voterId: req.user._id,
    });

    if (existingVote) {
      return res.status(400).json({ message: "You have already voted" }); // ✅ Added return
    }

    const vote = new Vote({
      electionId,
      voterId: req.user._id,
      participantId,
    });
    await vote.save();

    participant.votes += 1;
    await election.save();

    return res.json({ msg: "Vote casted successfully" }); // ✅ Ensure only one response
  } catch (error) {
    return res.status(400).json({ msg: error.message }); // ✅ Return in catch block
  }
});

module.exports = voteRouter;
