import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function createServer() {
  const app = express();
  app.use(express.json({ limit: "2mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "zylo-api" });
  });

  // AI Social Post & Hashtag Generator
  app.post("/api/ai/generate-post", async (req, res) => {
    try {
      const { topic, platforms, tone, goal, audience } = req.body as {
        topic?: string;
        platforms?: string[];
        tone?: string;
        goal?: string;
        audience?: string;
      };

      if (!topic || !topic.trim()) {
        res.status(400).json({ error: "Please provide a topic or campaign brief." });
        return;
      }

      const targetPlatforms = Array.isArray(platforms) && platforms.length > 0
        ? platforms
        : ["Instagram", "LinkedIn", "X"];

      const ai = getAiClient();
      if (!ai) {
        res.status(503).json({
          error: "Gemini API key is not configured in Secrets. Please set GEMINI_API_KEY in Settings > Secrets.",
        });
        return;
      }

      const prompt = [
        `Create ready-to-publish social media posts for these platforms: ${targetPlatforms.join(", ")}.`,
        `Topic / Brief: ${topic.trim()}`,
        `Tone: ${tone || "Authentic & Conversational"}`,
        `Campaign Goal: ${goal || "Organic Reach & Engagement"}`,
        `Target Audience: ${audience || "Creators, founders, and digital marketers"}`,
        `For each platform, write a scroll-stopping opening hook, platform-native caption body, 4-6 optimized hashtags (without generic spam), an optimal posting window, and a brief reason why this structure works.`,
      ].join("\n");

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: prompt,
        config: {
          systemInstruction:
            "You are Zylo's senior social media strategist and copywriter. Write sharp, natural, human-sounding posts tailored specifically to each platform's format and character norms. Avoid clichés like 'unlock', 'elevate', or 'game-changer'.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              strategySummary: {
                type: Type.STRING,
                description: "One-sentence strategic angle for this campaign.",
              },
              variants: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    platform: { type: Type.STRING },
                    hook: { type: Type.STRING },
                    caption: { type: Type.STRING },
                    hashtags: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    bestTime: { type: Type.STRING },
                    formatRecommendation: { type: Type.STRING },
                    whyItWorks: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      const raw = (response.text ?? "{}").trim();
      const parsed = JSON.parse(raw);
      res.json(parsed);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to generate AI posts.";
      console.error("AI generate-post error:", message);
      res.status(500).json({ error: message });
    }
  });

  // AI Content Repurposer
  app.post("/api/ai/repurpose", async (req, res) => {
    try {
      const { sourceText, targetPlatforms, tone } = req.body as {
        sourceText?: string;
        targetPlatforms?: string[];
        tone?: string;
      };

      if (!sourceText || sourceText.trim().length < 15) {
        res.status(400).json({ error: "Please enter at least a few sentences to repurpose." });
        return;
      }

      const ai = getAiClient();
      if (!ai) {
        res.status(503).json({
          error: "Gemini API key is not configured in Secrets. Please set GEMINI_API_KEY in Settings > Secrets.",
        });
        return;
      }

      const platforms = Array.isArray(targetPlatforms) && targetPlatforms.length > 0
        ? targetPlatforms
        : ["LinkedIn", "X", "TikTok"];

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: `Repurpose the following source material into distinct native posts for ${platforms.join(", ")} in a ${tone || "clear, crisp"} voice.\n\nSource Material:\n${sourceText.trim()}`,
        config: {
          systemInstruction:
            "Extract the sharpest insights from the source text and adapt them natively for each requested social platform. Keep hooks concrete and scannable.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              keyTakeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              posts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    platform: { type: Type.STRING },
                    content: { type: Type.STRING },
                    hashtags: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    bestTime: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      const raw = (response.text ?? "{}").trim();
      res.json(JSON.parse(raw));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to repurpose content.";
      console.error("AI repurpose error:", message);
      res.status(500).json({ error: message });
    }
  });

  // AI Automation Blueprint Builder
  app.post("/api/ai/automation-blueprint", async (req, res) => {
    try {
      const { goal, connectedPlatforms, weeklyFrequency } = req.body as {
        goal?: string;
        connectedPlatforms?: string[];
        weeklyFrequency?: number;
      };

      if (!goal || !goal.trim()) {
        res.status(400).json({ error: "Please describe your automation goal." });
        return;
      }

      const ai = getAiClient();
      if (!ai) {
        res.status(503).json({
          error: "Gemini API key is not configured in Secrets. Please set GEMINI_API_KEY in Settings > Secrets.",
        });
        return;
      }

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: `Design a practical social media automation rule.\nGoal: ${goal.trim()}\nConnected Platforms: ${(connectedPlatforms || ["Instagram", "LinkedIn", "X"]).join(", ")}\nTarget Weekly Cadence: ${weeklyFrequency || 5} posts/week`,
        config: {
          systemInstruction:
            "You are a social media workflow automation architect. Output a single concrete trigger-and-action rule that fits an automated creator scheduling platform.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              trigger: { type: Type.STRING },
              action: { type: Type.STRING },
              scheduleWindow: { type: Type.STRING },
              platforms: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              expectedOutcome: { type: Type.STRING },
            },
          },
        },
      });

      const raw = (response.text ?? "{}").trim();
      res.json(JSON.parse(raw));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to generate automation blueprint.";
      console.error("AI automation-blueprint error:", message);
      res.status(500).json({ error: message });
    }
  });

  // Vite dev middleware vs static production serving
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      const indexHtml = path.join(distPath, "index.html");
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send("Build not found. Run npm run build first.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zylo server listening on http://localhost:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
