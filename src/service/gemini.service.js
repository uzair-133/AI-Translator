require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const aiModels = [
    process.env.GEMINI_MODEL,
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-3.8-flash",
    "gemini-2.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
].filter(Boolean);


const translatorPrompt = (text, language) => {
    return `
You are an expert AI translator.

Task:
Translate the following text into ${language}.

Text:
${text}

Instructions:
- Preserve the original meaning and intent.
- Keep the translation natural, clear, and easy to understand.
- Do not add or remove information.
- Preserve names, numbers, dates, and important details.
- Maintain the original tone and context as much as possible.
- Translate the complete text.
- Return only the translated text without any additional explanation.
`;
};

const translatorSchema = {
    type: "object",

    properties: {
        translation: {
            type: "string",
            description: "A complete translation of the provided text",
        },
    },

    required: ["translation"],
};


const generateTranslator = async (prompt, schema) => {

    for (const model of aiModels) {
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                console.log(`Trying model: ${model}...`);
                const response = await ai.models.generateContent({
                    model,
                    contents:prompt,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: schema,
                    }
                })
                return response.text;
            }

            catch (err) {
                console.log(` Model ${model} failed:`, err.message);
                continue;

            }
        }
    }
  throw new Error("All Gemini models failed");

}

module.exports = {
    translatorPrompt,
    generateTranslator,
    translatorSchema
}