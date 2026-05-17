import React, { useState, useRef } from 'react';
import { Plus, Trash2, FileText, Download, Image as ImageIcon, Eye, FileSpreadsheet, ArrowLeft } from 'lucide-react';

export default function DocumentTools({ activeTool, onBack }) {
  if (activeTool === 'Invoice Generator' || activeTool === 'Invoice Generator India' || activeTool === 'Invoice Gen') {
    return <InvoiceGenerator onBack={onBack} />;
  }
  if (activeTool === 'Image to PDF') {
    return <ImageToPDF onBack={onBack} />;
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Library
      </button>
      <h3 className="text-3xl font-black text-slate-900 mb-4">Wise Owl's Document tools</h3>
      <p className="text-slate-500 mb-8">Please choose a tool from the categories above or select one directly.</p>
    </div>
  );
}

// ==================== INVOICE GENERATOR ====================
function InvoiceGenerator({ onBack }) {
  const [invoiceMeta, setInvoiceMeta] = useState({
    logo: '',
    senderName: 'Wise Owl Media',
    senderAddress: '123 Forest Canopy Road, Bengaluru, IN',
    senderEmail: 'billing@wiseowl.io',
    clientName: 'Acme Jungle Corp',
    clientAddress: '456 Grassland Plains, Mumbai, IN',
    clientEmail: 'finance@acmejungle.com',
    invoiceNum: 'WO-2026-0042',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: '₹',
    taxRate: 18,
  });

  const [items, setItems] = useState([
    { id: 1, desc: 'Premium AI Copywriting & Wildlife Design', qty: 1, price: 45000 },
    { id: 2, desc: 'EMI Calculation Web Module Integration', qty: 1, price: 15000 },
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
    setItems(prev => [...prev, { id: Date.now(), desc: 'New Consultancy Service Item', qty: 1, price: 5000 }]);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  // Calculations
  const subtotal = items.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);
  const taxAmount = (subtotal * invoiceMeta.taxRate) / 100;
  const total = subtotal + taxAmount;

  // Print logic using iframe trick to bypass app container boundaries
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
            .logo { font-size: 28px; font-weight: 800; color: #f97316; margin-bottom: 5px; }
            .meta-title { font-size: 32px; font-weight: 900; text-align: right; text-transform: uppercase; color: #1e293b; }
            .details-grid { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            .details-grid td { width: 50%; vertical-align: top; font-size: 14px; }
            .details-grid strong { color: #1e293b; }
            .item-table { width: 100%; border-collapse: collapse; margin-bottom: 45px; }
            .item-table th { background: #f1f5f9; text-align: left; padding: 12px 15px; font-weight: bold; border-bottom: 2px solid #cbd5e1; font-size: 14px; }
            .item-table td { padding: 12px 15px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
            .totals-table { width: 40%; margin-left: auto; border-collapse: collapse; font-size: 14px; }
            .totals-table td { padding: 8px 15px; text-align: right; }
            .totals-table tr.total-row { font-size: 18px; font-weight: 800; color: #f97316; }
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
                <strong>Payment Method:</strong><br/>
                Razorpay Online Secure Transfer<br/>
                <strong>Status:</strong> Unpaid / Pending Verification
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
              <td>GST (${invoiceMeta.taxRate}%):</td>
              <td style="font-weight: 600;">${invoiceMeta.currency}${taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr class="total-row">
              <td>Total Due:</td>
              <td>${invoiceMeta.currency}${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
          </table>

          <div class="footer-note">
            Thank you for nesting with Wise Owl's Habitat. Files processed under SSL 256-bit encryption. All rights reserved.
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
      {/* Top buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Habitation
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Download className="w-5 h-5" /> Export PDF Invoice
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <FileText className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Owl's Premium Invoice Generator</h3>
          <p className="text-sm text-slate-500">Create, customize, and save professional billing invoices instantly.</p>
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
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-sm font-semibold"
          />
          <input
            type="text"
            value={invoiceMeta.senderEmail}
            onChange={(e) => handleMetaChange('senderEmail', e.target.value)}
            placeholder="Sender Email Address"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-sm"
          />
          <textarea
            value={invoiceMeta.senderAddress}
            onChange={(e) => handleMetaChange('senderAddress', e.target.value)}
            placeholder="Sender Postal Address"
            rows="2"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-sm"
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
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-sm font-semibold"
          />
          <input
            type="text"
            value={invoiceMeta.clientEmail}
            onChange={(e) => handleMetaChange('clientEmail', e.target.value)}
            placeholder="Client Email Address"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-sm"
          />
          <textarea
            value={invoiceMeta.clientAddress}
            onChange={(e) => handleMetaChange('clientAddress', e.target.value)}
            placeholder="Client Postal Address"
            rows="2"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none text-sm"
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
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-orange-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Invoice Date</label>
          <input
            type="date"
            value={invoiceMeta.date}
            onChange={(e) => handleMetaChange('date', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-orange-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Due Date</label>
          <input
            type="date"
            value={invoiceMeta.dueDate}
            onChange={(e) => handleMetaChange('dueDate', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:border-orange-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">GST/VAT Tax Rate (%)</label>
          <input
            type="number"
            value={invoiceMeta.taxRate}
            onChange={(e) => handleMetaChange('taxRate', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:border-orange-500 outline-none"
          />
        </div>
      </div>

      {/* Dynamic line items */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <h4 className="font-black text-slate-800 text-lg">Line Items & Services</h4>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-orange-500 transition-colors"
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
              {items.map((item, idx) => (
                <tr key={item.id}>
                  <td className="p-3">
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                      className="w-full px-3 py-1.5 border border-transparent hover:border-slate-200 focus:border-orange-500 rounded-lg outline-none font-semibold text-slate-800 text-sm"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                      min="1"
                      className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 focus:border-orange-500 rounded-lg outline-none text-center font-bold text-slate-800 text-sm"
                    />
                  </td>
                  <td className="p-3 text-right">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                      className="w-full px-2 py-1.5 border border-transparent hover:border-slate-200 focus:border-orange-500 rounded-lg outline-none text-right font-bold text-slate-800 text-sm"
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
            <span>Tax (${invoiceMeta.taxRate}%):</span>
            <span className="font-semibold text-slate-700">{invoiceMeta.currency}{taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-lg font-black text-slate-900 pt-1">
            <span>Total:</span>
            <span className="text-orange-500">{invoiceMeta.currency}{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== IMAGE TO PDF ====================
function ImageToPDF({ onBack }) {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          src: event.target.result,
          size: (file.size / 1024).toFixed(1) + ' KB'
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const clearAll = () => {
    setImages([]);
  };

  const handleCompile = () => {
    if (!images.length) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Image compilation - ToolTrove PDF</title>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; background: #fff; }
            .pdf-page {
              width: 210mm;
              height: 297mm;
              display: flex;
              align-items: center;
              justify-content: center;
              page-break-after: always;
              overflow: hidden;
              box-sizing: border-box;
              padding: 10mm;
            }
            .pdf-page img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
            .pdf-page:last-child {
              page-break-after: avoid;
            }
          </style>
        </head>
        <body>
          ${images.map(img => `
            <div class="pdf-page">
              <img src="${img.src}" />
            </div>
          `).join('')}
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
        {images.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={clearAll}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleCompile}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-200 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Download className="w-4 h-4" /> Compile & Download PDF
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <ImageIcon className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Owl's Image to PDF Converter</h3>
          <p className="text-sm text-slate-500">Add PNG/JPG/WebP files, re-order, and combine into a clean A4 PDF file.</p>
        </div>
      </div>

      {/* Drag & Drop zone */}
      <div
        onClick={() => fileInputRef.current.click()}
        className="border-3 border-dashed border-slate-200 hover:border-orange-400 rounded-3xl p-10 text-center cursor-pointer bg-slate-50/50 hover:bg-orange-50/20 transition-all mb-8 group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />
        <div className="max-w-md mx-auto space-y-2">
          <div className="mx-auto w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-orange-500">
            <Plus className="w-8 h-8" />
          </div>
          <h4 className="text-slate-800 font-bold text-lg pt-2">Click to browse your photos</h4>
          <p className="text-slate-400 text-sm">Upload multiple images (JPEG, PNG, WebP) to build your pages.</p>
        </div>
      </div>

      {/* Images List */}
      {images.length === 0 ? (
        <div className="text-center py-12 border border-slate-100 rounded-2xl text-slate-400 font-medium">
          No images uploaded yet. Drop some pictures above to begin compilation.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={img.id} className="group relative bg-slate-50 border border-slate-200 rounded-2xl p-2.5 flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="aspect-square rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center relative">
                <img src={img.src} alt={img.name} className="max-w-full max-h-full object-contain" />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white rounded-md text-[10px] font-black uppercase">
                  Page {idx + 1}
                </div>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <div className="truncate text-xs font-semibold text-slate-600 pr-2">
                  {img.name}
                </div>
                <button
                  onClick={() => removeImage(img.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white hover:shadow transition-all shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
