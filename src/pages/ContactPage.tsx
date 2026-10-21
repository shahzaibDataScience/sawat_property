import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { generateWhatsAppLink } from '../utils/propertyUtils';

export const ContactPage: React.FC = () => {
  const { isUrdu } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Buying Property in Swat');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitted(true);
  };

  const whatsAppLink = generateWhatsAppLink(
    '+923001234567',
    'Assalam-o-Alaikum, I am interested in this property on Swat Property Portal'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
          {isUrdu ? 'رابطہ و ملاقات' : 'Get in Touch'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-stone-900 tracking-tight">
          {isUrdu ? 'ہم سے رابطہ کریں' : 'Contact Swat Property'}
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm">
          Have questions about buying, selling, or legal title verification in Swat? Our team is available 6 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 card-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2f5d3a] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm font-heading">
                {isUrdu ? 'سوات ہیڈ آفس' : 'Mingora Head Office'}
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Main Bypass Road, Fizagat, Mingora, Swat, KP, Pakistan
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 card-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm font-heading">
                {isUrdu ? 'فون اور واٹس ایپ' : 'Phone & WhatsApp Hotline'}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Direct Call: <a href="tel:+923001234567" className="font-semibold text-stone-900 hover:text-emerald-700">+92 300 1234567</a>
              </p>
              <p className="text-xs text-stone-600">
                Landline: <span className="font-semibold text-stone-900">+92 946 720000</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 card-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2f5d3a] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm font-heading">
                {isUrdu ? 'دفتری اوقات' : 'Office Working Hours'}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Monday to Saturday: 9:00 AM – 8:00 PM (PKT)
              </p>
              <p className="text-[11px] text-stone-400">
                Sunday: Closed (WhatsApp emergency responses active)
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{isUrdu ? 'واٹس ایپ پر میسج بھیجیں' : 'Chat via WhatsApp Now'}</span>
            </a>

            <a
              href="tel:+923001234567"
              className="w-full py-3 rounded-xl bg-[#2f5d3a] hover:bg-[#254b2e] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call Helpline: +92 300 1234567</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 card-shadow space-y-6">
            <h3 className="text-xl font-bold font-heading text-stone-900 border-b border-stone-100 pb-3">
              {isUrdu ? 'ہمیں آن لائن پیغام بھیجیں' : 'Send an Online Message / Property Request'}
            </h3>

            {submitted ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950 font-heading">
                  {isUrdu ? 'آپ کا پیغام کامیابی سے موصول ہو گیا ہے!' : 'Thank You! Message Dispatched'}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  A representative from our Swat office will reach out to you via call or WhatsApp within a few hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-5 py-2 rounded-lg bg-[#2f5d3a] text-white text-xs font-semibold"
                >
                  {isUrdu ? 'ایک اور پیغام بھیجیں' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {isUrdu ? 'آپ کا نام *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Ullah"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#2f5d3a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {isUrdu ? 'موبائل یا واٹس ایپ نمبر *' : 'Phone / WhatsApp Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#2f5d3a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {isUrdu ? 'ای میل ایڈریس' : 'Email Address (Optional)'}
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#2f5d3a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {isUrdu ? 'موضوع' : 'Inquiry Purpose'}
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none bg-white cursor-pointer"
                    >
                      <option value="Buying Property in Swat">Buying Property in Swat</option>
                      <option value="Renting a House / Flat">Renting a House / Flat</option>
                      <option value="Listing / Selling My Property">Listing / Selling My Property</option>
                      <option value="Commercial Hotel Land in Kalam">Commercial Hotel Land in Kalam</option>
                      <option value="Legal Title / Revenue Verification">Legal Title / Revenue Verification</option>
                      <option value="Overseas Pakistani Inquiry">Overseas Pakistani Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isUrdu ? 'آپ کی ضروریات یا پیغام *' : 'How Can We Assist You? *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you are looking for (area, budget, bedrooms, preferred time for visit)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#2f5d3a] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isUrdu ? 'پیغام ارسال کریں' : 'Send Inquiry Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 card-shadow space-y-4">
        <h3 className="text-lg font-bold font-heading text-stone-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-700" />
          <span>{isUrdu ? 'دفتر کا گوگل میپ' : 'Office Location Map in Mingora, Swat'}</span>
        </h3>
        <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-stone-200">
          <iframe
            title="Swat Property Mingora Office"
            src="https://maps.google.com/maps?q=34.7758,72.3626&hl=en&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};
