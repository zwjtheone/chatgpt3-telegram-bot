import {Configuration, OpenAIApi} from "openai";
import {CreateCompletionRequestPrompt} from "openai/api";
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORGANIZATION_KEY
});
const openai = new OpenAIApi(configuration);

/**
 * send message to chatGPT
 */
export const send = async (context: CreateCompletionRequestPrompt | null) => {
  console.log('send:' + context)
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: context,
    stream: false,
    temperature: 1,
    max_tokens: 4e3,
    logprobs: null,
    // echo: true,
    // top_p: 1,
    n: 1,
    presence_penalty: 1,
    frequency_penalty: 1,
    best_of: 1,
    // stop: 4
  });
  console.log('receive:'+ completion.data)
  return completion.data.choices[0].text
};

