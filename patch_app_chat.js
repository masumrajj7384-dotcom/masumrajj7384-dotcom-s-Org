import fs from 'fs';

let code = fs.readFileSync('app/static/app.js', 'utf8');

const chatJs = `
// =============================================================================
// AI FINANCIAL ASSISTANT (CHATBOT)
// =============================================================================
let chatHistory = [];

function toggleChatbot() {
  const container = document.getElementById('chatbot-container');
  container.classList.toggle('hidden');
}

function handleChatInput(e) {
  if (e.key === 'Enter') {
    sendChatMessage();
  }
}

async function sendChatMessage() {
  const inputEl = document.getElementById('chatbot-input');
  const message = inputEl.value.trim();
  if (!message) return;
  
  // Clear input
  inputEl.value = '';
  
  // Add user message to UI
  appendMessage('user', message);
  
  // Create loading indicator
  const loadingId = 'msg-' + Date.now();
  appendLoading(loadingId);
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: chatHistory })
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    // Remove loading indicator
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();
    
    // Format text with marked if available, otherwise plain text
    const formattedText = typeof marked !== 'undefined' ? marked.parse(data.text) : data.text;
    
    // Add assistant message to UI
    appendMessage('assistant', formattedText, true);
    
    // Update history
    chatHistory.push({ role: 'user', text: message });
    chatHistory.push({ role: 'model', text: data.text }); // Note: gemini API uses 'model'
    
  } catch (error) {
    console.error('Chat error:', error);
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();
    appendMessage('assistant', 'Sorry, I encountered an error connecting to the AI server. Please try again.');
  }
}

function appendMessage(role, content, isHtml = false) {
  const messagesEl = document.getElementById('chatbot-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = \`chat-message \${role}-message\`;
  
  if (isHtml) {
    msgDiv.innerHTML = content;
  } else {
    msgDiv.textContent = content;
  }
  
  messagesEl.appendChild(msgDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function appendLoading(id) {
  const messagesEl = document.getElementById('chatbot-messages');
  const msgDiv = document.createElement('div');
  msgDiv.id = id;
  msgDiv.className = 'chat-message assistant-message';
  msgDiv.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Thinking...';
  messagesEl.appendChild(msgDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}
`;

code = code + '\n' + chatJs;
fs.writeFileSync('app/static/app.js', code);
console.log("app.js patched with chat logic");
