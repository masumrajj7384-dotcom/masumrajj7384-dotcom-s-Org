import fs from 'fs';

let code = fs.readFileSync('server.js', 'utf8');

const importReplacement = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchFullData, searchCompanies } from './scraper.js';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});
`;

code = code.replace(/import express from 'express';\nimport path from 'path';\nimport { fileURLToPath } from 'url';\nimport { fetchFullData, searchCompanies } from '\.\/scraper\.js';/, importReplacement);

const newRoute = `
app.post('/api/chat', express.json(), async (req, res) => {
  try {
    const { message, history } = req.body;
    
    // Construct contents array with history
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({ role: msg.role, parts: [{ text: msg.text }] });
      }
    }
    
    // Add current user message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: "You are a helpful AI financial assistant. You can help users analyze financial data, explain concepts, and provide up-to-date market information.",
        tools: [{ googleSearch: {} }],
      },
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch response" });
  }
});

// Fallback to index.html for SPA behavior
`;

code = code.replace(/\/\/ Fallback to index\.html for SPA behavior/, newRoute);
fs.writeFileSync('server.js', code);
console.log("server.js Patched successfully");
