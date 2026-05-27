import axios from "axios";

const askAI = async (prompt, apiKey = process.env.OPENROUTER_API_KEY) => {
    try {
        if(!prompt || !Array.isArray(prompt) || prompt.length === 0 ){
            throw new Error("Prompt is required");
        }

        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "deepseek/deepseek-chat",
            messages: prompt,
            temperature: 0.7,
            max_tokens: 2000,
            response_format: {type: "json_object"},
        }, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "X-OpenRouter-Title": "DevoraUI",
                "Content-Type": "application/json",
            }
        });

        const content = response.data.choices[0].message.content;

        if(!content) throw new Error("No content from AI");

        return content;
        
    } catch (error) {
        console.log("Error calling OpenRouter AI:", error.response?.data || error.message);
        throw error;
    }
};

export { askAI };