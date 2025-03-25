const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  votes: { type: Number, default: 0 }, // Track votes per participant
});

const electionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Election name
    section: { type: String, required: true },
    year: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    isActive: { type: Boolean, default: true }, // Indicates if the election is ongoing
    participants: [ParticipantSchema], // Store participants inside the election
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Admin reference
  },
  { timestamps: true }
);

const Election = mongoose.model("Election", electionSchema);
module.exports=Election