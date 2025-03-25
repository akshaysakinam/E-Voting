const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true },
    voterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participantId: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true },
    votedAt: { type: Date, default: Date.now }
},{timestamps:true});

const Vote=mongoose.model("Vote", voteSchema);
module.exports =Vote;