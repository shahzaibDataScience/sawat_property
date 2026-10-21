import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck } from 'lucide-react';
import { calculateMortgage, formatPricePKR } from '../../utils/propertyUtils';
import { useLanguage } from '../../context/LanguageContext';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPrice = 18500000,
}) => {
  const { isUrdu } = useLanguage();
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(11.5); // Average Islamic Home Musharakah rate in Pakistan
  const [tenureYears, setTenureYears] = useState<number>(10);

  const result = calculateMortgage(propertyPrice, downPaymentPercent, interestRate, tenureYears);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 card-shadow space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#2f5d3a]/10 text-[#2f5d3a] flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 font-heading text-lg">
              {isUrdu ? 'ہوم فنانسنگ / اقساط کیلکولیٹر' : 'Home Loan & Installment Calculator'}
            </h3>
            <p className="text-xs text-stone-500">
              {isUrdu 
                ? 'پاکستانی بینکوں (میزان، بینک اسلامی، وغیرہ) کے مطابق تخمینہ' 
                : 'Estimations based on Meezan Bank / Islamic Home Financing guidelines'}
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
          PKR (Pakistani Rupee)
        </span>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Property Price Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-stone-700">
            <span>{isUrdu ? 'پراپرٹی کی قیمت' : 'Property Value'}</span>
            <span className="text-[#2f5d3a]">{formatPricePKR(propertyPrice, 'sale')}</span>
          </div>
          <input
            type="range"
            min={1000000}
            max={80000000}
            step={500000}
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            className="w-full accent-[#2f5d3a] h-2 bg-stone-200 rounded-lg cursor-pointer"
          />
          <input
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:border-[#2f5d3a] outline-none font-medium"
          />
        </div>

        {/* Down Payment % */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-stone-700">
            <span>{isUrdu ? 'ڈاؤن پیمنٹ (پیشگی ادائیگی)' : 'Down Payment'}</span>
            <span className="text-amber-600 font-bold">
              {downPaymentPercent}% ({formatPricePKR(result.downPaymentAmount, 'sale')})
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={60}
            step={5}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-stone-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-stone-400">
            <span>Min 10%</span>
            <span>30% Recommended</span>
            <span>Max 60%</span>
          </div>
        </div>

        {/* Loan Tenure (Years) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-stone-700">
            <span>{isUrdu ? 'مدتِ قرض (سال)' : 'Loan Tenure'}</span>
            <span className="text-stone-900 font-bold">{tenureYears} Years</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[3, 5, 10, 15].map((yr) => (
              <button
                key={yr}
                onClick={() => setTenureYears(yr)}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  tenureYears === yr
                    ? 'bg-[#2f5d3a] text-white border-[#2f5d3a]'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                {yr} {isUrdu ? 'سال' : 'Yrs'}
              </button>
            ))}
          </div>
        </div>

        {/* Profit / Interest Rate % */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-stone-700">
            <span>{isUrdu ? 'اسلامک بینکاری شرح منافع (سالانہ)' : 'Annual Financing / Profit Rate'}</span>
            <span className="text-stone-900 font-bold">{interestRate}%</span>
          </div>
          <input
            type="range"
            min={8}
            max={22}
            step={0.5}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-stone-400">
            <span>8%</span>
            <span>11.5% KIBOR Approx</span>
            <span>22%</span>
          </div>
        </div>
      </div>

      {/* Output Summary Card */}
      <div className="bg-[#f7f5ed] border border-[#e5dfce] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
            {isUrdu ? 'متوقع ماہانہ قسط (EMI)' : 'Estimated Monthly Installment'}
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#2f5d3a] mt-0.5">
            Rs. {result.monthlyPayment.toLocaleString('en-PK')}
            <span className="text-xs font-normal text-stone-600"> / month</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-[#e5dfce] pt-3 sm:pt-0 sm:pl-6">
          <div>
            <span className="text-stone-500">{isUrdu ? 'قرض کی رقم' : 'Financed Amount'}</span>
            <p className="font-bold text-stone-800">
              {formatPricePKR(result.loanAmount, 'sale')}
            </p>
          </div>
          <div>
            <span className="text-stone-500">{isUrdu ? 'کل سود / منافع' : 'Total Profit Paid'}</span>
            <p className="font-bold text-stone-800">
              {formatPricePKR(result.totalInterest, 'sale')}
            </p>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>
          {isUrdu
            ? 'نوٹ: یہ تخمینہ معلوماتی مقاصد کے لیے ہے۔ حقیقی بینکنگ شرائط بینک پالیسی اور کریڈٹ اسکور پر منحصر ہوتی ہیں۔'
            : 'Disclaimer: Calculations are indicative. Actual installments depend on individual bank verification, KIBOR fluctuations, and financing approvals.'}
        </span>
      </div>
    </div>
  );
};
