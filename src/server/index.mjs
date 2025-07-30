import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Groq } from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });
const llm_model = "llama3-70b-8192";
const llm_temperature = 0.7;
const llm_max_completion_tokens = 150;

// Endpoint for chat completions
app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: llm_model,
      messages,
      temperature: llm_temperature,
      max_completion_tokens: llm_max_completion_tokens,
    });

    const reply = completion.choices?.[0]?.message?.content;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stream endpoint for real-time chat responses
app.post("/chat/stream", async (req, res) => {
  const { messages } = req.body;

  try {
    const stream = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages,
      temperature: llm_temperature,
      max_completion_tokens: llm_max_completion_tokens,
      stream: true,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        res.write(`data: ${content}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8000, () => {
  console.log("Groq server running on http://localhost:8000");
});
