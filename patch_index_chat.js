import fs from 'fs';

let code = fs.readFileSync('app/static/index.html', 'utf8');

const headClosing = `  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>\n</head>`;
code = code.replace(`</head>`, headClosing);

const bodyClosing = `
  <!-- Floating Chatbot UI -->
  <div id="chatbot-toggle" onclick="toggleChatbot()">
    <i class="fa-solid fa-message"></i>
  </div>
  
  <div id="chatbot-container" class="hidden glass-panel">
    <div class="chatbot-header">
      <div>
        <i class="fa-solid fa-robot"></i> AI Financial Assistant
      </div>
      <button onclick="toggleChatbot()" style="background:none;border:none;color:white;cursor:pointer;">
        <i class="fa-solid fa-times"></i>
      </button>
    </div>
    <div id="chatbot-messages">
      <div class="chat-message assistant-message">
        Hello! I'm your AI financial assistant powered by Gemini. Ask me about market data, financial concepts, or recent news!
      </div>
    </div>
    <div class="chatbot-input-area">
      <input type="text" id="chatbot-input" placeholder="Ask something..." onkeypress="handleChatInput(event)">
      <button onclick="sendChatMessage()">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  </div>
</body>`;
code = code.replace(`</body>`, bodyClosing);

fs.writeFileSync('app/static/index.html', code);
console.log("index.html patched with chat UI");
