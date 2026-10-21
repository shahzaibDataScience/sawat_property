import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPricePKR,
  convertAreaToSqFt,
  calculateMortgage,
  generateWhatsAppLink,
  filterProperties,
  sortProperties,
} from './propertyUtils.ts';
import { PropertyListing } from '../types/property.ts';

test('formatPricePKR formats Crore, Lakh, and Rent prices correctly in PKR', () => {
  assert.equal(formatPricePKR(25000000, 'sale'), 'PKR 2.5 Crore');
  assert.equal(formatPricePKR(10000000, 'sale'), 'PKR 1 Crore');
  assert.equal(formatPricePKR(8500000, 'sale'), 'PKR 85 Lakh');
  assert.equal(formatPricePKR(45000, 'rent'), 'PKR 45,000 / month');
  assert.equal(formatPricePKR(150000, 'rent'), 'PKR 1.5 Lakh / month');
});

test('convertAreaToSqFt converts Marla and Kanal accurately', () => {
  assert.equal(convertAreaToSqFt(5, 'Marla'), 1125);
  assert.equal(convertAreaToSqFt(1, 'Kanal'), 4500);
  assert.equal(convertAreaToSqFt(500, 'Sq. Ft.'), 500);
});

test('calculateMortgage computes monthly installment and loan amount accurately', () => {
  // Principal 1 Crore (10,000,000), 20% down payment (2,000,000), loan 8,000,000
  // Rate 12% annual, 10 years
  const res = calculateMortgage(10000000, 20, 12, 10);
  assert.equal(res.downPaymentAmount, 2000000);
  assert.equal(res.loanAmount, 8000000);
  assert.ok(res.monthlyPayment > 110000 && res.monthlyPayment < 120000);
  assert.ok(res.totalPayment > res.loanAmount);
  assert.ok(res.totalInterest > 0);
});

test('generateWhatsAppLink generates encoded click-to-chat URL', () => {
  const url = generateWhatsAppLink('+92 300 1234567', 'Assalam-o-Alaikum, I am interested in this property on Swat Property Portal');
  assert.ok(url.startsWith('https://wa.me/923001234567?text='));
  assert.ok(url.includes('Assalam-o-Alaikum'));
});

test('filterProperties and sortProperties work as expected', () => {
  const sampleListings: PropertyListing[] = [
    {
      id: 'prop-1',
      slug: '5-marla-house-mingora',
      title: '5 Marla Modern House',
      titleUrdu: '5 مرلہ مکان',
      purpose: 'sale',
      type: 'house',
      price: 15000000,
      priceFormatted: 'PKR 1.5 Crore',
      areaValue: 5,
      areaUnit: 'Marla',
      beds: 3,
      baths: 3,
      parking: 1,
      furnished: true,
      location: 'Kanju Township Road',
      areaName: 'Kanju',
      address: 'Sector B, Kanju Township, Swat',
      description: 'Modern house',
      descriptionUrdu: 'جدید مکان',
      features: ['Electricity', 'Sui Gas'],
      images: ['https://example.com/1.jpg'],
      contactPhone: '+923001234567',
      whatsapp: '+923001234567',
      postedDate: '2026-03-01',
      isFeatured: true,
      coordinates: { lat: 34.77, lng: 72.36 },
    },
    {
      id: 'prop-2',
      slug: 'flat-for-rent-kalam',
      title: 'Luxury 2 Bed Flat for Rent',
      titleUrdu: '2 بیڈ فلیٹ کرایہ',
      purpose: 'rent',
      type: 'flat',
      price: 60000,
      priceFormatted: 'PKR 60,000 / month',
      areaValue: 4,
      areaUnit: 'Marla',
      beds: 2,
      baths: 2,
      parking: 1,
      furnished: true,
      location: 'River Road',
      areaName: 'Kalam',
      address: 'Near Kalam Bazar',
      description: 'River view flat',
      descriptionUrdu: 'خوبصورت فلیٹ',
      features: ['River View', 'Heater'],
      images: ['https://example.com/2.jpg'],
      contactPhone: '+923001234567',
      whatsapp: '+923001234567',
      postedDate: '2026-03-10',
      isFeatured: false,
      coordinates: { lat: 35.48, lng: 72.58 },
    },
  ];

  const forSaleOnly = filterProperties(sampleListings, { purpose: 'sale' });
  assert.equal(forSaleOnly.length, 1);
  assert.equal(forSaleOnly[0].id, 'prop-1');

  const kalamOnly = filterProperties(sampleListings, { areaName: 'Kalam' });
  assert.equal(kalamOnly.length, 1);
  assert.equal(kalamOnly[0].id, 'prop-2');

  const sorted = sortProperties(sampleListings, 'price-high');
  assert.equal(sorted[0].id, 'prop-1');
});
