import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

// Generate text content
export const generateText = async (prompt) => {
  const response = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });
  return response.data.choices[0].message.content;
};

// Generate image (URL or base64) from prompt
export const generateImage = async (prompt) => {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "512x512",
  });
  return response.data.data[0].url; // URL to display
};
