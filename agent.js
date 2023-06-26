import { OpenAI } from "langchain/llms/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import process from "process";
import * as dotenv from "dotenv";

dotenv.config();

const model = new OpenAI({
  temperature: 0,
});

const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    hl: "en",
    gl: "us",
  }),
  new Calculator(),
];

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "zero-shot-react-description",
});

const res = await executor.call({
  input: "What is the name of Ranbir kapoor's wife?",
});

console.log(res.output);
