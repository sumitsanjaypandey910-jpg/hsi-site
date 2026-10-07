import { PRODUCTS, INSURANCE_PARTNERS } from './data/hsiData';
import { ProductItem } from './types';
import { initChatBot } from './components/chatBot';

// --- DATA & STATE ---
let currentCategory = 'all';
let currentSearch = '';

// --- HELPER FORMATTER ---
function formatINR(val: number): string {
  return '₹' + Math.round(val).toLocaleString('en-IN');
}

// --- DOM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initMobileMenu();
  renderProducts();
  initProductFilters();
  initCalculators();
  renderInsurancePartners();
  initModals();
  initContactForms();
  initCodeViewer();
  initChatBot();
});

// --- COPYRIGHT YEAR ---
function initYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

// --- MOBILE MENU ---
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });

  const mobileConsultBtn = document.getElementById('mobileConsultBtn');
  if (mobileConsultBtn) {
    mobileConsultBtn.addEventListener('click', () => {
      menu.classList.add('hidden');
      openConsultationModal();
    });
  }

  const mobilePartnerBtn = document.getElementById('mobilePartnerBtn');
  if (mobilePartnerBtn) {
    mobilePartnerBtn.addEventListener('click', () => {
      menu.classList.add('hidden');
      openPartnerModal();
    });
  }
}

// --- PRODUCT RENDERING & FILTERING ---
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const filtered = PRODUCTS.filter((prod) => {
    const matchesCat =
      currentCategory === 'all' ||
      (currentCategory === 'wealth' && (prod.category === 'mutual_funds' || prod.category === 'stocks')) ||
      (currentCategory === 'insurance' && (prod.category === 'life_insurance' || prod.category === 'health_insurance' || prod.category === 'general_insurance')) ||
      (currentCategory === 'bonds' && prod.category === 'bonds') ||
      (currentCategory === 'property' && prod.category === 'fractional_property') ||
      (currentCategory === 'loans' && prod.category === 'loans');

    const searchLower = currentSearch.toLowerCase();
    const matchesSearch =
      !searchLower ||
      prod.title.toLowerCase().includes(searchLower) ||
      prod.shortDescription.toLowerCase().includes(searchLower) ||
      prod.subtypes.some((s) => s.toLowerCase().includes(searchLower));

    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500 text-xs">
        No products found matching "<strong>${currentSearch}</strong>". Please try another search term or reset filters.
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (prod) => `
      <div class="hsi-card rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-400 shadow-sm flex flex-col justify-between overflow-hidden">
        <div class="p-6">
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-yellow-100 text-amber-900 border border-yellow-300">
              ${prod.categoryLabel}
            </span>
            <span class="text-xl">💼</span>
          </div>

          <h3 class="text-lg font-black text-slate-950 font-heading mb-1.5">${prod.title}</h3>
          <p class="text-xs text-slate-600 leading-relaxed mb-4 font-medium">${prod.shortDescription}</p>

          <!-- Subtypes Chips -->
          <div class="mb-4">
            <div class="text-[10px] font-black text-amber-900 uppercase tracking-wider mb-1.5">Brochure Offerings:</div>
            <div class="flex flex-wrap gap-1">
              ${prod.subtypes
                .map(
                  (st) =>
                    `<span class="px-2 py-0.5 rounded-md bg-amber-50 text-slate-800 text-[10.5px] font-bold border border-amber-200">${st}</span>`
                )
                .join('')}
            </div>
          </div>

          <!-- Highlight in Gold / Yellow -->
          <div class="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-[11px] text-amber-950 font-medium">
            <strong class="font-black text-amber-900">Key Benefit:</strong> ${prod.keyBenefits[0] || 'Personalized allocation and full claim support.'}
          </div>
        </div>

        <div class="p-4 bg-amber-50/40 border-t border-amber-200/80 flex items-center justify-between gap-2">
          <button class="view-detail-btn px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-amber-900 hover:bg-yellow-100 transition-colors cursor-pointer" data-id="${prod.id}">
            View Details
          </button>
          <button class="prod-enquire-btn px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-slate-950 text-xs font-black transition-all shadow-xs hover:scale-105 cursor-pointer" data-name="${prod.title}">
            Enquire Now →
          </button>
        </div>
      </div>
    `
    )
    .join('');

  // Attach button events
  grid.querySelectorAll('.view-detail-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id;
      const product = PRODUCTS.find((p) => p.id === id);
      if (product) openProductDetailModal(product);
    });
  });

  grid.querySelectorAll('.prod-enquire-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const name = (e.currentTarget as HTMLElement).dataset.name;
      openConsultationModal(name);
    });
  });
}

function initProductFilters() {
  const container = document.getElementById('productTabContainer');
  const searchInput = document.getElementById('productSearchInput') as HTMLInputElement;

  if (container) {
    container.querySelectorAll('.prod-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.prod-tab-btn').forEach((b) => {
          b.classList.remove('active', 'bg-gradient-to-r', 'from-amber-500', 'to-yellow-400', 'text-slate-950', 'shadow-xs', 'font-black');
          b.classList.add('text-slate-700', 'hover:bg-yellow-50', 'font-bold');
        });

        btn.classList.add('active', 'bg-gradient-to-r', 'from-amber-500', 'to-yellow-400', 'text-slate-950', 'font-black', 'shadow-xs');
        btn.classList.remove('text-slate-700', 'hover:bg-yellow-50', 'font-bold');

        currentCategory = (btn as HTMLElement).dataset.cat || 'all';
        renderProducts();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentSearch = searchInput.value.trim();
      renderProducts();
    });
  }
}

// --- CALCULATORS (SIP, LUMPSUM, LOAN, INSURANCE) ---
function bindSliderAndInput(
  sliderEl: HTMLInputElement | null,
  inputEl: HTMLInputElement | null,
  onUpdate: () => void
) {
  if (!sliderEl || !inputEl) return;

  // When user moves range slider
  sliderEl.addEventListener('input', () => {
    inputEl.value = sliderEl.value;
    onUpdate();
  });

  // When user types numbers from keyboard
  const syncFromKeyboard = () => {
    const rawVal = parseFloat(inputEl.value);
    if (isNaN(rawVal)) return;

    const sliderMin = parseFloat(sliderEl.min);
    const sliderMax = parseFloat(sliderEl.max);

    if (rawVal < sliderMin) {
      sliderEl.value = sliderMin.toString();
    } else if (rawVal > sliderMax) {
      sliderEl.value = sliderMax.toString();
    } else {
      sliderEl.value = rawVal.toString();
    }

    onUpdate();
  };

  inputEl.addEventListener('input', syncFromKeyboard);
  inputEl.addEventListener('change', () => {
    if (isNaN(parseFloat(inputEl.value)) || inputEl.value.trim() === '') {
      inputEl.value = sliderEl.value;
    }
    syncFromKeyboard();
  });
}

function initCalculators() {
  const typeSelector = document.getElementById('calcTypeSelector');
  const sipView = document.getElementById('sipCalcView');
  const lumpView = document.getElementById('lumpCalcView');
  const loanView = document.getElementById('loanCalcView');
  const insView = document.getElementById('insCalcView');

  if (typeSelector) {
    typeSelector.querySelectorAll('.calc-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        typeSelector.querySelectorAll('.calc-tab-btn').forEach((b) => {
          b.classList.remove('active', 'bg-gradient-to-r', 'from-amber-500', 'to-yellow-400', 'text-slate-950', 'shadow-xs', 'font-black');
          b.classList.add('text-slate-700', 'font-bold');
        });
        btn.classList.add('active', 'bg-gradient-to-r', 'from-amber-500', 'to-yellow-400', 'text-slate-950', 'font-black', 'shadow-xs');
        btn.classList.remove('text-slate-700', 'font-bold');

        const type = (btn as HTMLElement).dataset.calc;
        if (sipView) sipView.classList.toggle('hidden', type !== 'sip');
        if (lumpView) lumpView.classList.toggle('hidden', type !== 'lump');
        if (loanView) loanView.classList.toggle('hidden', type !== 'loan');
        if (insView) insView.classList.toggle('hidden', type !== 'ins');
      });
    });
  }

  // ==========================================
  // 1. SIP CALCULATOR (Keyboard & Slider Synced)
  // ==========================================
  const sipAmountSlider = document.getElementById('sipAmountSlider') as HTMLInputElement;
  const sipAmountInput = document.getElementById('sipAmountInput') as HTMLInputElement;
  const sipRateSlider = document.getElementById('sipRateSlider') as HTMLInputElement;
  const sipRateInput = document.getElementById('sipRateInput') as HTMLInputElement;
  const sipYearsSlider = document.getElementById('sipYearsSlider') as HTMLInputElement;
  const sipYearsInput = document.getElementById('sipYearsInput') as HTMLInputElement;

  function updateSip() {
    if (!sipAmountInput || !sipRateInput || !sipYearsInput) return;
    const P = Math.max(100, parseFloat(sipAmountInput.value) || 0);
    const annualR = Math.max(0.1, parseFloat(sipRateInput.value) || 0);
    const years = Math.max(1, parseFloat(sipYearsInput.value) || 0);

    const n = years * 12;
    const r = annualR / 12 / 100;
    const maturity = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const totalGains = Math.max(0, maturity - totalInvested);

    const matEl = document.getElementById('sipMaturityVal');
    const invEl = document.getElementById('sipInvestedVal');
    const gainsEl = document.getElementById('sipGainsVal');
    if (matEl) matEl.textContent = formatINR(maturity);
    if (invEl) invEl.textContent = formatINR(totalInvested);
    if (gainsEl) gainsEl.textContent = '+' + formatINR(totalGains);

    const investedPct = Math.min(100, Math.max(0, Math.round((totalInvested / maturity) * 100)));
    const gainsPct = 100 - investedPct;
    const invBar = document.getElementById('sipInvestedBar');
    const gainsBar = document.getElementById('sipGainsBar');
    if (invBar) invBar.style.width = investedPct + '%';
    if (gainsBar) gainsBar.style.width = gainsPct + '%';
  }

  bindSliderAndInput(sipAmountSlider, sipAmountInput, updateSip);
  bindSliderAndInput(sipRateSlider, sipRateInput, updateSip);
  bindSliderAndInput(sipYearsSlider, sipYearsInput, updateSip);
  updateSip();

  document.getElementById('sipActionBtn')?.addEventListener('click', () => {
    const p = sipAmountInput ? sipAmountInput.value : sipAmountSlider.value;
    openConsultationModal(`Mutual Funds SIP of ₹${p}/month`);
  });

  // ==============================================
  // 2. LUMPSUM CALCULATOR (Keyboard & Slider Synced)
  // ==============================================
  const lumpAmountSlider = document.getElementById('lumpAmountSlider') as HTMLInputElement;
  const lumpAmountInput = document.getElementById('lumpAmountInput') as HTMLInputElement;
  const lumpRateSlider = document.getElementById('lumpRateSlider') as HTMLInputElement;
  const lumpRateInput = document.getElementById('lumpRateInput') as HTMLInputElement;
  const lumpYearsSlider = document.getElementById('lumpYearsSlider') as HTMLInputElement;
  const lumpYearsInput = document.getElementById('lumpYearsInput') as HTMLInputElement;

  function updateLump() {
    if (!lumpAmountInput || !lumpRateInput || !lumpYearsInput) return;
    const P = Math.max(100, parseFloat(lumpAmountInput.value) || 0);
    const annualR = Math.max(0.1, parseFloat(lumpRateInput.value) || 0);
    const years = Math.max(1, parseFloat(lumpYearsInput.value) || 0);

    const maturity = P * Math.pow(1 + annualR / 100, years);
    const gains = Math.max(0, maturity - P);

    const matEl = document.getElementById('lumpMaturityVal');
    const invEl = document.getElementById('lumpInvestedVal');
    const gainsEl = document.getElementById('lumpGainsVal');
    if (matEl) matEl.textContent = formatINR(maturity);
    if (invEl) invEl.textContent = formatINR(P);
    if (gainsEl) gainsEl.textContent = '+' + formatINR(gains);
  }

  bindSliderAndInput(lumpAmountSlider, lumpAmountInput, updateLump);
  bindSliderAndInput(lumpRateSlider, lumpRateInput, updateLump);
  bindSliderAndInput(lumpYearsSlider, lumpYearsInput, updateLump);
  updateLump();

  document.getElementById('lumpActionBtn')?.addEventListener('click', () => {
    const p = lumpAmountInput ? lumpAmountInput.value : lumpAmountSlider.value;
    openConsultationModal(`Lumpsum Investment of ₹${p}`);
  });

  // ==============================================
  // 3. LOAN EMI CALCULATOR (Keyboard & Slider Synced)
  // ==============================================
  const loanAmountSlider = document.getElementById('loanAmountSlider') as HTMLInputElement;
  const loanAmountInput = document.getElementById('loanAmountInput') as HTMLInputElement;
  const loanRateSlider = document.getElementById('loanRateSlider') as HTMLInputElement;
  const loanRateInput = document.getElementById('loanRateInput') as HTMLInputElement;
  const loanYearsSlider = document.getElementById('loanYearsSlider') as HTMLInputElement;
  const loanYearsInput = document.getElementById('loanYearsInput') as HTMLInputElement;

  function updateLoan() {
    if (!loanAmountInput || !loanRateInput || !loanYearsInput) return;
    const P = Math.max(1000, parseFloat(loanAmountInput.value) || 0);
    const annualR = Math.max(0.1, parseFloat(loanRateInput.value) || 0);
    const years = Math.max(0.5, parseFloat(loanYearsInput.value) || 0);

    const r = annualR / 12 / 100;
    const n = years * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalRepay = emi * n;
    const totalInterest = Math.max(0, totalRepay - P);

    const emiEl = document.getElementById('loanEmiVal');
    const princEl = document.getElementById('loanPrincipalVal');
    const intEl = document.getElementById('loanInterestVal');
    const totalEl = document.getElementById('loanTotalVal');

    if (emiEl) emiEl.innerHTML = `${formatINR(emi)}<span class="text-xs font-normal text-slate-800">/mo</span>`;
    if (princEl) princEl.textContent = formatINR(P);
    if (intEl) intEl.textContent = formatINR(totalInterest);
    if (totalEl) totalEl.textContent = formatINR(totalRepay);
  }

  bindSliderAndInput(loanAmountSlider, loanAmountInput, updateLoan);
  bindSliderAndInput(loanRateSlider, loanRateInput, updateLoan);
  bindSliderAndInput(loanYearsSlider, loanYearsInput, updateLoan);
  updateLoan();

  document.getElementById('loanActionBtn')?.addEventListener('click', () => {
    const p = loanAmountInput ? loanAmountInput.value : loanAmountSlider.value;
    openConsultationModal(`Loan Sanction Assessment for ₹${p}`);
  });

  // ==================================================
  // 4. INSURANCE CALCULATOR (Keyboard & Slider Synced)
  // ==================================================
  let insType: 'term' | 'health' = 'term';
  let insOptionChoice = 1; // 1 = Non-Smoker / Individual, 2 = Smoker / Family Floater

  const insTypeTermBtn = document.getElementById('insTypeTermBtn');
  const insTypeHealthBtn = document.getElementById('insTypeHealthBtn');
  const insCoverSlider = document.getElementById('insCoverSlider') as HTMLInputElement;
  const insCoverInput = document.getElementById('insCoverInput') as HTMLInputElement;
  const insAgeSlider = document.getElementById('insAgeSlider') as HTMLInputElement;
  const insAgeInput = document.getElementById('insAgeInput') as HTMLInputElement;
  const insTenureSlider = document.getElementById('insTenureSlider') as HTMLInputElement;
  const insTenureInput = document.getElementById('insTenureInput') as HTMLInputElement;

  const insCoverLabel = document.getElementById('insCoverLabel');
  const insCoverRangeLabels = document.getElementById('insCoverRangeLabels');
  const insTenureLabel = document.getElementById('insTenureLabel');
  const insOptionTitle = document.getElementById('insOptionTitle');
  const insOptionSubtitle = document.getElementById('insOptionSubtitle');
  const insOptionBtn1 = document.getElementById('insOptionBtn1');
  const insOptionBtn2 = document.getElementById('insOptionBtn2');

  function updateOptionButtons() {
    if (!insOptionBtn1 || !insOptionBtn2) return;
    if (insOptionChoice === 1) {
      insOptionBtn1.className = 'px-3 py-1.5 rounded-xl text-xs font-black bg-white border-2 border-amber-500 text-amber-950 shadow-2xs cursor-pointer';
      insOptionBtn2.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100/70 border border-amber-300 text-slate-700 hover:bg-white cursor-pointer';
    } else {
      insOptionBtn2.className = 'px-3 py-1.5 rounded-xl text-xs font-black bg-white border-2 border-amber-500 text-amber-950 shadow-2xs cursor-pointer';
      insOptionBtn1.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100/70 border border-amber-300 text-slate-700 hover:bg-white cursor-pointer';
    }
  }

  function setInsuranceCategory(cat: 'term' | 'health') {
    insType = cat;
    insOptionChoice = 1; // Reset to standard tier

    if (insTypeTermBtn && insTypeHealthBtn) {
      if (cat === 'term') {
        insTypeTermBtn.className = 'py-2 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all';
        insTypeHealthBtn.className = 'py-2 px-3 rounded-xl text-xs font-bold text-slate-700 hover:text-amber-900 cursor-pointer flex items-center justify-center gap-1.5 transition-all';
      } else {
        insTypeHealthBtn.className = 'py-2 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all';
        insTypeTermBtn.className = 'py-2 px-3 rounded-xl text-xs font-bold text-slate-700 hover:text-amber-900 cursor-pointer flex items-center justify-center gap-1.5 transition-all';
      }
    }

    if (cat === 'term') {
      if (insCoverLabel) insCoverLabel.textContent = 'Life Cover / Sum Assured (₹)';
      if (insCoverRangeLabels) insCoverRangeLabels.innerHTML = '<span>₹25 Lakhs</span><span class="text-amber-900 font-bold">₹1 Crore (Recommended)</span><span>₹5 Crores</span>';
      if (insCoverSlider) {
        insCoverSlider.min = '2500000';
        insCoverSlider.max = '50000000';
        insCoverSlider.step = '500000';
        insCoverSlider.value = '10000000';
      }
      if (insCoverInput) {
        insCoverInput.min = '500000';
        insCoverInput.max = '50000000';
        insCoverInput.step = '100000';
        insCoverInput.value = '10000000';
      }
      if (insTenureLabel) insTenureLabel.textContent = 'Policy Cover Duration (Years)';
      if (insOptionTitle) insOptionTitle.textContent = 'Tobacco / Smoking Habit:';
      if (insOptionSubtitle) insOptionSubtitle.textContent = 'Non-smokers receive up to 35% lower base premium rates';
      if (insOptionBtn1) insOptionBtn1.textContent = 'Non-Smoker';
      if (insOptionBtn2) insOptionBtn2.textContent = 'Smoker';

      const badge = document.getElementById('insBadge');
      if (badge) badge.textContent = 'Sec 80C Tax-Free';
      const shieldLabel = document.getElementById('insShieldLabel');
      if (shieldLabel) shieldLabel.textContent = 'Life Shield Assured:';
      const taxLabel = document.getElementById('insTaxSecLabel');
      if (taxLabel) taxLabel.textContent = 'Tax Deductions (Sec 80C):';
    } else {
      // Health Insurance
      if (insCoverLabel) insCoverLabel.textContent = 'Hospitalization Sum Insured (₹)';
      if (insCoverRangeLabels) insCoverRangeLabels.innerHTML = '<span>₹5 Lakhs</span><span class="text-amber-900 font-bold">₹10 Lakhs (Recommended)</span><span>₹1 Crore</span>';
      if (insCoverSlider) {
        insCoverSlider.min = '500000';
        insCoverSlider.max = '10000000';
        insCoverSlider.step = '100000';
        insCoverSlider.value = '1000000';
      }
      if (insCoverInput) {
        insCoverInput.min = '300000';
        insCoverInput.max = '10000000';
        insCoverInput.step = '50000';
        insCoverInput.value = '1000000';
      }
      if (insTenureLabel) insTenureLabel.textContent = 'Policy Term (Years)';
      if (insOptionTitle) insOptionTitle.textContent = 'Policy Coverage Type:';
      if (insOptionSubtitle) insOptionSubtitle.textContent = 'Family Floater covers Self + Spouse + up to 2 dependent children';
      if (insOptionBtn1) insOptionBtn1.textContent = 'Individual';
      if (insOptionBtn2) insOptionBtn2.textContent = 'Family Floater (2A + 2C)';

      const badge = document.getElementById('insBadge');
      if (badge) badge.textContent = 'Sec 80D Tax Deduction';
      const shieldLabel = document.getElementById('insShieldLabel');
      if (shieldLabel) shieldLabel.textContent = 'Cashless Hospital Cover:';
      const taxLabel = document.getElementById('insTaxSecLabel');
      if (taxLabel) taxLabel.textContent = 'Tax Deductions (Sec 80D):';
    }

    updateOptionButtons();
    updateInsurance();
  }

  if (insTypeTermBtn) insTypeTermBtn.addEventListener('click', () => setInsuranceCategory('term'));
  if (insTypeHealthBtn) insTypeHealthBtn.addEventListener('click', () => setInsuranceCategory('health'));

  if (insOptionBtn1) {
    insOptionBtn1.addEventListener('click', () => {
      insOptionChoice = 1;
      updateOptionButtons();
      updateInsurance();
    });
  }
  if (insOptionBtn2) {
    insOptionBtn2.addEventListener('click', () => {
      insOptionChoice = 2;
      updateOptionButtons();
      updateInsurance();
    });
  }

  function updateInsurance() {
    if (!insCoverInput || !insAgeInput || !insTenureInput) return;
    const cover = Math.max(100000, parseFloat(insCoverInput.value) || 0);
    const age = Math.max(18, Math.min(80, parseFloat(insAgeInput.value) || 30));
    const tenure = Math.max(1, parseFloat(insTenureInput.value) || 30);

    let annualPremium = 0;
    let taxSaving = 0;

    if (insType === 'term') {
      // Actuarial estimate for Term Life in India
      const basePerLakh = 7.5;
      const ageMultiplier = 1 + Math.max(0, age - 22) * 0.045 + Math.pow(Math.max(0, age - 35), 1.65) * 0.035;
      const smokerMultiplier = insOptionChoice === 2 ? 1.55 : 1.0;
      const tenureMultiplier = 1 + Math.max(0, tenure - 20) * 0.007;

      annualPremium = (cover / 100000) * basePerLakh * ageMultiplier * smokerMultiplier * tenureMultiplier * 1.18;
      taxSaving = Math.min(annualPremium * 0.312, 150000 * 0.312);
    } else {
      // Actuarial estimate for Comprehensive Health Mediclaim
      const baseHealthPerLakh = 58;
      const ageMultiplier = 1 + Math.max(0, age - 25) * 0.038 + Math.pow(Math.max(0, age - 40), 1.55) * 0.045;
      const familyMultiplier = insOptionChoice === 2 ? 1.75 : 1.0;

      annualPremium = (cover / 100000) * baseHealthPerLakh * 12 * ageMultiplier * familyMultiplier * 1.18;
      taxSaving = Math.min(annualPremium * 0.312, 25000 * 0.312);
    }

    const monthlyPremium = Math.round(annualPremium / 12);
    const dailyCost = Math.round(annualPremium / 365);

    const mVal = document.getElementById('insPremiumMonthlyVal');
    const aVal = document.getElementById('insPremiumAnnualVal');
    const sVal = document.getElementById('insTotalShieldVal');
    const dVal = document.getElementById('insDailyCostVal');
    const tVal = document.getElementById('insTaxSavingsVal');

    if (mVal) mVal.innerHTML = `${formatINR(monthlyPremium)}<span class="text-xs font-normal text-slate-800">/mo</span>`;
    if (aVal) aVal.textContent = `${formatINR(annualPremium)}/year`;
    if (sVal) sVal.textContent = formatINR(cover);
    if (dVal) dVal.textContent = `~₹${dailyCost} / day`;
    if (tVal) tVal.textContent = `Save up to ${formatINR(taxSaving)}`;
  }

  bindSliderAndInput(insCoverSlider, insCoverInput, updateInsurance);
  bindSliderAndInput(insAgeSlider, insAgeInput, updateInsurance);
  bindSliderAndInput(insTenureSlider, insTenureInput, updateInsurance);
  updateInsurance();

  document.getElementById('insActionBtn')?.addEventListener('click', () => {
    const coverAmt = insCoverInput ? formatINR(parseFloat(insCoverInput.value)) : '1 Crore';
    const ageVal = insAgeInput ? insAgeInput.value : '30';
    const typeLabel = insType === 'term' ? 'Term Life Insurance' : 'Health Mediclaim';
    openConsultationModal(`${typeLabel} Quote (${coverAmt} Cover, Age ${ageVal})`);
  });
}

// --- NATURE OF WORK (25+ INSURANCE PARTNERS) ---
function renderInsurancePartners() {
  const lifeList = document.getElementById('lifeInsList');
  const healthList = document.getElementById('healthInsList');
  const genList = document.getElementById('generalInsList');

  const lifePartners = INSURANCE_PARTNERS.filter((p) => p.category === 'life');
  const healthPartners = INSURANCE_PARTNERS.filter((p) => p.category === 'health');
  const genPartners = INSURANCE_PARTNERS.filter((p) => p.category === 'general');

  if (lifeList) {
    lifeList.innerHTML = lifePartners
      .map(
        (p) => `
        <li class="py-2.5 flex items-center justify-between">
          <span class="font-bold text-slate-900">${p.name}</span>
          <span class="text-[10px] text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-full font-bold border border-amber-300/70">${p.highlights[0] || p.speciality}</span>
        </li>
      `
      )
      .join('');
  }

  if (healthList) {
    healthList.innerHTML = healthPartners
      .map(
        (p) => `
        <li class="py-2.5 flex items-center justify-between">
          <span class="font-bold text-slate-900">${p.name}</span>
          <span class="text-[10px] text-amber-950 bg-yellow-100/90 px-2 py-0.5 rounded-full font-bold border border-yellow-300/70">${p.highlights[0] || p.speciality}</span>
        </li>
      `
      )
      .join('');
  }

  if (genList) {
    genList.innerHTML = genPartners
      .map(
        (p) => `
        <li class="py-2.5 flex items-center justify-between">
          <span class="font-bold text-slate-900">${p.name}</span>
          <span class="text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-300/60">${p.highlights[0] || p.speciality}</span>
        </li>
      `
      )
      .join('');
  }

  document.querySelectorAll('.open-quote-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const partner = (e.currentTarget as HTMLElement).dataset.partner;
      openConsultationModal(partner || 'Insurance Quote');
    });
  });
}

// --- MODALS ENGINE ---
function initModals() {
  document.querySelectorAll('.close-modal-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach((m) => m.classList.add('hidden'));
    });
  });

  document.getElementById('topReviewBtn')?.addEventListener('click', () => {
    openConsultationModal('Free Portfolio Review');
  });

  document.getElementById('navConsultationBtn')?.addEventListener('click', () => {
    openConsultationModal('Free Advisory Session');
  });

  document.getElementById('heroConsultBtn')?.addEventListener('click', () => {
    openConsultationModal('Free Wealth Advisory Consultation');
  });
  document.getElementById('heroPartnerBtn')?.addEventListener('click', () => {
    openPartnerModal();
  });

  document.querySelectorAll('.open-partner-btn').forEach((btn) => {
    btn.addEventListener('click', () => openPartnerModal());
  });

  document.getElementById('floatingConsultBtn')?.addEventListener('click', () => {
    openConsultationModal('Priority Advisory Session');
  });
}

export function openConsultationModal(productName: string = 'Mutual Funds (SIP / Lumpsum)') {
  const modal = document.getElementById('consultationModal');
  const prodInput = document.getElementById('modalProduct') as HTMLInputElement;
  const form = document.getElementById('modalConsultationForm');
  const successBox = document.getElementById('modalConsultSuccess');

  if (modal) {
    if (prodInput) prodInput.value = productName;
    if (form) form.classList.remove('hidden');
    if (successBox) successBox.classList.add('hidden');
    modal.classList.remove('hidden');
  }
}

export function openPartnerModal() {
  const modal = document.getElementById('partnerModal');
  const form = document.getElementById('partnerAppForm');
  const successBox = document.getElementById('partnerSuccess');

  if (modal) {
    if (form) form.classList.remove('hidden');
    if (successBox) successBox.classList.add('hidden');
    modal.classList.remove('hidden');
  }
}

function openProductDetailModal(product: ProductItem) {
  const modal = document.getElementById('productDetailModal');
  if (!modal) return;

  document.getElementById('detailBadge')!.textContent = product.categoryLabel;
  document.getElementById('detailTitle')!.textContent = product.title;
  document.getElementById('detailShortDesc')!.textContent = product.shortDescription;
  document.getElementById('detailFullDesc')!.textContent = product.detailedDescription;

  const subtypesBox = document.getElementById('detailSubtypes')!;
  subtypesBox.innerHTML = product.subtypes
    .map(
      (st: string) =>
        `<span class="px-2.5 py-1 rounded-md bg-amber-50 text-slate-900 text-xs font-bold border border-amber-200">${st}</span>`
    )
    .join('');

  const benefitsBox = document.getElementById('detailBenefits')!;
  benefitsBox.innerHTML = product.keyBenefits
    .map((b: string) => `<li class="flex items-start gap-2 text-slate-800"><span class="text-amber-600 font-bold">✓</span><span>${b}</span></li>`)
    .join('');

  const enquireBtn = document.getElementById('detailEnquireBtn')!;
  enquireBtn.onclick = () => {
    modal.classList.add('hidden');
    openConsultationModal(product.title);
  };

  modal.classList.remove('hidden');
}

// --- FORMS HANDLING ---
function initContactForms() {
  const pageForm = document.getElementById('contactEnquiryForm') as HTMLFormElement;
  const pageSuccess = document.getElementById('contactSuccessBox');
  const refIdSpan = document.getElementById('contactRefId');
  const waLink = document.getElementById('contactWhatsAppLink') as HTMLAnchorElement;

  if (pageForm) {
    pageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('contactName') as HTMLInputElement).value;
      const phone = (document.getElementById('contactPhone') as HTMLInputElement).value;
      const product = (document.getElementById('contactProduct') as HTMLSelectElement).value;
      const refId = 'HSI-' + Math.floor(100000 + Math.random() * 900000);

      pageForm.classList.add('hidden');
      if (pageSuccess && refIdSpan) {
        refIdSpan.textContent = refId;
        if (waLink) {
          waLink.href = `https://wa.me/919820012345?text=Hello%20HSI,%20my%20enquiry%20reference%20is%20${refId}%20for%20${encodeURIComponent(product)}%20(${encodeURIComponent(name)})`;
        }
        pageSuccess.classList.remove('hidden');
      }
    });
  }

  const modalForm = document.getElementById('modalConsultationForm') as HTMLFormElement;
  const modalSuccess = document.getElementById('modalConsultSuccess');
  if (modalForm && modalSuccess) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      modalForm.classList.add('hidden');
      modalSuccess.classList.remove('hidden');
    });
  }

  const partnerForm = document.getElementById('partnerAppForm') as HTMLFormElement;
  const partnerSuccess = document.getElementById('partnerSuccess');
  if (partnerForm && partnerSuccess) {
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      partnerForm.classList.add('hidden');
      partnerSuccess.classList.remove('hidden');
    });
  }
}

// --- CODE VIEWER / EXPORT ---
function initCodeViewer() {
  const viewBtn = document.getElementById('viewSourceBtn');
  const modal = document.getElementById('codeViewerModal');
  const copyBtn = document.getElementById('copyAllHtmlBtn');
  const confirmMsg = document.getElementById('copyConfirmMsg');

  if (viewBtn && modal) {
    viewBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  }

  if (copyBtn && confirmMsg) {
    copyBtn.addEventListener('click', () => {
      const htmlContent = document.documentElement.outerHTML;
      navigator.clipboard.writeText(htmlContent).then(() => {
        confirmMsg.classList.remove('hidden');
        setTimeout(() => confirmMsg.classList.add('hidden'), 2500);
      });
    });
  }
}
