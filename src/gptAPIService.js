import OpenAI from "openai";
import config from "./config.js";

const openai = new OpenAI({
  apiKey: config.openai.api_key,
});

const systemMessageJson = (language) =>
  `please localize this is text copy it to ${language}, and response exactly the same JSON format >>> \n`;
const systemMessageString = () =>
  `please localize it to ${language}, and response only translated text >>> \n`;

const formSystemMessageSimple = (isJson, toLocale) => {
  return isJson ? systemMessageJson(toLocale) : systemMessageString(toLocale);
};

const getTranslateResponse = async (content, toLocale, isJson) => {
  const messages = [];
  messages.push({
    role: "system",
    content: formSystemMessageSimple(isJson, toLocale),
  });
  messages.push({ role: "user", content });
  try {
    const completion = await openai.chat.completions.create({
      model: config.openai.model,
      messages: messages,
      temperature: 0.2,
      top_p: 0.1,
    });

    // console.log("completion", completion.choices[0].message.content);
    console.log("token used: ", completion.usage);
    return completion.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      console.log("getGPTResponse failed:", error.response.status);
      console.log(error.response.data);
      return error.response.data;
    } else {
      console.log("getGPTResponse failed no response", error, error.message);
    }
  }
};

export { getTranslateResponse };
