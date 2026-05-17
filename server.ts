import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  let ai: GoogleGenAI | null = null;
  
  function getGeminiClient() {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
      }
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return ai;
  }

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const client = getGeminiClient();
      
      const response = await client.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages,
        config: {
          systemInstruction: `You are the Digital Oromiya Intelligence Assistant, a sophisticated AI designed to support the Digital Oromiya regional initiative and Ethiopia's national digital transformation.

Goals:
1. Educate Oromo and Ethiopian youth in AI, programming, and digital entrepreneurship.
2. Provide information on regional infrastructure, e-governance, and literacy programs.
3. Support Afaan Oromo, Amharic, and English languages.

Tone: Professional, empowering, and culturally respectful. 
Cultural context: Mention major regional hubs (Addis Ababa/Finfinnee, Adama, Jimma, Robe, Shashamane, etc.). Use regional greetings like 'Ashamaa' or 'Baga Nagaan Dhuftan'.
Digital Oromiya Mission: Bridging the digital divide and creating a knowledge-based economy.

Owner: Abdulbahar Mohammed Yusuf
Website: https://digitaloromiya.online

Keep responses structured, concise, and highly informative. Use Markdown for formatting.`,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
