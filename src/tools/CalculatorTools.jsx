import React, { useState } from 'react';
import { Calculator, Percent, Clock, ArrowLeft, RotateCcw } from 'lucide-react';

export default function CalculatorTools({ activeTool, onBack }) {
  if (activeTool === 'EMI Calculator' || activeTool === 'EMI Calc') {
    return <EmiCalculator onBack={onBack} />;
  }
  if (activeTool === 'GST Calculator' || activeTool === 'GST Calc') {
    return <GstCalculator onBack={onBack} />;
  }
  if (activeTool === 'Age Calculator' || activeTool === 'Age Calc') {
    return <AgeCalculator onBack={onBack} />;
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitat
      </button>
      <h3 className="text-3xl font-black text-slate-900 mb-4">Mighty Elephant's Calculators</h3>
      <p className="text-slate-500 mb-8">Please choose a tool from the categories above or select one directly.</p>
    </div>
  );
}

// ==================== EMI CALCULATOR ====================
function EmiCalculator({ onBack }) {
  const [loanAmount, setLoanAmount] = useState(2500000); // 25 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenure, setTenure] = useState(20); // 20 years

  const P = parseFloat(loanAmount) || 0;
  const R = parseFloat(interestRate) || 0;
  const N = (parseInt(tenure) || 0) * 12; // months

  let emi = 0;
  let totalPayable = 0;
  let totalInterest = 0;

  if (P > 0 && R > 0 && N > 0) {
    const r = R / 12 / 100;
    emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    totalPayable = emi * N;
    totalInterest = totalPayable - P;
  }

  const interestRatio = totalPayable > 0 ? (totalInterest / totalPayable) * 100 : 0;
  const principalRatio = totalPayable > 0 ? (P / totalPayable) * 100 : 0;

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Calculator className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Elephant's Smart EMI Calculator</h3>
          <p className="text-sm text-slate-500">Calculate monthly loan installments and visual breakdowns instantly.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700 uppercase">Loan Amount (₹)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-40 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:border-orange-500 outline-none text-sm"
              />
            </div>
            <input
              type="range"
              min="100000"
              max="20000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
              <span>₹1 Lakh</span>
              <span>₹1 Crore</span>
              <span>₹2 Crore</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700 uppercase">Interest Rate (% p.a.)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-24 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:border-orange-500 outline-none text-sm"
              />
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
              <span>5%</span>
              <span>12.5%</span>
              <span>20%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700 uppercase">Tenure (Years)</label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-20 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:border-orange-500 outline-none text-sm"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Dynamic SVG Donut Chart & Totals */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center">
          <div className="text-center mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Installment (EMI)</p>
            <h4 className="text-3xl font-black text-orange-500">
              ₹{Math.round(emi).toLocaleString('en-IN')}
            </h4>
          </div>

          {/* Pure SVG Donut Chart */}
          <div className="relative w-44 h-44 mb-6">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              {/* Background ring */}
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              {/* Principal ring (Orange) */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#f97316"
                strokeWidth="3.5"
                strokeDasharray={`${principalRatio} ${100 - principalRatio}`}
                strokeDashoffset="0"
                className="transition-all duration-500"
              />
              {/* Interest ring (Slate) */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#64748b"
                strokeWidth="3.5"
                strokeDasharray={`${interestRatio} ${100 - interestRatio}`}
                strokeDashoffset={`-${principalRatio}`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Principal</span>
              <span className="text-base font-black text-slate-800">{Math.round(principalRatio)}%</span>
            </div>
          </div>

          {/* Stats list */}
          <div className="w-full space-y-3.5 text-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-slate-500 font-semibold">Principal Loan:</span>
              </div>
              <span className="font-bold text-slate-800">₹{P.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                <span className="text-slate-500 font-semibold">Total Interest:</span>
              </div>
              <span className="font-bold text-slate-800">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-base font-black">
              <span className="text-slate-800">Total Payable:</span>
              <span className="text-slate-955">₹{Math.round(totalPayable).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== GST CALCULATOR ====================
function GstCalculator({ onBack }) {
  const [amount, setAmount] = useState(10000);
  const [slab, setSlab] = useState(18); // 18% standard
  const [addGst, setAddGst] = useState(true); // add or remove

  const amt = parseFloat(amount) || 0;
  const rate = parseFloat(slab) || 0;

  let gstAmt = 0;
  let finalAmt = 0;

  if (addGst) {
    gstAmt = (amt * rate) / 100;
    finalAmt = amt + gstAmt;
  } else {
    // inclusive tax formula
    finalAmt = amt;
    gstAmt = amt - (amt * (100 / (100 + rate)));
  }

  const cgst = gstAmt / 2;
  const sgst = gstAmt / 2;

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Percent className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Elephant's GST Calculator</h3>
          <p className="text-sm text-slate-500">Calculate inclusive/exclusive goods & services tax under Indian slabs.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Toggle Mode */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setAddGst(true)}
            className={`py-2.5 rounded-xl font-bold text-sm transition-all ${addGst ? 'bg-white shadow text-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Add GST (Exclusive)
          </button>
          <button
            onClick={() => setAddGst(false)}
            className={`py-2.5 rounded-xl font-bold text-sm transition-all ${!addGst ? 'bg-white shadow text-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Remove GST (Inclusive)
          </button>
        </div>

        {/* Input Cost */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Base Cost Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-800 text-lg focus:border-orange-500 outline-none"
          />
        </div>

        {/* Slab Chips */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">GST Rate Slab</label>
          <div className="grid grid-cols-4 gap-3">
            {[5, 12, 18, 28].map(s => (
              <button
                key={s}
                onClick={() => setSlab(s)}
                className={`py-3 rounded-2xl font-black text-sm transition-all ${slab === s ? 'bg-orange-500 text-white shadow-lg shadow-orange-100 scale-105' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                {s}%
              </button>
            ))}
          </div>
        </div>

        {/* Calculations Results */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
          <div className="flex justify-between items-center text-sm text-slate-500">
            <span>CGST (Central Tax {rate / 2}%):</span>
            <span className="font-bold text-slate-700">₹{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-slate-500 border-b border-slate-200 pb-3">
            <span>SGST (State Tax {rate / 2}%):</span>
            <span className="font-bold text-slate-700">₹{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-slate-500">
            <span>Total GST Tax Amount ({rate}%):</span>
            <span className="font-black text-slate-800">₹{gstAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center text-base font-black text-slate-900 border-t border-slate-200 pt-3">
            <span>{addGst ? 'Total Payable (Cost + Tax):' : 'Pre-Tax Cost Amount:'}</span>
            <span className="text-lg text-orange-500">
              ₹{(addGst ? finalAmt : (amt - gstAmt)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== AGE CALCULATOR ====================
function AgeCalculator({ onBack }) {
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [calculated, setCalculated] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const today = new Date();
    const dob = new Date(birthDate);

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    // Days until next birthday
    let nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (today > nextBday) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = Math.abs(nextBday - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Chinese Zodiac (Simple list start from 1900 Rat)
    const zodiacs = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const dobYear = dob.getFullYear();
    const zodiacIndex = (dobYear - 1900) % 12;
    const zodiac = dobYear >= 1900 ? zodiacs[zodiacIndex] : 'Unknown';

    setCalculated({
      years,
      months,
      days,
      nextBirthdayDays: diffDays === 365 ? 0 : diffDays,
      zodiac
    });
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Clock className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Elephant's precise Age Tracker</h3>
          <p className="text-sm text-slate-500">Find absolute age, days to next birthday, and wildlife zodiacs.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Select Date of Birth</label>
          <div className="flex gap-3">
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:border-orange-500 outline-none"
            />
            <button
              onClick={calculateAge}
              className="px-6 bg-slate-900 hover:bg-orange-500 text-white rounded-2xl font-bold transition-all shadow-md"
            >
              Solve
            </button>
          </div>
        </div>

        {calculated && (
          <div className="space-y-4">
            {/* Age grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <span className="text-3xl font-black text-orange-500">{calculated.years}</span>
                <span className="block text-[10px] font-bold text-slate-400 uppercase mt-1">Years</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <span className="text-3xl font-black text-orange-500">{calculated.months}</span>
                <span className="block text-[10px] font-bold text-slate-400 uppercase mt-1">Months</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <span className="text-3xl font-black text-orange-500">{calculated.days}</span>
                <span className="block text-[10px] font-bold text-slate-400 uppercase mt-1">Days</span>
              </div>
            </div>

            {/* Extra details card */}
            <div className="bg-slate-55 border border-slate-100 rounded-3xl p-5 text-sm space-y-3 bg-orange-50/20">
              <div className="flex justify-between text-slate-600">
                <span>Days Until Next Birthday:</span>
                <span className="font-black text-orange-600">{calculated.nextBirthdayDays} Days</span>
              </div>
              <div className="flex justify-between text-slate-600 border-t border-slate-200/50 pt-2.5">
                <span>Wildlife Chinese Zodiac:</span>
                <span className="font-bold text-slate-800">🦁 Mighty {calculated.zodiac}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
