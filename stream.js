import { OpenAI } from "langchain/llms/openai";
import * as dotenv from "dotenv";

dotenv.config();
const model = new OpenAI({
  streaming: true,
  callbacks: [
    {
      handleLLMNewToken(token) {
        process.stdout.write(token);
      },
    },
  ],
});

await model.call("write a urdu rap on monsoon");
