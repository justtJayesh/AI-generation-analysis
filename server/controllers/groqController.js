const GenAgent = require("../Agent");

exports.generateContent = async (req, res) => {
    try {
        const { topic, niche } = req.body;

        if (!topic || !niche) {
            return res
                .status(400)
                .json({ error: "Topic and niche are required" });
        }

        const response = await GenAgent(topic, niche);
        res.json({ content: response });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
