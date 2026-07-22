import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Initialize Google Gen AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Model configuration
const MODEL_NAME = "gemini-flash-latest";
const SYSTEM_INSTRUCTION =
  "You are a helpful, witty, and concise AI chatbot assistant.";

/**
 * Endpoint 1: Single-turn standard completion
 * POST /api/chat/single
 * Body: { "prompt": "Hello!" }
 */
app.post("/api/chat/single", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return res.json({ response: response.text });
  } catch (error) {
    console.error("Error generating content:", error);
    return res.status(500).json({ error: "Failed to generate AI response." });
  }
});

/**
 * Endpoint 2: Multi-turn chat conversation (with history)
 * POST /api/chat/multi
 * Body: {
 *   "history": [{ "role": "user", "parts": [{ "text": "Hi" }] }],
 *   "message": "What did I just say?"
 * }
 */
app.post("/api/chat/multi", async (req, res) => {
  try {
    const { history = [], message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Pass options including history into ai.chats.create
    const chat = ai.chats.create({
      model: MODEL_NAME,
      history: history,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    // Pass text directly to sendMessage
    const response = await chat.sendMessage({
      message: message,
    });

    return res.json({ response: response.text });
  } catch (error) {
    // THIS LOG WILL SHOW YOU THE EXACT API ERROR IN YOUR TERMINAL
    console.error("Gemini API Error Detail:", error);
    return res.status(500).json({ error: "Failed to process chat session." });
  }
});

/**
 * Endpoint 3: Streaming response (Server-Sent Events / Chunked)
 * POST /api/chat/stream
 * Body: { "prompt": "Write a short essay on AI." }
 */
app.post("/api/chat/stream", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const responseStream = await ai.models.generateContentStream({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    for await (const chunk of responseStream) {
      res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Streaming error:", error);
    res.status(500).json({ error: "Streaming failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
