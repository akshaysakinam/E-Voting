const express=require('express')
const userandadminauth = require('../middlewares/userandadminauth');
const Election = require('../models/election');

const studentRouter=express.Router()

studentRouter.get("/elections/:section/:year",userandadminauth("student"),async(req,res)=>{
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Only students can view elections" });
        }
        
        // Get all elections (both active and closed) for the student's section and year
        const elections = await Election.find({
            section: req.user.section,
            year: req.user.year
        }).sort({ createdAt: -1 }); // Sort by creation date, newest first

        // Separate active and closed elections
        const activeElections = elections.filter(election => election.isActive);
        const closedElections = elections.filter(election => !election.isActive);

        res.json({
            msg:"Fetched Successfully",
            activeElections,
            closedElections
        })
    } catch (error) {
        return res.status(400).json({msg:error.message})
    }
})

studentRouter.get("/elections/:id", userandadminauth("student"), async (req, res) => {
    try {
        const { id } = req.params;

        // Find election by ID
        const election = await Election.findById(id);

        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        res.json({ message: "Election fetched successfully", election });
    } catch (error) {
        console.error("Error fetching election:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

module.exports=studentRouter