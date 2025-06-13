// import express from "express";
// import cors from "cors";
// import GenAgent from "./Agent.js";

const express = require("express");
const cors = require("cors");
const GenAgent = require("./Agent.js");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
    try {
        const { topic, niche } = req.body;

        // Validate input
        if (!topic || !niche) {
            return res.status(400).json({
                success: false,
                error: "Topic and niche are required",
            });
        }

        const result = await GenAgent(topic, niche);

        if (!result.success) {
            return res.status(500).json(result);
        }

        res.json(result);
    } catch (error) {
        console.error("Error in /api/generate:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Failed to generate content",
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
