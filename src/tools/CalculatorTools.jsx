import React, { useState, useRef } from 'react';
import { Calculator, Percent, Clock, ArrowLeft, RotateCcw, FileText, Plus, Trash2, Download, RefreshCw, Landmark, Coins, TrendingUp } from 'lucide-react';

export default function CalculatorTools({ activeTool, onBack }) {
  const norm = activeTool.toLowerCase();

  if (norm.includes('emi')) {
    return <EmiCalculator onBack={onBack} />;
  }
  if (norm.includes('gst')) {
    return <GstCalculator onBack={onBack} />;
  }
  if (norm.includes('invoice')) {
    return <InvoiceGenerator onBack={onBack} />;
  }
  if (norm.includes('currency')) {
    return <CurrencyConverter onBack={onBack} />;
  }
  if (norm.includes('loan')) {
    return <LoanCalculator onBack={onBack} />;
  }
  if (norm.includes('sip') || norm.includes('systematic')) {
    return <SipCalculator onBack={onBack} />;
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>
      <h3 className="text-3xl font-black text-slate-900 mb-4">Mighty Elephant's Calculators</h3>
      <p className="text-slate-500 mb-8">Please choose a dedicated calculator from the categories above.</p>
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

  // Generate annual amortization table
  const amortizationTable = [];
  let remainingBalance = P;
  const r = R / 12 / 100;
  
  for (let year = 1; year <= tenure; year++) {
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;
    
    for (let month = 1; month <= 12; month++) {
      const interestMonth = remainingBalance * r;
      const principalMonth = emi - interestMonth;
      
      yearlyInterest += interestMonth;
      yearlyPrincipal += principalMonth;
      remainingBalance -= principalMonth;
    }
    
    amortizationTable.push({
      year,
      principalPaid: Math.round(yearlyPrincipal),
      interestPaid: Math.round(yearlyInterest),
      endingBalance: Math.max(0, Math.round(remainingBalance))
    });
  }

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
          <Calculator className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Elephant's Smart EMI Calculator</h3>
          <p className="text-sm text-slate-500">Calculate monthly loan installments and visual breakdowns instantly.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center border-b border-slate-100 pb-8 mb-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700 uppercase">Loan Amount (₹)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-40 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:border-amber-500 outline-none text-sm"
              />
            </div>
            <input
              type="range"
              min="100000"
              max="20000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full accent-amber-500"
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
                className="w-24 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:border-amber-500 outline-none text-sm"
              />
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full accent-amber-500"
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
                className="w-20 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:border-amber-500 outline-none text-sm"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full accent-amber-500"
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
            <h4 className="text-3xl font-black text-amber-500">
              ₹{Math.round(emi).toLocaleString('en-IN')}
            </h4>
          </div>

          {/* Pure SVG Donut Chart */}
          <div className="relative w-44 h-44 mb-6">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#d97706"
                strokeWidth="3.5"
                strokeDasharray={`${principalRatio} ${100 - principalRatio}`}
                strokeDashoffset="0"
                className="transition-all duration-500"
              />
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#475569"
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
                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
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
              <span className="text-amber-600">₹{Math.round(totalPayable).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      <div className="space-y-4">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Annual Amortization breakdown schedule</h4>
        <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-72 overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 sticky top-0">
              <tr>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3 text-right">Principal Paid</th>
                <th className="px-4 py-3 text-right">Interest Paid</th>
                <th className="px-4 py-3 text-right">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {amortizationTable.map(row => (
                <tr key={row.year} className="hover:bg-slate-50/50">
                  <td className="px-4 py-2.5 font-bold text-slate-800">Year {row.year}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-slate-700">₹{row.principalPaid.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-slate-700">₹{row.interestPaid.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2.5 text-right font-black text-slate-900">₹{row.endingBalance.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
          <Percent className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Elephant's GST Calculator</h3>
          <p className="text-sm text-slate-500">Calculate inclusive/exclusive goods & services tax under standard slabs.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Toggle Mode */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setAddGst(true)}
            className={`py-2.5 rounded-xl font-bold text-sm transition-all ${addGst ? 'bg-white shadow text-amber-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Add GST (Exclusive)
          </button>
          <button
            onClick={() => setAddGst(false)}
            className={`py-2.5 rounded-xl font-bold text-sm transition-all ${!addGst ? 'bg-white shadow text-amber-600' : 'text-slate-600 hover:text-slate-900'}`}
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
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-800 text-lg focus:border-amber-500 outline-none"
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
                className={`py-3 rounded-2xl font-black text-sm transition-all ${slab === s ? 'bg-amber-500 text-white shadow-lg shadow-amber-100 scale-105' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
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
            <span className="text-lg text-amber-600">
              ₹{(addGst ? finalAmt : (amt - gstAmt)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== INVOICE GENERATOR ====================
function InvoiceGenerator({ onBack }) {
  const [invoiceMeta, setInvoiceMeta] = useState({
    logo: '',
    senderName: 'Mighty Elephant Consulting',
    senderAddress: '56 Tech Park Road, Whitefield, Bengaluru, IN',
    senderEmail: 'billing@elephantconsulting.in',
    clientName: 'Acme Solutions Inc',
    clientAddress: '101 Corporate Plaza, DLF Cybercity, Gurgaon, IN',
    clientEmail: 'procure@acmesolutions.com',
    invoiceNum: 'ME-2026-0815',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: '₹',
    taxRate: 18,
  });

  const [items, setItems] = useState([
    { id: 1, desc: 'Technical Architecture Strategy Consulting', qty: 1, price: 120000 },
    { id: 2, desc: 'API Gateway Integration & Client Hashing Modules', qty: 1, price: 45000 },
  ]);

  const handleMetaChange = (key, val) => {
    setInvoiceMeta(prev => ({ ...prev, [key]: val }));
  };

  const updateItem = (id, key, val) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        let parsed = val;
        if (key === 'qty') parsed = parseInt(val) || 0;
        if (key === 'price') parsed = parseFloat(val) || 0;
        return { ...item, [key]: parsed };
      }
      return item;
    }));
  };

  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now(), desc: 'New consultancy service description', qty: 1, price: 10000 }]);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = items.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);
  const taxAmount = (subtotal * invoiceMeta.taxRate) / 100;
  const total = subtotal + taxAmount;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${invoiceMeta.invoiceNum}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; padding: 40px; margin: 0; line-height: 1.5; }
            .header-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            .header-table td { vertical-align: top; }
            .logo { font-size: 28px; font-weight: 800; color: #d97706; margin-bottom: 5px; }
            .meta-title { font-size: 32px; font-weight: 900; text-align: right; text-transform: uppercase; color: #1e293b; }
            .details-grid { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            .details-grid td { width: 50%; vertical-align: top; font-size: 14px; }
            .details-grid strong { color: #1e293b; }
            .item-table { width: 100%; border-collapse: collapse; margin-bottom: 45px; }
            .item-table th { background: #f1f5f9; text-align: left; padding: 12px 15px; font-weight: bold; border-bottom: 2px solid #cbd5e1; font-size: 14px; }
            .item-table td { padding: 12px 15px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
            .totals-table { width: 40%; margin-left: auto; border-collapse: collapse; font-size: 14px; }
            .totals-table td { padding: 8px 15px; text-align: right; }
            .totals-table tr.total-row { font-size: 18px; font-weight: 800; color: #d97706; }
            .footer-note { margin-top: 80px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <div class="logo">TOOLTROVE</div>
                <div>${invoiceMeta.senderName}</div>
                <div>${invoiceMeta.senderAddress}</div>
                <div>${invoiceMeta.senderEmail}</div>
              </td>
              <td>
                <div class="meta-title">Invoice</div>
                <div style="text-align: right; font-size: 14px; margin-top: 10px;">
                  <strong>Invoice No:</strong> ${invoiceMeta.invoiceNum}<br/>
                  <strong>Date:</strong> ${invoiceMeta.date}<br/>
                  <strong>Due Date:</strong> ${invoiceMeta.dueDate}
                </div>
              </td>
            </tr>
          </table>

          <table class="details-grid">
            <tr>
              <td>
                <strong>Billed To:</strong><br/>
                ${invoiceMeta.clientName}<br/>
                ${invoiceMeta.clientAddress}<br/>
                ${invoiceMeta.clientEmail}
              </td>
              <td>
                <strong>Payment Terms:</strong><br/>
                Standard Net-15 days transfer<br/>
                <strong>Payment Status:</strong> Pending Verification
              </td>
            </tr>
          </table>

          <table class="item-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th style="text-align: center; width: 80px;">Qty</th>
                <th style="text-align: right; width: 120px;">Unit Price</th>
                <th style="text-align: right; width: 150px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.desc}</td>
                  <td style="text-align: center;">${item.qty}</td>
                  <td style="text-align: right;">${invoiceMeta.currency}${item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style="text-align: right; font-weight: 600;">${invoiceMeta.currency}${(item.qty * item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <table class="totals-table">
            <tr>
              <td>Subtotal:</td>
              <td style="font-weight: 600;">${invoiceMeta.currency}${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td>Taxes (${invoiceMeta.taxRate}%):</td>
              <td style="font-weight: 600;">${invoiceMeta.currency}${taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr class="total-row">
              <td>Total Due:</td>
              <td>${invoiceMeta.currency}${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
          </table>

          <div class="footer-note">
            Thank you for nesting with Mighty Elephant. All invoice operations execute locally client-side.
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Habitation
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold shadow-lg shadow-amber-200 flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Download className="w-5 h-5" /> Export PDF Invoice
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
          <FileText className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Elephant's Corporate Invoice Generator</h3>
          <p className="text-sm text-slate-500">Create, customize, calculate taxes, and print professional billing sheets directly.</p>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8 border-b border-slate-100 pb-8">
        {/* Sender details */}
        <div className="space-y-4">
          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">From (Your Company)</h4>
          <input
            type="text"
            value={invoiceMeta.senderName}
            onChange={(e) => handleMetaChange('senderName', e.target.value)}
            placeholder="Sender Business Name"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-amber-500 outline-none text-sm font-semibold"
          />
          <input
            type="text"
            value={invoiceMeta.senderEmail}
            onChange={(e) => handleMetaChange('senderEmail', e.target.value)}
            placeholder="Sender Email Address"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-amber-500 outline-none text-sm"
          />
          <textarea
            value={invoiceMeta.senderAddress}
            onChange={(e) => handleMetaChange('senderAddress', e.target.value)}
            placeholder="Sender Postal Address"
            rows="2"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-amber-500 outline-none text-sm"
          />
        </div>

        {/* Client details */}
        <div className="space-y-4">
          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">To (Client)</h4>
          <input
            type="text"
            value={invoiceMeta.clientName}
            onChange={(e) => handleMetaChange('clientName', e.target.value)}
            placeholder="Client Company Name"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-amber-500 outline-none text-sm font-semibold"
          />
          <input
            type="text"
            value={invoiceMeta.clientEmail}
            onChange={(e) => handleMetaChange('clientEmail', e.target.value)}
            placeholder="Client Email Address"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-amber-500 outline-none text-sm"
          />
          <textarea
            value={invoiceMeta.clientAddress}
            onChange={(e) => handleMetaChange('clientAddress', e.target.value)}
            placeholder="Client Postal Address"
            rows="2"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-amber-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* Invoice Meta Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Invoice ID</label>
          <input
            type="text"
            value={invoiceMeta.invoiceNum}
            onChange={(e) => handleMetaChange('invoiceNum', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-amber-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Invoice Date</label>
          <input
            type="date"
            value={invoiceMeta.date}
            onChange={(e) => handleMetaChange('date', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-amber-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Due Date</label>
          <input
            type="date"
            value={invoiceMeta.dueDate}
            onChange={(e) => handleMetaChange('dueDate', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-amber-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Tax Rate (%)</label>
          <input
            type="number"
            value={invoiceMeta.taxRate}
            onChange={(e) => handleMetaChange('taxRate', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-amber-500 outline-none"
          />
        </div>
      </div>

      {/* Dynamic line items */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <h4 className="font-black text-slate-800 text-lg">Line Items & Services</h4>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-amber-500 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-slate-700">Description</th>
                <th className="px-4 py-3 text-center font-bold text-slate-700 w-24">Qty</th>
                <th className="px-4 py-3 text-right font-bold text-slate-700 w-32">Unit Price</th>
                <th className="px-4 py-3 text-right font-bold text-slate-700 w-36">Total</th>
                <th className="px-4 py-3 text-center font-bold text-slate-700 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="p-3">
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                      className="w-full px-3 py-1.5 border border-transparent hover:border-slate-200 focus:border-amber-500 rounded-lg outline-none font-semibold text-slate-800 text-sm"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                      min="1"
                      className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 focus:border-amber-500 rounded-lg outline-none text-center font-bold text-slate-800 text-sm"
                    />
                  </td>
                  <td className="p-3 text-right">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                      className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 focus:border-amber-500 rounded-lg outline-none text-right font-bold text-slate-800 text-sm"
                    />
                  </td>
                  <td className="p-3 text-right font-bold text-slate-900 pr-5">
                    {invoiceMeta.currency}{(item.qty * item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-center">
                    {items.length > 1 && (
                      <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill summary card */}
      <div className="flex justify-end mb-4">
        <div className="w-full md:w-80 bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3.5 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal:</span>
            <span className="font-semibold text-slate-700">{invoiceMeta.currency}{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-slate-500 border-b border-slate-200 pb-3">
            <span>Taxes ({invoiceMeta.taxRate}%):</span>
            <span className="font-semibold text-slate-700">{invoiceMeta.currency}{taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-lg font-black text-slate-900 pt-1">
            <span>Total:</span>
            <span className="text-amber-600">{invoiceMeta.currency}{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== CURRENCY CONVERTER ====================
function CurrencyConverter({ onBack }) {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState(8334.5);
  const [copied, setCopied] = useState(false);

  const rates = {
    USD: { USD: 1, INR: 83.35, EUR: 0.92, GBP: 0.79, JPY: 156.42 },
    INR: { USD: 0.012, INR: 1, EUR: 0.011, GBP: 0.0095, JPY: 1.88 },
    EUR: { USD: 1.09, INR: 90.62, EUR: 1, GBP: 0.86, JPY: 170.05 },
    GBP: { USD: 1.27, INR: 105.51, EUR: 1.16, GBP: 1, JPY: 197.98 },
    JPY: { USD: 0.0064, INR: 0.53, EUR: 0.0059, GBP: 0.0051, JPY: 1 }
  };

  const handleConvert = () => {
    const amt = parseFloat(amount) || 0;
    const rateFactor = rates[fromCurrency]?.[toCurrency] || 1;
    setResult((amt * rateFactor));
  };

  React.useEffect(() => {
    handleConvert();
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
          <Coins className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Elephant's Currency Converter</h3>
          <p className="text-sm text-slate-500">Calculate exact currency exchanges in standard globally traded pairs client-side.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Convert Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-800 text-lg focus:border-amber-500 outline-none"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:border-amber-500"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl mt-8 flex items-center justify-center text-slate-500 shrink-0"
              title="Swap Currencies"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:border-amber-500"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Outcome result screen */}
        <div className="bg-slate-50 border border-slate-150 p-6 rounded-3xl text-center space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase">Converted Value Result</p>
          <h4 className="text-3xl font-black text-amber-500">
            {toCurrency === 'INR' ? '₹' : toCurrency === 'USD' ? '$' : toCurrency === 'EUR' ? '€' : toCurrency === 'GBP' ? '£' : '¥'}
            {result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h4>
          <p className="text-[10px] text-slate-400 font-bold">1 {fromCurrency} = {rates[fromCurrency]?.[toCurrency]} {toCurrency}</p>
        </div>
      </div>
    </div>
  );
}

// ==================== LOAN CALCULATOR ====================
function LoanCalculator({ onBack }) {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(5);
  const [frequency, setFrequency] = useState(12); // compound monthly
  const [extraPayment, setExtraPayment] = useState(1000);

  const P = parseFloat(loanAmount) || 0;
  const R = parseFloat(interestRate) || 0;
  const t = parseInt(tenure) || 0;
  const m = parseInt(frequency) || 12;
  const extra = parseFloat(extraPayment) || 0;

  // Standard Compound Loan formula
  const r = R / 100 / m;
  const totalMonths = t * 12;
  
  let emiStandard = 0;
  if (P > 0 && r > 0 && totalMonths > 0) {
    emiStandard = (P * r * Math.pow(1 + r, totalMonths)) / (Math.pow(1 + r, totalMonths) - 1);
  }

  // Calculate schedule with extra payments
  let balance = P;
  let monthsPaid = 0;
  let totalInterestPaid = 0;
  const schedule = [];

  while (balance > 0 && monthsPaid < totalMonths * 2) {
    monthsPaid++;
    const interestMonth = balance * r;
    const principalStandard = emiStandard - interestMonth;
    const principalMonth = principalStandard + extra;
    
    totalInterestPaid += interestMonth;
    balance -= Math.min(balance, principalMonth);
    
    if (monthsPaid <= totalMonths) {
      schedule.push({
        month: monthsPaid,
        interest: interestMonth,
        balance: Math.round(balance)
      });
    }
    
    if (balance <= 0) break;
  }

  const standardTotalPayable = emiStandard * totalMonths;
  const standardInterest = standardTotalPayable - P;
  
  const totalInterestSaved = Math.max(0, standardInterest - totalInterestPaid);
  const monthsSaved = Math.max(0, totalMonths - monthsPaid);

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
          <Landmark className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Elephant's Loan Compound & Extra Payments Analyzer</h3>
          <p className="text-sm text-slate-500">Examine how compound structures and monthly extra payments affect total interest savings.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center border-b border-slate-100 pb-8 mb-8">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Loan Principal (₹)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-amber-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Interest (% p.a.)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Tenure (Years)</label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Monthly Extra prepayments (₹)</label>
            <input
              type="number"
              value={extraPayment}
              onChange={(e) => setExtraPayment(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-amber-600 focus:border-amber-500 outline-none"
            />
          </div>
        </div>

        {/* Amortization Compound Results */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
          <div className="text-center border-b border-slate-200 pb-4">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Interest Paid</span>
            <span className="text-3xl font-black text-slate-800">₹{Math.round(totalInterestPaid).toLocaleString('en-IN')}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl text-center">
              <span className="block text-[9px] font-bold text-emerald-600 uppercase">Interest Saved</span>
              <span className="text-base font-black text-emerald-700">₹{Math.round(totalInterestSaved).toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl text-center">
              <span className="block text-[9px] font-bold text-emerald-600 uppercase">Duration Saved</span>
              <span className="text-base font-black text-emerald-700">
                {monthsSaved > 12 
                  ? `${Math.floor(monthsSaved / 12)} Y, ${monthsSaved % 12} M` 
                  : `${monthsSaved} Months`}
              </span>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 font-semibold pt-1">
            Standard Term: {totalMonths} months • Prepayment Term: {monthsPaid} months
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== SIP CALCULATOR ====================
function SipCalculator({ onBack }) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [tenure, setTenure] = useState(10);

  const P = parseFloat(monthlyInvestment) || 0;
  const i = (parseFloat(expectedReturn) || 0) / 12 / 100;
  const n = (parseInt(tenure) || 0) * 12;

  let investedAmount = P * n;
  let totalValue = 0;
  let estReturns = 0;

  if (P > 0 && i > 0 && n > 0) {
    totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    estReturns = totalValue - investedAmount;
  }

  const investedRatio = totalValue > 0 ? (investedAmount / totalValue) * 100 : 0;
  const returnsRatio = totalValue > 0 ? (estReturns / totalValue) * 100 : 0;

  const sipGrowthProgression = [];
  let cumulativeInvested = 0;
  
  for (let year = 1; year <= tenure; year++) {
    const months = year * 12;
    cumulativeInvested = P * months;
    const yearValue = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    
    sipGrowthProgression.push({
      year,
      invested: Math.round(cumulativeInvested),
      returns: Math.max(0, Math.round(yearValue - cumulativeInvested)),
      total: Math.round(yearValue)
    });
  }

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
          <TrendingUp className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Elephant's Systematic Investment Plan (SIP) Calculator</h3>
          <p className="text-sm text-slate-500">Estimate compounding wealth creation from monthly mutual fund deposits client-side.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center border-b border-slate-100 pb-8 mb-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700 uppercase">Monthly Deposit (₹)</label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
                className="w-32 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:border-amber-500 outline-none text-sm"
              />
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
              <span>₹500</span>
              <span>₹50,000</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700 uppercase">Expected Return Rate (% p.a.)</label>
              <input
                type="number"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-20 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:border-amber-500 outline-none text-sm"
              />
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
              <span>1%</span>
              <span>15%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700 uppercase">Time Period (Years)</label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-20 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-black text-slate-900 focus:border-amber-500 outline-none text-sm"
              />
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
              <span>1 Yr</span>
              <span>20 Yrs</span>
              <span>40 Yrs</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center">
          <div className="text-center mb-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Expected Wealth Value</p>
            <h4 className="text-3xl font-black text-amber-500">
              ₹{Math.round(totalValue).toLocaleString('en-IN')}
            </h4>
          </div>

          <div className="relative w-40 h-40 mb-6">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#475569"
                strokeWidth="3.5"
                strokeDasharray={`${investedRatio} ${100 - investedRatio}`}
                strokeDashoffset="0"
                className="transition-all duration-500"
              />
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#d97706"
                strokeWidth="3.5"
                strokeDasharray={`${returnsRatio} ${100 - returnsRatio}`}
                strokeDashoffset={`-${investedRatio}`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Growth</span>
              <span className="text-base font-black text-slate-800">{Math.round(returnsRatio)}%</span>
            </div>
          </div>

          <div className="w-full space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                <span className="text-slate-500 font-semibold">Invested Principal:</span>
              </div>
              <span className="font-bold text-slate-800">₹{investedAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                <span className="text-slate-500 font-semibold">Wealth Gained:</span>
              </div>
              <span className="font-bold text-slate-800">₹{Math.round(estReturns).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">SIP Compound Progression Chart</h4>
        <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-72 overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 sticky top-0">
              <tr>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3 text-right">Invested Principal</th>
                <th className="px-4 py-3 text-right">Estimated Growth</th>
                <th className="px-4 py-3 text-right">Total Net Worth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sipGrowthProgression.map(row => (
                <tr key={row.year} className="hover:bg-slate-50/50">
                  <td className="px-4 py-2.5 font-bold text-slate-800">Year {row.year}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-slate-700">₹{row.invested.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-slate-700">₹{row.returns.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2.5 text-right font-black text-slate-900">₹{row.total.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
