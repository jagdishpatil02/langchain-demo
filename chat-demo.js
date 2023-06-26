import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { ChatAgent, AgentExecutor } from "langchain/agents";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";

import { LLMChain } from "langchain";

import * as dotenv from "dotenv";
dotenv.config();

const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    hl: "en",
    gl: "us",
  }),
];

const model = new ChatOpenAI({
  temperature: 0,
});

// agents and tools
const agent = ChatAgent.fromLLMAndTools(model, tools);

const executor = AgentExecutor.fromAgentAndTools({
  agent: agent,
  tools: tools,
});

const resAgent = await executor.run(
  "how many people live in the India in 2023?"
);

console.log(resAgent);
// chat bot

const translationPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "You are a helpful assistant that translates {inputlang} to {outputlang}"
  ),
  HumanMessagePromptTemplate.fromTemplate("{text}"),
]);

const chain = new LLMChain({
  prompt: translationPrompt,
  llm: model,
});

const resChat = await chain.call({
  inputlang: "english",
  outputlang: "hindi",
  text: "i am developer",
});

console.log(resChat);
