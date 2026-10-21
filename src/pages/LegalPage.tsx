import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  type: 'terms' | 'privacy';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { isUrdu } = useLanguage();

  const isTerms = type === 'terms';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-extrabold font-heading text-stone-900">
          {isTerms ? (isUrdu ? 'شرائط و ضوابط' : 'Terms of Service') : (isUrdu ? 'پرائیویسی پالیسی' : 'Privacy Policy')}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Last Updated: March 2026 • Swat Property Real Estate Advisory
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 card-shadow space-y-6 text-stone-700 text-sm leading-relaxed">
        {isTerms ? (
          <>
            <section className="space-y-2">
              <h2 className="font-bold text-base text-stone-900">1. Acceptance of Terms</h2>
              <p>
                By accessing, browsing, or submitting property listings on swatproperty.pk, you agree to be legally bound by these terms, applicable laws of Khyber Pakhtunkhwa, and real estate regulations of Pakistan.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-base text-stone-900">2. Accuracy of Property Information</h2>
              <p>
                All property listings, dimensions in Marlas and Kanals, prices in PKR, and descriptions are compiled with high diligence. However, prospective buyers are urged to perform independent legal verification of Revenue records (Fard Malkiyat & Intiqal) prior to paying token bayana. Swat Property provides certified legal auditing services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-base text-stone-900">3. Commission and Agency Advisory Fees</h2>
              <p>
                Standard brokerage commissions adhere to regional association standards: 1% from buyer and 1% from seller upon successful completion of sale/transfer deeds. For rentals, standard 1-month rental fee applies unless otherwise agreed in writing.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-base text-stone-900">4. Limitation of Liability</h2>
              <p>
                Swat Property shall not be liable for any indirect or consequential loss arising from property transactions conducted privately outside of official registered agency contracts.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="font-bold text-base text-stone-900">1. Information We Collect</h2>
              <p>
                We collect information provided directly by you when submitting property inquiries, listing properties for sale or rent, contacting us via WhatsApp, or saving favorites locally on your device.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-base text-stone-900">2. How We Use Your Data</h2>
              <p>
                Your phone number and property specifications are used exclusively to connect you with verified sellers, facilitate site visits, and respond to direct customer inquiries. We never sell or distribute your personal contact information to unauthorized marketing agencies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-base text-stone-900">3. Local Storage</h2>
              <p>
                We use browser localStorage solely to preserve your saved favorite properties and language preference (English/Urdu) across browsing sessions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-base text-stone-900">4. Contacting Data Protection</h2>
              <p>
                For questions regarding data privacy, reach out to info@swatproperty.pk or visit our Mingora office.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
