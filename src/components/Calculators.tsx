import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake, 
  ShieldAlert, 
  BadgeIndianRupee,
  Users,
  CheckCircle2
} from 'lucide-react';

interface CalculatorsProps {
  onPlanGoal: (details: string) => void;
}

export const Calculators: React.FC<CalculatorsProps> = ({ onPlanGoal }) => {
  const [calcType, setCalcType] = useState<'sip' | 'lumpsum' | 'loan' | 'insurance'>('sip');

  // SIP States
  const [sipMonthly, setSipMonthly] = useState<number>(10000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(15);

  // Lumpsum States
  const [lumpAmount, setLumpAmount] = useState<number>(200000);
  const [lumpRate, setLumpRate] = useState<number>(12);
  const [lumpYears, setLumpYears] = useState<number>(10);

  // Loan EMI States
  const [loanAmount, setLoanAmount] = useState<number>(3000000); // 30 Lakhs
  const [loanRate, setLoanRate] = useState<number>(8.75);
  const [loanYears, setLoanYears] = useState<number>(20);

  // Insurance Calculator States
  const [insType, setInsType] = useState<'term' | 'health'>('term');
  // Term Life States
  const [userAge, setUserAge] = useState<number>(32);
  const [annualIncome, setAnnualIncome] = useState<number>(1200000); // 12 Lakhs/year
  const [liabilities, setLiabilities] = useState<number>(2500000); // 25 Lakhs loans
  const [existingCover, setExistingCover] = useState<number>(500000); // 5 Lakhs existing
  const [dependents, setDependents] = useState<number>(2);

  // Health Insurance States
  const [healthFamilyType, setHealthFamilyType] = useState<'individual' | 'couple' | 'family2_1' | 'family2_2' | 'parents'>('family2_1');
  const [eldestAge, setEldestAge] = useState<number>(35);
  const [cityTier, setCityTier] = useState<'tier1' | 'tier2'>('tier1');

  // SIP Calculation
  const sipResult = useMemo(() => {
    const monthlyRate = sipRate / 12 / 100;
    const months = sipYears * 12;
    const totalInvested = sipMonthly * months;
    
    let totalMaturity = 0;
    if (monthlyRate > 0) {
      totalMaturity =
        sipMonthly *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    } else {
      totalMaturity = totalInvested;
    }
    const wealthGained = totalMaturity - totalInvested;
    return {
      totalInvested: Math.round(totalInvested),
      wealthGained: Math.round(wealthGained),
      totalMaturity: Math.round(totalMaturity),
    };
  }, [sipMonthly, sipRate, sipYears]);

  // Lumpsum Calculation
  const lumpResult = useMemo(() => {
    const totalInvested = lumpAmount;
    const totalMaturity = lumpAmount * Math.pow(1 + lumpRate / 100, lumpYears);
    const wealthGained = totalMaturity - totalInvested;
    return {
      totalInvested: Math.round(totalInvested),
      wealthGained: Math.round(wealthGained),
      totalMaturity: Math.round(totalMaturity),
    };
  }, [lumpAmount, lumpRate, lumpYears]);

  // Loan EMI Calculation
  const loanResult = useMemo(() => {
    const r = loanRate / 12 / 100;
    const n = loanYears * 12;
    let emi = 0;
    if (r > 0) {
      emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = loanAmount / n;
    }
    const totalPayable = emi * n;
    const totalInterest = totalPayable - loanAmount;
    return {
      monthlyEmi: Math.round(emi),
      principal: Math.round(loanAmount),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
    };
  }, [loanAmount, loanRate, loanYears]);

  // Insurance Calculation (HLV & Health)
  const insuranceResult = useMemo(() => {
    if (insType === 'term') {
      // HLV Multiple based on Age
      let incomeMultiplier = 20;
      if (userAge < 35) incomeMultiplier = 20;
      else if (userAge < 45) incomeMultiplier = 15;
      else if (userAge < 55) incomeMultiplier = 10;
      else incomeMultiplier = 7;

      const idealGrossCover = (annualIncome * incomeMultiplier) + liabilities;
      const netRecommendedCover = Math.max(5000000, idealGrossCover - existingCover);

      // Estimated Monthly Premium across 25+ insurers (rates roughly ₹450 - ₹1500/mo per Cr for non-smoker)
      const basePerCrore = userAge < 30 ? 650 : userAge < 40 ? 950 : userAge < 50 ? 1750 : 3200;
      const croreUnits = netRecommendedCover / 10000000;
      const estimatedMonthlyPremium = Math.round(basePerCrore * croreUnits);
      const estimatedAnnualPremium = estimatedMonthlyPremium * 12;

      return {
        recommendedSumAssured: netRecommendedCover,
        monthlyPremium: estimatedMonthlyPremium,
        annualPremium: estimatedAnnualPremium,
        incomeMultiple: incomeMultiplier,
        taxBenefit80C: Math.min(150000, estimatedAnnualPremium)
      };
    } else {
      // Health Insurance Recommended Structure
      let baseMediclaim = 1000000; // 10 Lakhs Base
      let superTopUp = 9000000;   // 90 Lakhs Super Topup (Total 1 Crore)
      let baseAnnualPremium = 14000;

      if (healthFamilyType === 'individual') {
        baseAnnualPremium = eldestAge < 35 ? 7500 : eldestAge < 50 ? 12000 : 22000;
      } else if (healthFamilyType === 'couple') {
        baseAnnualPremium = eldestAge < 35 ? 12500 : eldestAge < 50 ? 19000 : 32000;
      } else if (healthFamilyType === 'family2_1' || healthFamilyType === 'family2_2') {
        baseAnnualPremium = eldestAge < 35 ? 17500 : eldestAge < 50 ? 26000 : 42000;
      } else {
        baseMediclaim = 1500000;
        superTopUp = 8500000;
        baseAnnualPremium = eldestAge < 60 ? 34000 : 54000;
      }

      if (cityTier === 'tier1') {
        baseAnnualPremium = Math.round(baseAnnualPremium * 1.15);
      }

      const totalCoverage = baseMediclaim + superTopUp;
      const maxTax80D = healthFamilyType === 'parents' ? 50000 : 25000;

      return {
        recommendedBase: baseMediclaim,
        recommendedTopup: superTopUp,
        totalCoverage,
        annualPremium: baseAnnualPremium,
        monthlyEquivalent: Math.round(baseAnnualPremium / 12),
        taxBenefit80D: Math.min(maxTax80D, baseAnnualPremium)
      };
    }
  }, [insType, userAge, annualIncome, liabilities, existingCover, dependents, healthFamilyType, eldestAge, cityTier]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="calculators" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Financial & Insurance Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Calculate Your Wealth & Protection Plan
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Visualize compounding returns on your Mutual Fund SIPs, analyze loan EMIs, or calculate your exact Term Life and Family Health cover with keyboard input precision.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-xs gap-1">
            <button
              data-calc="sip"
              onClick={() => setCalcType('sip')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                calcType === 'sip'
                  ? 'bg-[#0a192f] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              📈 SIP Wealth
            </button>
            <button
              data-calc="lump"
              onClick={() => setCalcType('lumpsum')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                calcType === 'lumpsum'
                  ? 'bg-[#0a192f] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              💰 Lumpsum
            </button>
            <button
              data-calc="loan"
              onClick={() => setCalcType('loan')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                calcType === 'loan'
                  ? 'bg-[#0a192f] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              💳 Loan EMI
            </button>
            <button
              data-calc="ins"
              onClick={() => setCalcType('insurance')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                calcType === 'insurance'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md font-black'
                  : 'text-orange-900 bg-orange-100/70 hover:bg-orange-100 border border-orange-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>🛡️ Insurance Cover (Life & Health)</span>
            </button>
          </div>
        </div>

        {/* Calculator Main Body */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          
          {/* SIP CALCULATOR */}
          {calcType === 'sip' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders & Numeric Keyboard Inputs */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Monthly Investment (₹)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        min="500"
                        max="500000"
                        step="500"
                        value={sipMonthly}
                        onChange={(e) => setSipMonthly(Math.max(0, Number(e.target.value)))}
                        className="w-28 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-heading"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="150000"
                    step="500"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span>₹500</span>
                    <span>₹50,000</span>
                    <span>₹1,50,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Expected Annual Return (% p.a.)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        step="0.5"
                        value={sipRate}
                        onChange={(e) => setSipRate(Math.max(0, Number(e.target.value)))}
                        className="w-20 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-heading"
                      />
                      <span className="text-xs font-bold text-slate-600">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="22"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span>6% (Conservative)</span>
                    <span>12-15% (Equities)</span>
                    <span>22% (Aggressive)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Time Horizon (Years)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        max="40"
                        step="1"
                        value={sipYears}
                        onChange={(e) => setSipYears(Math.max(1, Number(e.target.value)))}
                        className="w-20 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-heading"
                      />
                      <span className="text-xs font-bold text-slate-600">Yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span>1 Year</span>
                    <span>15 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Output Display Card */}
              <div className="lg:col-span-5 bg-[#0a192f] text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">
                    Maturity Wealth Projection
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-heading">
                    {formatCurrency(sipResult.totalMaturity)}
                  </div>

                  {/* Proportional Growth Bar */}
                  <div className="mt-6">
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                      <div
                        style={{
                          width: `${(sipResult.totalInvested / sipResult.totalMaturity) * 100}%`,
                        }}
                        className="bg-slate-400"
                        title="Invested"
                      />
                      <div
                        style={{
                          width: `${(sipResult.wealthGained / sipResult.totalMaturity) * 100}%`,
                        }}
                        className="bg-orange-500"
                        title="Wealth Gain"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] mt-2">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                        Invested: {formatCurrency(sipResult.totalInvested)}
                      </span>
                      <span className="flex items-center gap-1.5 text-orange-300 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
                        Returns: {formatCurrency(sipResult.wealthGained)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Total Invested Amount</span>
                      <strong className="text-white">{formatCurrency(sipResult.totalInvested)}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Estimated Wealth Gain</span>
                      <strong className="text-emerald-400 font-bold">+{formatCurrency(sipResult.wealthGained)}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onPlanGoal(
                      `SIP Plan: ₹${sipMonthly}/month for ${sipYears} years at ${sipRate}% expected return`
                    )
                  }
                  className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start This SIP with HSI Advisor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* LUMPSUM CALCULATOR */}
          {calcType === 'lumpsum' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Total Lumpsum Investment (₹)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        min="5000"
                        max="50000000"
                        step="10000"
                        value={lumpAmount}
                        onChange={(e) => setLumpAmount(Math.max(0, Number(e.target.value)))}
                        className="w-32 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-heading"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="5000000"
                    step="10000"
                    value={lumpAmount}
                    onChange={(e) => setLumpAmount(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span>₹10,000</span>
                    <span>₹25,00,000</span>
                    <span>₹50,00,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Expected Return Rate (% p.a.)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        step="0.5"
                        value={lumpRate}
                        onChange={(e) => setLumpRate(Math.max(0, Number(e.target.value)))}
                        className="w-20 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-heading"
                      />
                      <span className="text-xs font-bold text-slate-600">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="22"
                    step="0.5"
                    value={lumpRate}
                    onChange={(e) => setLumpRate(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Time Horizon (Years)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        max="35"
                        step="1"
                        value={lumpYears}
                        onChange={(e) => setLumpYears(Math.max(1, Number(e.target.value)))}
                        className="w-20 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-heading"
                      />
                      <span className="text-xs font-bold text-slate-600">Yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="1"
                    value={lumpYears}
                    onChange={(e) => setLumpYears(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0a192f] text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">
                    Lumpsum Wealth Forecast
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-heading">
                    {formatCurrency(lumpResult.totalMaturity)}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Invested Capital</span>
                      <strong className="text-white">{formatCurrency(lumpResult.totalInvested)}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Capital Growth / Gains</span>
                      <strong className="text-emerald-400 font-bold">+{formatCurrency(lumpResult.wealthGained)}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Multiplier Effect</span>
                      <strong className="text-orange-300 font-bold">
                        {(lumpResult.totalMaturity / lumpResult.totalInvested).toFixed(2)}x
                      </strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onPlanGoal(
                      `Lumpsum Investment: ₹${lumpAmount} for ${lumpYears} years at ${lumpRate}% expected return`
                    )
                  }
                  className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Deploy Lumpsum Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* LOAN EMI CALCULATOR */}
          {calcType === 'loan' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Required Loan Amount (₹)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        min="50000"
                        max="50000000"
                        step="50000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                        className="w-32 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-heading"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="20000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span>₹1 Lakh</span>
                    <span>₹1 Crore</span>
                    <span>₹2 Crores</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Interest Rate (% p.a.)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="5"
                        max="24"
                        step="0.25"
                        value={loanRate}
                        onChange={(e) => setLoanRate(Math.max(0, Number(e.target.value)))}
                        className="w-20 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-heading"
                      />
                      <span className="text-xs font-bold text-slate-600">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="7.5"
                    max="18"
                    step="0.25"
                    value={loanRate}
                    onChange={(e) => setLoanRate(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                    <span>7.5% (Home Loan)</span>
                    <span>9.5% (LAP/Business)</span>
                    <span>18% (Personal)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Loan Tenure (Years)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        max="35"
                        step="1"
                        value={loanYears}
                        onChange={(e) => setLoanYears(Math.max(1, Number(e.target.value)))}
                        className="w-20 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-heading"
                      />
                      <span className="text-xs font-bold text-slate-600">Yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0a192f] text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">
                    Monthly Loan EMI
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-heading">
                    {formatCurrency(loanResult.monthlyEmi)}
                    <span className="text-xs font-medium text-slate-400 ml-1">/month</span>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Principal Amount</span>
                      <strong className="text-white">{formatCurrency(loanResult.principal)}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Total Interest Payable</span>
                      <strong className="text-orange-400 font-bold">{formatCurrency(loanResult.totalInterest)}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300 border-t border-slate-800/80 pt-2">
                      <span>Total Repayment (P + I)</span>
                      <strong className="text-white font-black">{formatCurrency(loanResult.totalPayable)}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onPlanGoal(
                      `Loan Request: ₹${loanAmount} for ${loanYears} years (Est. EMI: ₹${loanResult.monthlyEmi})`
                    )
                  }
                  className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for Fast Loan Approval</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* INSURANCE CALCULATOR (LIFE & HEALTH) */}
          {calcType === 'insurance' && (
            <div>
              {/* Sub-Switch: Term Life HLV vs Family Health */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex p-1 bg-orange-100/70 rounded-xl border border-orange-300">
                  <button
                    onClick={() => setInsType('term')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      insType === 'term'
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'text-orange-950 hover:bg-orange-200/50'
                    }`}
                  >
                    🛡️ Term Life (Human Life Value - HLV)
                  </button>
                  <button
                    onClick={() => setInsType('health')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      insType === 'health'
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'text-orange-950 hover:bg-orange-200/50'
                    }`}
                  >
                    🏥 Family Health & Mediclaim Shield
                  </button>
                </div>
              </div>

              {insType === 'term' ? (
                /* TERM LIFE HLV CALCULATOR */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Age */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Current Age
                          </label>
                          <input
                            type="number"
                            min="18"
                            max="65"
                            value={userAge}
                            onChange={(e) => setUserAge(Math.min(65, Math.max(18, Number(e.target.value))))}
                            className="w-16 px-2 py-1 text-right text-sm font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 font-heading"
                          />
                        </div>
                        <input
                          type="range"
                          min="18"
                          max="65"
                          value={userAge}
                          onChange={(e) => setUserAge(Number(e.target.value))}
                          className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                        />
                      </div>

                      {/* Dependents */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Family Dependents
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="6"
                            value={dependents}
                            onChange={(e) => setDependents(Math.min(8, Math.max(0, Number(e.target.value))))}
                            className="w-16 px-2 py-1 text-right text-sm font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 font-heading"
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="6"
                          value={dependents}
                          onChange={(e) => setDependents(Number(e.target.value))}
                          className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Annual Income */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Annual Take-Home Income (₹)
                        </label>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-400">₹</span>
                          <input
                            type="number"
                            min="300000"
                            max="20000000"
                            step="50000"
                            value={annualIncome}
                            onChange={(e) => setAnnualIncome(Math.max(0, Number(e.target.value)))}
                            className="w-32 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:ring-2 focus:ring-orange-500 font-heading"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="300000"
                        max="5000000"
                        step="50000"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                        <span>₹3 Lakhs</span>
                        <span>₹25 Lakhs</span>
                        <span>₹50 Lakhs</span>
                      </div>
                    </div>

                    {/* Outstanding Loans / Liabilities */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Outstanding Loans & Liabilities (₹)
                        </label>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-400">₹</span>
                          <input
                            type="number"
                            min="0"
                            max="30000000"
                            step="100000"
                            value={liabilities}
                            onChange={(e) => setLiabilities(Math.max(0, Number(e.target.value)))}
                            className="w-32 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:ring-2 focus:ring-orange-500 font-heading"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="100000"
                        value={liabilities}
                        onChange={(e) => setLiabilities(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                      />
                    </div>

                    {/* Existing Life Cover */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Existing Life Cover / Policies (₹)
                        </label>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-400">₹</span>
                          <input
                            type="number"
                            min="0"
                            max="20000000"
                            step="100000"
                            value={existingCover}
                            onChange={(e) => setExistingCover(Math.max(0, Number(e.target.value)))}
                            className="w-32 px-2.5 py-1 text-right text-base font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 shadow-2xs focus:ring-2 focus:ring-orange-500 font-heading"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5000000"
                        step="100000"
                        value={existingCover}
                        onChange={(e) => setExistingCover(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Output Card */}
                  <div className="lg:col-span-5 bg-[#0a192f] text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-slate-700 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-orange-400" />
                        <span>Recommended Pure Life Cover (Sum Assured)</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white font-heading">
                        {formatCurrency(insuranceResult.recommendedSumAssured)}
                      </div>
                      <p className="text-[11px] text-orange-200/80 mt-1">
                        Based on {insuranceResult.incomeMultiple}x income replacement + {formatCurrency(liabilities)} debt clearance.
                      </p>

                      <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Est. Monthly Premium</span>
                          <strong className="text-orange-400 font-bold">~{formatCurrency(insuranceResult.monthlyPremium)}/mo</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Est. Annual Premium</span>
                          <strong className="text-white font-bold">~{formatCurrency(insuranceResult.annualPremium)}/yr</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Tax Saving Under Sec 80C</span>
                          <strong className="text-emerald-400 font-bold">Save up to {formatCurrency(insuranceResult.taxBenefit80C)}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300 border-t border-slate-800/80 pt-2 text-[11px]">
                          <span>Partner Insurers</span>
                          <span className="text-slate-300 font-semibold">Major Regulated Insurers</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onPlanGoal(
                          `Term Life Cover Quotation: ₹${insuranceResult.recommendedSumAssured / 10000000} Crore cover (Age ${userAge}, Annual Income ₹${annualIncome})`
                        )
                      }
                      className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Compare Quotes from 25+ Insurers</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* FAMILY HEALTH MEDICLAIM CALCULATOR */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    {/* Family Composition Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Who are you insuring?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'individual', label: 'Single Adult', icon: '👤' },
                          { id: 'couple', label: 'Husband & Wife', icon: '👫' },
                          { id: 'family2_1', label: '2 Adults + 1 Child', icon: '👨‍👩‍👧' },
                          { id: 'family2_2', label: '2 Adults + 2 Kids', icon: '👨‍👩‍👧‍👦' },
                          { id: 'parents', label: 'Senior Parents', icon: '🧓' }
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setHealthFamilyType(item.id as any)}
                            className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-left flex items-center gap-2 ${
                              healthFamilyType === item.id
                                ? 'bg-orange-100/90 border-orange-400 text-orange-950 font-extrabold shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Age of Eldest Member */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Age of Eldest Member
                          </label>
                          <input
                            type="number"
                            min="18"
                            max="80"
                            value={eldestAge}
                            onChange={(e) => setEldestAge(Math.min(85, Math.max(18, Number(e.target.value))))}
                            className="w-16 px-2 py-1 text-right text-sm font-extrabold text-slate-900 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 font-heading"
                          />
                        </div>
                        <input
                          type="range"
                          min="18"
                          max="75"
                          value={eldestAge}
                          onChange={(e) => setEldestAge(Number(e.target.value))}
                          className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                        />
                      </div>

                      {/* City Zone */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          City Zone Tier
                        </label>
                        <select
                          value={cityTier}
                          onChange={(e) => setCityTier(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs font-bold text-slate-800 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="tier1">Tier 1 (Mumbai, Delhi NCR, Bengaluru)</option>
                          <option value="tier2">Tier 2 / Tier 3 (Rest of India)</option>
                        </select>
                      </div>
                    </div>

                    {/* Dual Engine Protection Guide */}
                    <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 text-xs space-y-2">
                      <div className="font-bold text-orange-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <span>Why HSI Recommends a 1-Crore Shield Strategy</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        Buying a ₹1 Crore base policy is expensive. Instead, HSI combines a <strong>₹10-15 Lakhs Comprehensive Base Mediclaim</strong> with a <strong>₹85-90 Lakhs Super Top-Up</strong>. This delivers ₹1 Crore total hospital coverage at <strong>60% lower annual premium</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Output Card */}
                  <div className="lg:col-span-5 bg-[#0a192f] text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-slate-700 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <HeartHandshake className="w-4 h-4 text-orange-400" />
                        <span>Recommended Total Health Shield</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white font-heading">
                        {formatCurrency(insuranceResult.totalCoverage)}
                      </div>
                      <p className="text-[11px] text-orange-200/80 mt-1">
                        ₹10L Base Policy + ₹90L Super Top-Up combination
                      </p>

                      <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Base Mediclaim</span>
                          <strong className="text-white font-bold">{formatCurrency(insuranceResult.recommendedBase)}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Super Top-Up Cover</span>
                          <strong className="text-orange-400 font-bold">{formatCurrency(insuranceResult.recommendedTopup)}</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Est. Combined Premium</span>
                          <strong className="text-white font-bold">~{formatCurrency(insuranceResult.annualPremium)}/yr</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Sec 80D Tax Deduction</span>
                          <strong className="text-emerald-400 font-bold">Save up to {formatCurrency(insuranceResult.taxBenefit80D)}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onPlanGoal(
                          `Health Insurance Plan: ₹1 Crore Family Shield (${healthFamilyType}, Eldest Age ${eldestAge})`
                        )
                      }
                      className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get Cashless Mediclaim Comparison</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
