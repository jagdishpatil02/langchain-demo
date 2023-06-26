import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import * as dotenv from "dotenv";
import { LLMChain } from "langchain";

dotenv.config();
const template =
  "what would be a good company name for a company that makes {product} ?";

const PromptTemp = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});

const model = new OpenAI({
  temperature: 0.9,
});

const chain = new LLMChain({
  llm: model,
  prompt: PromptTemp,
});

const res = await chain.call({
  product: "softwares",
});

console.log(res);
