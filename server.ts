import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const HSI_SYSTEM_INSTRUCTION = `You are "Horizon AI Financial Advisor", the certified virtual wealth and risk consultant for "Horizon Secure Investments" (HSI) - Securing Tomorrow's Wealth.

Company Context & Credentials:
- Established: 15+ years experience serving Indian investors.
- Scale: ₹650+ Crores in Assets Under Management (AUM), 18,500+ satisfied families & clients, 350+ certified sub-broker network across India.
- Head Office: Horizon Financial Tower, 4th Floor, BKC (Bandra-Kurla Complex), Mumbai - 400051.
- Regulatory Registrations: AMFI Registered Mutual Fund Distributor ARN-284910 | IRDAI Corporate Agent Reg. CA-0821/2022.
- Contact: Phone +91 98200 12345, Toll-Free 1800 209 8899, Email contact@horizonsecureinvestments.com.

Our Full Suite of Services:
1. Mutual Funds: Equity (Large, Mid, Small, Flexi-cap), Debt, Hybrid, Index funds, SIP (starting ₹500/mo), Lumpsum, SWP (Tax-efficient monthly cash flow for retirees), STP. ELSS for Section 80C tax saving.
2. Insurance:
   - Term Life Insurance (Sum Assured ₹25L to ₹5+ Cr, pure risk cover, tax deductions up to ₹1.5L under Sec 80C).
   - Comprehensive Health Mediclaim (Sum Insured ₹5L to ₹1+ Cr, cashless across 10,000+ network hospitals, tax deductions up to ₹25,000 under Sec 80D, plus ₹50,000 for senior citizen parents).
   - Critical Illness rider, Motor, Marine, Property & Cyber Insurance. Partnered with 25+ leading insurers (HDFC ERGO, Star Health, ICICI Lombard, Care, Tata AIG, Max Life, LIC).
3. Real Estate & Fractional Property: Grade-A pre-leased commercial real estate (BKC, Bengaluru, Pune tech parks) with 8-10% rental yield, minimum entry from ₹10-25 Lakhs, quarterly dividend payouts + capital appreciation.
4. Fixed Income, Bonds & Deposits: RBI Sovereign Gold Bonds (SGB - 2.5% p.a. + gold appreciation, capital gains tax-free on maturity), 54EC Capital Gains Bonds, Corporate FDs up to 8.75% p.a.
5. Equities, PMS & Pre-IPO Shares: Direct equity advisory, Portfolio Management Services (PMS for ₹50L+ HNWIs), Alternative Investment Funds (AIF), Unlisted Pre-IPO equity opportunities.
6. Loans & MSME Syndication: Home Loans, Loan Against Property (LAP), Loan Against Securities (LAS), MSME Working Capital.

Your Behavior & Style:
- Tone: Extremely cordial, knowledgeable, reassuring, precise, and transparent.
- Language: Professional English (warm Indian financial vocabulary: Lakhs, Crores, SIP, 80C, 80D, LTCG).
- Formatting: Use structured Markdown with crisp bullet points, bold key terms, and neat summaries.
- Calculations: When users ask about SIP returns, EMI, or insurance cover requirements (Rule of thumb: 10x to 15x annual income for Term Insurance), calculate accurately and show brief step-by-step logic.
- Ethical boundary: State that advice is educational and tailored to general Indian financial planning norms; encourage users to book a free 1-on-1 portfolio review with our certified AMFI/IRDAI wealth planners for bespoke execution.
- Offer actionable next steps (e.g. "Would you like me to guide you on setting up an SIP or calculate your exact tax deduction?").`;

// Fallback responses when API key is unconfigured or rate-limited
function getKnowledgeBaseFallback(userQuery: string): string {
  const q = userQuery.toLowerCase();

  if (q.includes('sip') || q.includes('mutual fund') || q.includes('5000') || q.includes('invest')) {
    return `### Recommended SIP Investment Strategy (Horizon Secure Investments)

Starting a disciplined **Systematic Investment Plan (SIP)** is the most proven path to long-term wealth creation in India:

1. **Power of Compounding**:
   - An SIP of **₹5,000/month** at an assumed 12% CAGR over **15 years**:
     - Total Invested: **₹9,00,000**
     - Estimated Maturity: **~₹25,22,880** (Gains: ~₹16,22,880).
2. **Suggested Portfolio Allocation**:
   - **40% Large Cap / Index Fund** (e.g., Nifty 50) for solid stability.
   - **35% Flexi-Cap / Mid-Cap Fund** for outperforming alpha.
   - **25% Small-Cap Fund** for aggressive compounding over 7+ years.
3. **Tax Efficiency**:
   - Long-Term Capital Gains (LTCG) over ₹1.25 Lakh/year are taxed at just 12.5%.
   - Want tax deductions under Sec 80C? Consider **ELSS Mutual Funds** with only a 3-year lock-in!

*Ready to allocate your portfolio? Click **Book Consultation** to review curated fund baskets with our AMFI ARN-284910 certified advisors.*`;
  }

  if (q.includes('insurance') || q.includes('term') || q.includes('health') || q.includes('cover') || q.includes('mediclaim')) {
    return `### Comprehensive Insurance Blueprint (HSI Protection Shield)

A complete family safety net requires two non-negotiable pillars:

1. **Term Life Insurance (Income Replacement)**:
   - **Rule of Thumb**: 10x to 15x your annual gross income. (e.g., if you earn ₹10 Lakhs/year, take at least **₹1.5 Crores** cover).
   - **Tax Benefit**: Premiums qualify for **Section 80C** deduction up to ₹1,50,000/year.
   - **Cost**: A healthy 30-year-old non-smoker can secure ₹1 Crore cover for as low as **~₹750 - ₹950/month**.

2. **Comprehensive Health Mediclaim (Hospitalization Guard)**:
   - Recommended minimum base: **₹10 Lakhs to ₹25 Lakhs** with Restore / Super Top-up benefits.
   - Cashless access across **10,000+ top hospitals** in India.
   - **Tax Benefit**: **Section 80D** tax deduction up to ₹25,000 for self/family, plus up to ₹50,000 for senior parents.

*HSI is an IRDAI licensed corporate partner with 25+ top insurers including HDFC ERGO, Star Health, ICICI Lombard, and Max Life with dedicated claim-assistance support.*`;
  }

  if (q.includes('tax') || q.includes('80c') || q.includes('80d') || q.includes('save tax')) {
    return `### Smart Tax Optimization Strategies for FY 2024-25 / FY 2025-26

Here is how you can legally maximize tax savings under the Old & New Tax Regimes:

1. **Section 80C (Up to ₹1.5 Lakh Deductions)**:
   - **ELSS Mutual Funds**: Highest return potential with the shortest lock-in (3 years).
   - **Term Insurance Premiums**: Pure life cover tax exemption.
   - **PPF / EPF / NPS Tier-1**: Stable government-backed avenues.
2. **Section 80D (Up to ₹75,000 - ₹1,00,000 for Health)**:
   - Self & Family Health Insurance: Up to **₹25,000** deduction.
   - Senior Citizen Parents: Additional deduction up to **₹50,000**.
   - Annual Preventive Health Check-up: Up to ₹5,000 included in the limits.
3. **Section 80CCD(1B) (NPS Extra ₹50,000)**:
   - Exclusive deduction over and above the ₹1.5L 80C limit!
4. **Capital Gains Exemption (Section 54EC)**:
   - Save capital gains tax from real estate sale via REC/PFC bonds.

*Would you like a personalized tax-saving computation for your salary or business income?*`;
  }

  if (q.includes('real estate') || q.includes('fractional') || q.includes('property')) {
    return `### Fractional Real Estate Investing with HSI

**Commercial Grade-A Fractional Ownership** lets retail investors own high-yielding corporate tech parks and warehouses:

- **Entry Ticket**: Starting from ₹10 Lakhs to ₹25 Lakhs (compared to ₹15+ Crores for full assets).
- **Rental Yield**: **8% to 10% annual rental return**, disbursed quarterly into your bank account.
- **Capital Growth**: Targeted internal rate of return (IRR) of **14% to 17%** over a 5-year horizon.
- **Tenants**: Pre-leased to Fortune 500 multinationals and Blue-chip companies with 9-year lock-ins.
- **SEBI Framework**: Managed under SM REIT (Small and Medium Real Estate Investment Trusts) regulations.

*Contact our Wealth Advisory desk to inspect ongoing property tranches in BKC Mumbai and Bengaluru.*`;
  }

  if (q.includes('gold') || q.includes('sgb') || q.includes('sovereign')) {
    return `### Gold & Sovereign Gold Bonds (SGB) Advisory

Gold serves as the ultimate geopolitical hedge and inflation protector in an Indian investment portfolio:

1. **Sovereign Gold Bonds (RBI SGBs)**:
   - **Annual Interest**: **2.50% per annum** credited semi-annually directly to your bank account.
   - **Tax-Free Capital Gains**: 100% exempt from capital gains tax if held until full 8-year maturity!
   - **Zero Making Charges & Zero Storage Risks**: 100% sovereign guarantee backed by the Government of India.
2. **Digital Gold & Gold ETFs**:
   - High liquidity, traded directly on NSE/BSE, backing with 99.5% pure physical gold.
3. **Ideal Portfolio Allocation**:
   - We recommend allocating **5% to 10%** of your total liquid net worth to Gold instruments.

*HSI assists clients in buying primary RBI issuances as well as secondary-market tranches.*`;
  }

  if (q.includes('loan') || q.includes('lap') || q.includes('home loan') || q.includes('mortgage') || q.includes('credit')) {
    return `### Institutional Credit & Loan Solutions at HSI

Horizon Secure Investments partners with **15+ premier private banks and NBFCs** (including HDFC Bank, ICICI Bank, Axis Bank, and Bajaj Housing Finance):

- **Home Loans**: Competitive floating rates starting from **8.40% p.a.** with minimal processing turnaround.
- **Loan Against Property (LAP)**: Unlock equity up to **70% of market value** for business expansion or working capital.
- **Loan Against Securities (LAS)**: Get immediate credit without selling your Mutual Funds or Shares (keep earning returns!).
- **Business / MSME Working Capital**: Unsecured and secured project funding up to ₹25 Crores.

*Want a comparative rate quote across multiple banks? Schedule a session with our lending desk.*`;
  }

  if (q.includes('retirement') || q.includes('pension') || q.includes('swp') || q.includes('senior')) {
    return `### Retirement Planning & Systematic Withdrawal Plans (SWP)

Achieving financial independence and retiring comfortably requires a structured dual-engine strategy:

1. **Accumulation Phase (Pre-Retirement)**:
   - Equity Mutual Fund SIPs + National Pension Scheme (NPS Tier-1 for additional ₹50,000 tax deduction under Sec 80CCD(1B)).
2. **Distribution Phase (Post-Retirement)**:
   - **Systematic Withdrawal Plan (SWP)**: Generate a predictable, monthly tax-efficient "salary" while your remaining principal keeps compounding.
   - Example: A ₹1 Crore corpus in a Conservative Hybrid Fund with an **8% annual SWP** generates **~₹66,000/month tax-efficient cash flow**.
3. **Health Contingency**:
   - Senior Citizen Mediclaim with high sum-insured (₹25L+) and zero sub-limits.

*Click "Book Consultation" to get a customized retirement corpus timeline calculated for your target retirement age.*`;
  }

  if (q.includes('fd') || q.includes('fixed deposit') || q.includes('bonds') || q.includes('interest')) {
    return `### High-Yield Fixed Income & Corporate Fixed Deposits

Enhance your debt yields with AAA & AA+ rated corporate deposits and RBI-regulated bonds:

- **Corporate FDs (Bajaj Finance, Shriram, Mahindra)**: Yields up to **8.40% - 8.85% p.a.**, offering 0.25% to 0.50% extra for senior citizens.
- **54EC Capital Gains Bonds (REC, PFC, IRFC)**: Save up to ₹50 Lakhs capital gains tax from real estate sale with 5.25% annual coupon.
- **Government G-Secs & Treasury Bills**: Sovereign safety with competitive yields.

*All fixed income products are digitally subscribed with direct electronic bank mandate.*`;
  }

  // Default general overview
  return `### Hello! Welcome to Horizon Secure Investments (HSI)

I am your **AI Financial Advisor**, ready to assist you with:
- 📈 **Wealth Creation**: Mutual Funds (SIP / Lumpsum), Equities & PMS.
- 🛡️ **Risk Protection**: Term Life & Comprehensive Health Insurance (25+ Partners).
- 🏢 **Alternative Assets**: Pre-leased Fractional Commercial Real Estate (8-10% Yield).
- 💰 **Fixed Income**: RBI Sovereign Gold Bonds (SGB), 54EC, Corporate FDs up to 8.85%.
- ⚖️ **Tax Optimization**: Maximizing Sec 80C, 80D, and Capital Gains exemptions.

Feel free to ask a question like *"How much SIP should I do for a ₹1 Crore corpus?"*, *"What is the difference between Term and Health insurance?"*, or *"How can I save tax under 80C?"*!`;
}

// API Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Horizon Secure Investments AI Advisor API',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
  });
});

// AI Chatbot Route
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message parameter is required.' });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Return grounded high quality fallback answer
      const fallbackReply = getKnowledgeBaseFallback(message);
      res.json({
        reply: fallbackReply,
        source: 'knowledge-base',
      });
      return;
    }

    // Build chat contents history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      // Keep last 6 exchanges to maintain context without overloading
      const recentHistory = history.slice(-6);
      for (const turn of recentHistory) {
        if (turn && (turn.role === 'user' || turn.role === 'model') && turn.text) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text }],
          });
        }
      }
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    // Timeout guard: 4500ms max so user never experiences lag
    const apiCall = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: HSI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('GEMINI_API_TIMEOUT')), 4500)
    );

    const response = await Promise.race([apiCall, timeoutPromise]);
    const textOutput = response.text || getKnowledgeBaseFallback(message);

    res.json({
      reply: textOutput,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Gemini Chat fallback triggered:', error?.message || error);
    const fallbackReply = getKnowledgeBaseFallback(req.body?.message || '');
    res.json({
      reply: fallbackReply,
      source: 'fallback-on-error',
      note: 'Processed via HSI financial knowledge model.',
    });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HSI Application & AI Advisor running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
