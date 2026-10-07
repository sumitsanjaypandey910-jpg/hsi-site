import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  RotateCcw, 
  Phone, 
  MessageCircle, 
  Shield, 
  TrendingUp, 
  Sparkles, 
  MapPin, 
  User, 
  Layers, 
  Coins, 
  FileText,
  ChevronDown
} from 'lucide-react';
import { COMPANY_INFO } from '../data/hsiData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: string[];
  actionType?: 'whatsapp' | 'call' | 'consult' | 'reset';
}

interface AiChatBotProps {
  onOpenConsultation: (topic?: string) => void;
}

const PRIMARY_QUESTIONS = [
  "Mutual funds",
  "Insurance (Life insurance, health insurance, general insurance)",
  "Stocks / gold",
  "Bonds",
  "HSI Comprehensive Portfolio"
];

const WELCOME_TEXT = `Namaste! 🙏 Welcome to Horizon Secure Investments.

What are you looking for today? Please choose an option below or type your question:`;

export const AiChatBot: React.FC<AiChatBotProps> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: WELCOME_TEXT,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: PRIMARY_QUESTIONS
      }
    ];
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Listen for custom event to reopen chatbot from any component
  useEffect(() => {
    const handleReopen = () => setIsOpen(true);
    window.addEventListener('hsi_open_chat', handleReopen);
    return () => window.removeEventListener('hsi_open_chat', handleReopen);
  }, []);

  const getAutoReply = (userInput: string): { replyText: string; nextOptions?: string[] } => {
    const lower = userInput.toLowerCase();

    // 1. Mutual Funds
    if (lower.includes('mutual fund') || lower.includes('sip') || lower.includes('lump') || lower.includes('swp')) {
      return {
        replyText: `📈 **Mutual Funds & SIP Wealth Planning**

At Horizon Secure Investments, we help you harness the power of compounding:
• **Disciplined SIPs** (starting from ₹500/month)
• **Lumpsum & STP** for risk-managed staggered deployment
• **SWP (Systematic Withdrawal Plan)** for tax-friendly regular monthly income
• Curated baskets across Large-Cap, Mid-Cap, Flexi-Cap & Multi-Cap funds
• Regular portfolio rebalancing and goal-aligned tracking

Would you like to start a SIP or request a free portfolio review?`,
        nextOptions: ["Request Mutual Fund Consultation", "Chat on WhatsApp", "View All Questions"]
      };
    }

    // 2. Insurance
    if (lower.includes('insurance') || lower.includes('life') || lower.includes('health') || lower.includes('mediclaim') || lower.includes('general')) {
      return {
        replyText: `🛡️ **Insurance Solutions (Life, Health & General Insurance)**

HSI partners with **all major regulated insurance companies** in India:
• **Life Insurance:** Pure Term covers, Savings, ULIP, TULIP, Pension & Child Education plans
• **Health Insurance:** Comprehensive family floater mediclaim, 1-Crore super top-up shields, critical illness covers, and cashless hospital network
• **General Insurance:** Commercial assets, fire, marine transit, factory & motor insurance
• Dedicated claims facilitation desk to support your family during emergencies

Dealing exclusively with major, trusted insurance companies for highest claim settlement security.`,
        nextOptions: ["Request Insurance Quote", "Chat on WhatsApp", "View All Questions"]
      };
    }

    // 3. Stocks / Gold
    if (lower.includes('stock') || lower.includes('gold') || lower.includes('equity') || lower.includes('etf')) {
      return {
        replyText: `📊 **Stocks & Gold Solutions**

Grow and hedge your capital with disciplined market solutions:
• **Stock Markets:** Fundamental and technical analysis, trend identification, and equity basket guidance
• **Sovereign Gold Bonds (RBI SGB):** 2.5% annual guaranteed interest + capital appreciation with zero tax on maturity
• **Gold & Silver ETFs:** Liquid, pure and stored digitally with zero making charges
• Diversified asset allocation tailored to your risk horizon.`,
        nextOptions: ["Consult on Stocks & Gold", "Chat on WhatsApp", "View All Questions"]
      };
    }

    // 4. Bonds
    if (lower.includes('bond') || lower.includes('fixed income') || lower.includes('ncd') || lower.includes('54ec')) {
      return {
        replyText: `📜 **Bonds & Fixed Income Securities**

Safety and predictable yields for your portfolio:
• **Government & PSU Bonds:** 100% sovereign safety for capital preservation
• **Capital Gain Bonds (Section 54EC):** Save tax on property sale proceeds with AAA-rated REC, PFC, NHAI bonds
• **Senior Citizen & High-Coupon Corporate Bonds:** Predictable quarterly/annual coupon payments
• Ideal for retirees, trusts, and low-volatility wealth parking.`,
        nextOptions: ["Request Bond Options", "Chat on WhatsApp", "View All Questions"]
      };
    }

    // 5. HSI Comprehensive Portfolio / Any
    if (lower.includes('comprehensive') || lower.includes('portfolio') || lower.includes('any') || lower.includes('hsi') || lower.includes('all')) {
      return {
        replyText: `🌟 **HSI Comprehensive Portfolio Planning**

We bring together **Protection + Investment + Financial Planning** under one unified approach:
• Review of your current financial position and existing policies
• Goal mapping (Retirement, Children's education, regular cashflows)
• Multi-asset allocation across Insurance, Mutual Funds, Stocks, Gold, and Bonds
• Transparent, relationship-driven guidance with zero conflict of interest.`,
        nextOptions: ["Book Free Portfolio Review", "Chat on WhatsApp", "View All Questions"]
      };
    }

    // 6. Director details
    if (lower.includes('director') || lower.includes('founder') || lower.includes('co-founder') || lower.includes('cofounder') || lower.includes('nikhil') || lower.includes('bagwe') || lower.includes('sumegh')) {
      return {
        replyText: `👔 **Leadership Team**

• **Nikhil Bagwe** — Founder
  Phone: **+91-7977661896**
  Email: **hsinvest2026@gmail.com**
  Experienced financial services professional with background at major insurance institutions and active in Mutual Funds, Stocks and Bonds since 2018.

• **Sumegh Shejwal** — Co-Founder
  Email: **hsinvest2026@gmail.com**
  Entrepreneur and businessman with manufacturing and import-export background, active in Forex, Gold, ETFs, Mutual Funds and Stock Markets.`,
        nextOptions: ["Call Founder: +91-7977661896", "Chat on WhatsApp", "View All Questions"]
      };
    }

    // 7. Address / Location
    if (lower.includes('address') || lower.includes('office') || lower.includes('location') || lower.includes('mulund') || lower.includes('where')) {
      return {
        replyText: `📍 **Office Address:**

**Horizon Secure Investments**
Office No. 124, 1st Floor, Shree Shankar Niwas, 
LBS ROAD, Near Mulund Check Naka, 
Mulund - West. Mumbai 400080. India.

• **Mobile:** +91 96199 73551
• **WhatsApp:** 7977661896
• **Email:** hsinvest2026@gmail.com
• **Hours:** Mon–Sat: 9:30 AM – 6:30 PM IST`,
        nextOptions: ["Call: +91 96199 73551", "Chat on WhatsApp", "View All Questions"]
      };
    }

    // 8. Contact / Phone
    if (lower.includes('phone') || lower.includes('number') || lower.includes('call') || lower.includes('mobile') || lower.includes('contact')) {
      return {
        replyText: `📞 **Contact Horizon Secure Investments:**

• **Primary Mobile:** **+91 96199 73551**
• **WhatsApp Number:** **7977661896**
• **Founder Contact:** **+91-7977661896** (Nikhil Bagwe)
• **Email:** **hsinvest2026@gmail.com**

Feel free to call us or message on WhatsApp anytime!`,
        nextOptions: ["Call: +91 96199 73551", "WhatsApp: 7977661896", "View All Questions"]
      };
    }

    // Default Fallback
    return {
      replyText: `Thank you for your message! 

At Horizon Secure Investments, our advisors are ready to assist you across **Mutual Funds, Insurance (Life, Health, General), Stocks, Gold, and Bonds**.

You can reach us directly:
• 📞 **Call:** +91 96199 73551
• 💬 **WhatsApp:** 7977661896
• 📧 **Email:** hsinvest2026@gmail.com`,
      nextOptions: PRIMARY_QUESTIONS
    };
  };

  const handleSelectOption = (option: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: option,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (option === "View All Questions" || option === "Start Over") {
      setMessages(prev => [
        ...prev,
        userMsg,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "What are you looking for? Please select an option:",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: PRIMARY_QUESTIONS
        }
      ]);
      return;
    }

    if (option === "Chat on WhatsApp" || option === "WhatsApp: 7977661896") {
      window.open(`https://wa.me/917977661896?text=Hello%20Horizon%20Secure%20Investments%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services`, '_blank');
      return;
    }

    if (option.includes("Call")) {
      window.location.href = "tel:+919619973551";
      return;
    }

    if (option.includes("Consultation") || option.includes("Quote") || option.includes("Review") || option.includes("Options")) {
      setIsOpen(false);
      onOpenConsultation(option);
      return;
    }

    const { replyText, nextOptions } = getAutoReply(option);

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: nextOptions
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const { replyText, nextOptions } = getAutoReply(query);

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: nextOptions
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInputValue('');
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: WELCOME_TEXT,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: PRIMARY_QUESTIONS
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger to Open or Reopen Chatbot */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0a192f] hover:bg-[#122849] text-white shadow-2xl border-2 border-orange-500/80 hover:scale-105 transition-all cursor-pointer group"
          title="Open Horizon Auto-Reply Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-orange-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border-2 border-[#0a192f]"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-black tracking-wide">Quick Assistant</div>
            <div className="text-[10px] text-orange-300 font-semibold">Auto-Reply Help</div>
          </div>
        </button>
      )}

      {/* Main Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-5 left-5 z-50 w-[92vw] sm:w-[420px] h-[560px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border-2 border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-[#0a192f] text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black tracking-wide font-heading">
                  HSI Quick Assistant
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Instant Auto-Reply Support</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Window (Can reopen anytime)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Helpline Ribbon inside Chat */}
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-[11px]">
            <a
              href="tel:+919619973551"
              className="font-bold text-slate-800 hover:text-orange-600 flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-orange-600" />
              <span>Call: +91 96199 73551</span>
            </a>
            <a
              href={`https://wa.me/917977661896`}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3 text-emerald-600" />
              <span>WhatsApp: 7977661896</span>
            </a>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>

                {/* Option Chips for auto-replies */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {msg.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(opt)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-400 text-[#0a192f] hover:text-orange-600 font-bold text-[11px] transition-all shadow-2xs cursor-pointer text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about SIP, Insurance, Bonds, Founder..."
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Note */}
          <div className="px-3 py-1.5 bg-slate-100 text-[10px] text-slate-500 text-center border-t border-slate-200">
            <span>Horizon Secure Investments • Protect. Invest. Grow.</span>
          </div>

        </div>
      )}
    </>
  );
};
