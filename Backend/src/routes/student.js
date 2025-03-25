const express=require('express')
const userandadminauth = require('../middlewares/userandadminauth');
const Election = require('../models/election');

const studentRouter=express.Router()

// Get elections by section and year
studentRouter.get("/elections/:section/:year", userandadminauth("student"), async(req, res) => {
    try {
        const { section, year } = req.params;
        
        // Validate section and year match user's data
        if (section !== req.user.section || year !== req.user.year) {
            return res.status(403).json({ 
                message: "You can only view elections for your section and year" 
            });
        }
        
        // Get all elections for the specified section and year
        const elections = await Election.find({
            section: section,
            year: year
        }).sort({ createdAt: -1 });

        // Separate active and closed elections
        const activeElections = elections.filter(election => election.isActive);
        const closedElections = elections.filter(election => !election.isActive);

        res.json({
            msg: "Fetched Successfully",
            activeElections,
            closedElections
        });
    } catch (error) {
        console.error("Error fetching elections:", error);
        return res.status(500).json({
            msg: "Error fetching elections",
            error: error.message
        });
    }
});

// Get specific election by ID
studentRouter.get("/elections/:id", userandadminauth("student"), async (req, res) => {
    try {
        const { id } = req.params;

        // Find election by ID
        const election = await Election.findById(id);

        if (!election) {
            return res.status(404).json({ 
                message: "Election not found",
                error: "Invalid election ID"
            });
        }

        // Validate user can access this election
        if (election.section !== req.user.section || election.year !== req.user.year) {
            return res.status(403).json({ 
                message: "You can only view elections for your section and year",
                error: "Access denied"
            });
        }

        res.json({ 
            message: "Election fetched successfully", 
            election 
        });
    } catch (error) {
        console.error("Error fetching election:", error);
        return res.status(500).json({ 
            message: "Server Error",
            error: error.message
        });
    }
});

module.exports = studentRouter;