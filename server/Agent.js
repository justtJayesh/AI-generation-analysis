require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function GenAgent(topic, niche) {
    try {
        const prompt = `Generate a complete social media content package for ${topic} in the ${niche} niche. Include:
1. A unique reel idea (2-3 sentences)
2. An engaging caption (2-3 lines)
3. 5 relevant hashtags
4. A hook or first line to grab attention (1 line)

Return ONLY a JSON object with these exact keys: reelIdea, caption, hashtags (as an array), and hook. Do not include any markdown formatting or additional text.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a social media content expert specializing in ${niche}. Generate creative and engaging content ideas. Always return responses as pure JSON without any markdown formatting or additional text.`,
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
        });

        const content = chatCompletion.choices[0]?.message?.content;

        if (!content) {
            throw new Error("No content generated");
        }

        try {
            // Clean the content by removing any markdown formatting
            const cleanContent = content
                .replace(/```json\n?|\n?```/g, "")
                .trim();

            // Parse the JSON response
            const parsedContent = JSON.parse(cleanContent);

            // Validate the required fields
            const requiredFields = ["reelIdea", "caption", "hashtags", "hook"];
            const missingFields = requiredFields.filter(
                (field) => !parsedContent[field]
            );

            if (missingFields.length > 0) {
                throw new Error(
                    `Missing required fields: ${missingFields.join(", ")}`
                );
            }

            if (!Array.isArray(parsedContent.hashtags)) {
                throw new Error("hashtags must be an array");
            }

            return {
                success: true,
                data: parsedContent,
            };
        } catch (parseError) {
            console.error("Error parsing Groq response:", parseError);
            console.error("Raw content:", content);
            throw new Error("Failed to parse response as valid JSON");
        }
    } catch (error) {
        console.error("Error in GenAgent:", error);
        return {
            success: false,
            error: error.message,
        };
    }
}

module.exports = GenAgent;
