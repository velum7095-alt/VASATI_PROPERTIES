'use client';

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(8000000); // ₹80 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% p.a.
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  const { monthlyEmi, totalInterest, totalPayment } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) {
      const emi = P / n;
      return { monthlyEmi: Math.round(emi), totalInterest: 0, totalPayment: P };
    }
    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const total = emi * n;
    const interest = total - P;
    return {
      monthlyEmi: emi,
      totalInterest: Math.round(interest),
      totalPayment: Math.round(total),
    };
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full mb-2 border border-emerald-200">
          <Calculator className="w-3.5 h-3.5 text-emerald-600" />
          Indian Home Loan Estimator
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Estimate Monthly EMIs for Bangalore Homes
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Simulate monthly repayment schedules based on current benchmark rates from SBI, HDFC Bank, and ICICI Bank.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Loan Principal (₹)</span>
              <span className="text-emerald-700 font-extrabold text-sm">
                ₹ {(loanAmount / 100000).toFixed(1)} Lakhs
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={30000000}
              step={500000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹10 L</span>
              <span>₹1.5 Cr</span>
              <span>₹3.0 Cr</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Interest Rate (% per annum)</span>
              <span className="text-emerald-700 font-extrabold text-sm">{interestRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={7.0}
              max={13.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>7.0%</span>
              <span>8.5% (Benchmark)</span>
              <span>13.0%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Loan Tenure (Years)</span>
              <span className="text-emerald-700 font-extrabold text-sm">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>5 Yrs</span>
              <span>20 Yrs</span>
              <span>30 Yrs</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-slate-800">
          <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
            Estimated Monthly EMI
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 my-3 tracking-tight">
            ₹ {monthlyEmi.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mb-6">
            Approximate EMI based on {interestRate}% for {tenureYears} years.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-800 text-xs">
            <div className="text-left">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Principal Loan</span>
              <strong className="text-white text-sm">₹ {(loanAmount / 100000).toFixed(1)} L</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Interest</span>
              <strong className="text-emerald-300 text-sm">₹ {(totalInterest / 100000).toFixed(1)} L</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

