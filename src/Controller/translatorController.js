const { generateTranslator, translatorSchema, translatorPrompt } = require('../service/gemini.service')

const generateResponse = async (req, res) => {
    try {
        const { text, language } = req.body || {};
        if (!text || !language) {
            return res.status(400).json({
                success: false,
                message: "text and language are required"
            });
        }
        const prompt = translatorPrompt(text, language);
        const result = await generateTranslator(prompt, translatorSchema);
        const data = JSON.parse(result);

        //validation
        if (!data.translation) {
            throw new Error("translation is required")
        }

        res.status(200).json({
            success: true,
            translation: data,
        })
    }
    catch (error) {
        console.error("AI Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate AI response",
        });
    }
}

module.exports = generateResponse