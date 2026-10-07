const openConsultationModal = (product?: string) => {
  window.dispatchEvent(new CustomEvent('open-consultation-modal', { detail: { product } }));
};

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
  actions?: Array<{ label: string; action: () => void }>;
}

const INITIAL_WELCOME_TEXT = `Namaste! 🙏 Welcome to **Horizon Secure Investments (HSI)**.

I am your **AI Financial Advisor**, backed by our 15+ years of certified wealth management and insurance advisory expertise.

I can guide you through:
- 📈 **SIP & Wealth Projections** (Equity, Debt & Hybrid Mutual Funds)
- 🛡️ **Life & Health Protection** (Term Cover, Mediclaim across 25+ Insurers)
- ⚖️ **Smart Tax Deductions** (Maximizing Sec 80C, 80D & 54EC)
- 🏢 **Fractional Real Estate** (Commercial Pre-Leased 8-10% rental yield)
- 🥇 **Fixed Income & Bonds** (RBI Sovereign Gold Bonds, Corporate FDs)

What financial goal would you like to plan today?`;

export function initChatBot() {
  // Prevent duplicate mounts
  if (document.getElementById('hsiChatBotContainer')) return;

  // Create Container
  const container = document.createElement('div');
  container.id = 'hsiChatBotContainer';
  container.className = 'fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end pointer-events-auto font-sans';

  container.innerHTML = `
    <!-- SPEECH BUBBLE CALLOUT (Auto-shows to invite user) -->
    <div id="chatGreetingBubble" class="mb-3 max-w-[280px] bg-white rounded-2xl p-3.5 shadow-xl border-2 border-amber-300 text-slate-900 text-xs flex items-start gap-2.5 transform transition-all duration-300 animate-bounce-subtle cursor-pointer hover:border-amber-500">
      <div class="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-sm shadow-2xs">
        ✨
      </div>
      <div class="flex-1">
        <p class="font-extrabold text-slate-950 leading-tight">Need financial advice?</p>
        <p class="text-[11px] text-slate-600 mt-0.5 leading-snug">Ask our AI Advisor about SIPs, Term Insurance, or Tax Saving!</p>
      </div>
      <button id="closeGreetingBubbleBtn" class="text-slate-400 hover:text-slate-800 text-xs font-black p-0.5 cursor-pointer" title="Dismiss">✕</button>
    </div>

    <!-- FLOATING ACTION BUTTON (TRIGGER) -->
    <div class="flex items-center gap-2">
      <button id="chatTriggerBtn" class="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-amber-300 cursor-pointer">
        <!-- Glowing pulse ring -->
        <span class="absolute -inset-1 rounded-full bg-yellow-400/40 animate-ping pointer-events-none opacity-75"></span>
        
        <!-- Bot / Sparkle Icon -->
        <span class="relative w-7 h-7 rounded-full bg-white flex items-center justify-center text-amber-950 font-black text-sm shadow-xs group-hover:rotate-12 transition-transform">
          🤖
        </span>
        <div class="relative text-left leading-tight">
          <div class="text-[13px] tracking-wide font-black">Ask AI Advisor</div>
          <div class="text-[9.5px] text-amber-950 font-bold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Online 24/7
          </div>
        </div>
      </button>
    </div>

    <!-- CHAT WINDOW (POPUP DRAWER) -->
    <div id="chatWindow" class="hidden fixed bottom-5 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[82vh] max-h-[620px] bg-white rounded-3xl shadow-2xl border-2 border-amber-300 flex flex-col overflow-hidden z-50 transition-all duration-300">
      
      <!-- CHAT HEADER -->
      <div class="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-3.5 sm:p-4 text-slate-950 flex items-center justify-between border-b border-amber-300 shrink-0 shadow-xs">
        <div class="flex items-center gap-2.5">
          <div class="relative w-9 h-9 rounded-2xl bg-white border border-amber-300 flex items-center justify-center text-lg shadow-xs">
            ✨
            <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h3 class="text-sm font-black font-heading leading-tight tracking-wide">Horizon AI Advisor</h3>
              <span class="text-[9px] bg-amber-950 text-yellow-300 px-1.5 py-0.2 rounded-md font-bold uppercase tracking-wider">Gemini</span>
            </div>
            <p class="text-[10.5px] text-amber-950 font-semibold leading-tight mt-0.5">Protect. Invest. Grow. Assistant</p>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <!-- Reset / New Chat -->
          <button id="chatResetBtn" class="w-8 h-8 rounded-xl bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center text-xs font-black cursor-pointer transition-colors" title="Start New Conversation">
            🔄
          </button>
          <!-- Close / Minimize -->
          <button id="chatCloseBtn" class="w-8 h-8 rounded-xl bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center text-sm font-black cursor-pointer transition-colors" title="Minimize Chat">
            ✕
          </button>
        </div>
      </div>

      <!-- QUICK SUGGESTIONS CAROUSEL -->
      <div class="bg-amber-50/70 p-2.5 border-b border-amber-200/80 shrink-0 overflow-x-auto scrollbar-none flex items-center gap-1.5 text-xs">
        <span class="text-[10px] font-black text-amber-900 uppercase tracking-wider shrink-0 mr-1">Quick:</span>
        <button class="quick-prompt-btn px-2.5 py-1 rounded-full bg-white hover:bg-yellow-100 text-slate-800 border border-amber-300 text-[11px] font-bold whitespace-nowrap cursor-pointer transition-all shadow-2xs">
          💡 Best SIP for ₹5,000/mo
        </button>
        <button class="quick-prompt-btn px-2.5 py-1 rounded-full bg-white hover:bg-yellow-100 text-slate-800 border border-amber-300 text-[11px] font-bold whitespace-nowrap cursor-pointer transition-all shadow-2xs">
          🛡️ Term vs Health Cover
        </button>
        <button class="quick-prompt-btn px-2.5 py-1 rounded-full bg-white hover:bg-yellow-100 text-slate-800 border border-amber-300 text-[11px] font-bold whitespace-nowrap cursor-pointer transition-all shadow-2xs">
          📉 Save Tax (80C & 80D)
        </button>
        <button class="quick-prompt-btn px-2.5 py-1 rounded-full bg-white hover:bg-yellow-100 text-slate-800 border border-amber-300 text-[11px] font-bold whitespace-nowrap cursor-pointer transition-all shadow-2xs">
          🏢 Fractional Real Estate
        </button>
      </div>

      <!-- MESSAGES FEED -->
      <div id="chatMessagesFeed" class="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs">
        <!-- Messages rendered dynamically here -->
      </div>

      <!-- TYPING INDICATOR -->
      <div id="chatTypingIndicator" class="hidden px-4 py-2 bg-slate-50/90 border-t border-amber-100 flex items-center gap-2 text-[11px] text-amber-900 font-semibold shrink-0">
        <div class="flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></span>
        </div>
        <span>Horizon AI is analyzing financial options...</span>
      </div>

      <!-- CHAT INPUT -->
      <div class="p-3 bg-white border-t border-amber-200 shrink-0">
        <form id="chatInputForm" class="flex items-center gap-2">
          <input 
            type="text" 
            id="chatMessageInput" 
            placeholder="Ask about SIP, Insurance, Tax Saving, Bonds..." 
            class="flex-1 px-3.5 py-2.5 bg-amber-50/40 rounded-2xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-xs font-medium text-slate-900 placeholder:text-slate-400"
            autocomplete="off"
          />
          <button 
            type="submit" 
            id="chatSendBtn"
            class="w-9 h-9 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm hover:scale-105 transition-all cursor-pointer shrink-0 disabled:opacity-50"
            title="Send Message"
          >
            ➤
          </button>
        </form>

        <div class="mt-2 flex items-center justify-between text-[10px] text-slate-600 px-1 font-medium">
          <span>Informational estimates • Protect. Invest. Grow.</span>
          <button id="chatConsultShortcutBtn" class="text-amber-800 font-bold hover:underline cursor-pointer">
            Book Human Advisor →
          </button>
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(container);

  // --- STATE ---
  let isOpen = false;
  let isSending = false;
  let messages: ChatMessage[] = [];

  // Load past history or init with welcome
  const saved = localStorage.getItem('hsi_chat_messages');
  if (saved) {
    try {
      messages = JSON.parse(saved);
    } catch {
      messages = [];
    }
  }

  if (messages.length === 0) {
    messages.push({
      id: 'welcome-msg',
      role: 'model',
      text: INITIAL_WELCOME_TEXT,
      time: getCurrentTime(),
    });
  }

  // --- DOM ELEMENTS ---
  const greetingBubble = document.getElementById('chatGreetingBubble')!;
  const closeGreetingBtn = document.getElementById('closeGreetingBubbleBtn')!;
  const triggerBtn = document.getElementById('chatTriggerBtn')!;
  const chatWindow = document.getElementById('chatWindow')!;
  const closeBtn = document.getElementById('chatCloseBtn')!;
  const resetBtn = document.getElementById('chatResetBtn')!;
  const feed = document.getElementById('chatMessagesFeed')!;
  const typingIndicator = document.getElementById('chatTypingIndicator')!;
  const form = document.getElementById('chatInputForm') as HTMLFormElement;
  const input = document.getElementById('chatMessageInput') as HTMLInputElement;
  const sendBtn = document.getElementById('chatSendBtn') as HTMLButtonElement;
  const consultShortcut = document.getElementById('chatConsultShortcutBtn')!;

  // Render initial messages
  renderMessages();

  // --- EVENT LISTENERS ---
  greetingBubble.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'closeGreetingBubbleBtn') return;
    openChat();
  });

  closeGreetingBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    greetingBubble.classList.add('hidden');
    sessionStorage.setItem('hsi_greeting_dismissed', 'true');
  });

  if (sessionStorage.getItem('hsi_greeting_dismissed') === 'true') {
    greetingBubble.classList.add('hidden');
  }

  triggerBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', closeChat);

  resetBtn.addEventListener('click', () => {
    if (confirm('Start a fresh conversation with Horizon AI Advisor?')) {
      messages = [
        {
          id: 'welcome-' + Date.now(),
          role: 'model',
          text: INITIAL_WELCOME_TEXT,
          time: getCurrentTime(),
        },
      ];
      saveMessages();
      renderMessages();
    }
  });

  consultShortcut.addEventListener('click', () => {
    closeChat();
    openConsultationModal('Financial Planning Advisory (via AI)');
  });

  // Quick prompt buttons
  container.querySelectorAll('.quick-prompt-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.textContent?.replace(/^[^\w]+/, '').trim() || '';
      if (text) {
        handleUserSend(text);
      }
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (val && !isSending) {
      handleUserSend(val);
      input.value = '';
    }
  });

  // Wire any external buttons with [data-open-ai-chat]
  document.querySelectorAll('[data-open-ai-chat]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const prompt = (el as HTMLElement).getAttribute('data-prompt') || '';
      openChat(prompt);
    });
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeChat();
    }
  });

  // --- FUNCTIONS ---
  function openChat(presetPrompt?: string) {
    isOpen = true;
    chatWindow.classList.remove('hidden');
    greetingBubble.classList.add('hidden');
    setTimeout(() => {
      input.focus();
      scrollFeedToBottom();
    }, 100);

    if (presetPrompt) {
      handleUserSend(presetPrompt);
    }
  }

  function closeChat() {
    isOpen = false;
    chatWindow.classList.add('hidden');
  }

  function toggleChat() {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  async function handleUserSend(userText: string) {
    if (!userText.trim() || isSending) return;

    // Append user message
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text: userText,
      time: getCurrentTime(),
    };

    messages.push(userMsg);
    saveMessages();
    renderMessages();
    scrollFeedToBottom();

    // Prepare API request
    isSending = true;
    sendBtn.disabled = true;
    typingIndicator.classList.remove('hidden');
    scrollFeedToBottom();

    try {
      // Build past history context for the API
      const historyPayload = messages
        .filter((m) => m.id !== userMsg.id)
        .slice(-6)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || 'I received your query. How else may I assist with your financial portfolio?';

      // Attach contextual quick actions based on response topic
      const actions: Array<{ label: string; action: () => void }> = [];
      const lowerReply = replyText.toLowerCase();

      if (lowerReply.includes('sip') || lowerReply.includes('mutual fund') || lowerReply.includes('calculator')) {
        actions.push({
          label: '🧮 Open SIP Calculator',
          action: () => {
            closeChat();
            const calcSection = document.getElementById('calculators');
            calcSection?.scrollIntoView({ behavior: 'smooth' });
          },
        });
      }

      if (lowerReply.includes('insurance') || lowerReply.includes('term') || lowerReply.includes('health')) {
        actions.push({
          label: '🛡️ Open Insurance Calculator',
          action: () => {
            closeChat();
            const insTab = document.querySelector('[data-calc="ins"]') as HTMLElement;
            insTab?.click();
            const calcSection = document.getElementById('calculators');
            calcSection?.scrollIntoView({ behavior: 'smooth' });
          },
        });
      }

      // Always offer consultation advisory
      actions.push({
        label: '📅 Book Free Advisory',
        action: () => {
          closeChat();
          openConsultationModal(`Advisory requested via AI for: "${userText.slice(0, 35)}..."`);
        },
      });

      const modelMsg: ChatMessage = {
        id: 'msg-' + Date.now(),
        role: 'model',
        text: replyText,
        time: getCurrentTime(),
        actions,
      };

      messages.push(modelMsg);
      saveMessages();
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback friendly message
      const fallbackMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'model',
        text: `Thank you for asking about "${userText}".\n\nOur advisors can personally review your portfolio requirements and provide customized projections. Would you like to schedule a quick consultation?`,
        time: getCurrentTime(),
        actions: [
          {
            label: '📅 Book Consultation with Advisor',
            action: () => {
              closeChat();
              openConsultationModal(`Consultation: ${userText}`);
            },
          },
        ],
      };
      messages.push(fallbackMsg);
      saveMessages();
    } finally {
      isSending = false;
      sendBtn.disabled = false;
      typingIndicator.classList.add('hidden');
      renderMessages();
      scrollFeedToBottom();
    }
  }

  function renderMessages() {
    feed.innerHTML = messages
      .map((msg, index) => {
        const isUser = msg.role === 'user';
        const formattedHtml = parseMarkdown(msg.text);

        return `
          <div class="flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1 animate-fade-in">
            <div class="flex items-start gap-2 max-w-[88%] ${isUser ? 'flex-row-reverse' : 'flex-row'}">
              ${
                isUser
                  ? ''
                  : `<div class="w-6 h-6 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs mt-1">
                      ✨
                    </div>`
              }
              <div class="p-3 rounded-2xl ${
                isUser
                  ? 'bg-gradient-to-r from-slate-950 to-slate-900 text-amber-100 rounded-tr-xs shadow-sm border border-amber-500/30'
                  : 'bg-white text-slate-900 rounded-tl-xs shadow-sm border border-amber-200/90'
              }">
                <div class="prose prose-xs max-w-none leading-relaxed text-[11.5px] space-y-1.5 break-words">
                  ${formattedHtml}
                </div>

                ${
                  !isUser && msg.actions && msg.actions.length > 0
                    ? `
                    <div class="mt-3 pt-2 border-t border-amber-100 flex flex-wrap gap-1.5">
                      ${msg.actions
                        .map(
                          (act, aIdx) => `
                        <button class="chat-action-btn px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-gradient-to-r from-amber-100 to-yellow-100 hover:from-amber-200 hover:to-yellow-200 text-amber-950 border border-amber-300 transition-all cursor-pointer shadow-2xs" data-msg-idx="${index}" data-act-idx="${aIdx}">
                          ${act.label}
                        </button>
                      `
                        )
                        .join('')}
                    </div>
                  `
                    : ''
                }
              </div>
            </div>
            <span class="text-[9.5px] text-slate-600 px-1 font-medium ${isUser ? 'text-right' : 'text-left'}">${msg.time}</span>
          </div>
        `;
      })
      .join('');

    // Attach dynamic click events to message action buttons
    feed.querySelectorAll('.chat-action-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mIdx = parseInt(btn.getAttribute('data-msg-idx') || '-1');
        const aIdx = parseInt(btn.getAttribute('data-act-idx') || '-1');
        if (mIdx >= 0 && aIdx >= 0 && messages[mIdx]?.actions?.[aIdx]) {
          messages[mIdx].actions![aIdx].action();
        }
      });
    });
  }

  function scrollFeedToBottom() {
    feed.scrollTop = feed.scrollHeight;
  }

  function saveMessages() {
    localStorage.setItem('hsi_chat_messages', JSON.stringify(messages.slice(-20)));
  }

  function getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Lightweight safe markdown parser
  function parseMarkdown(text: string): string {
    let raw = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headers
    raw = raw.replace(/^### (.*$)/gim, '<h4 class="font-black text-amber-950 text-xs mt-1.5 mb-1">$1</h4>');
    raw = raw.replace(/^## (.*$)/gim, '<h3 class="font-black text-amber-950 text-xs mt-2 mb-1">$1</h3>');

    // Bold
    raw = raw.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-amber-950">$1</strong>');
    // Italic
    raw = raw.replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>');

    // Unordered lists
    raw = raw.replace(/^\s*-\s+(.*$)/gim, '<li class="flex items-start gap-1.5"><span class="text-amber-600 font-bold">•</span><span>$1</span></li>');

    // Ordered lists
    raw = raw.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="flex items-start gap-1.5"><strong class="text-amber-700 font-black">$1.</strong><span>$2</span></li>');

    // Convert line breaks to paragraphs/breaks
    raw = raw.replace(/\n\n/g, '<div class="h-1.5"></div>');
    raw = raw.replace(/\n/g, '<br/>');

    return raw;
  }
}
