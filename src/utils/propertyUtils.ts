import { PropertyListing, FilterState, AreaUnit } from '../types/property';

/**
 * Formats a PKR price value into Crore, Lakh, or thousands string.
 */
export function formatPricePKR(price: number, purpose: 'sale' | 'rent'): string {
  if (purpose === 'rent') {
    if (price >= 100000) {
      const lakhs = price / 100000;
      return `Rs. ${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} Lakh/mo`;
    }
    return `Rs. ${price.toLocaleString('en-PK')}/month`;
  }

  if (price >= 10000000) {
    const crores = price / 10000000;
    return `Rs. ${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2).replace(/\.?0+$/, '')} Crore`;
  } else if (price >= 100000) {
    const lakhs = price / 100000;
    return `Rs. ${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1).replace(/\.?0+$/, '')} Lakh`;
  } else {
    return `Rs. ${price.toLocaleString('en-PK')}`;
  }
}

/**
 * Converts area units to square feet (Standard in KPK: 1 Marla = 225 sq. ft., 1 Kanal = 20 Marla = 4500 sq. ft.)
 */
export function convertAreaToSqFt(value: number, unit: AreaUnit): number {
  switch (unit) {
    case 'Kanal':
      return value * 4500;
    case 'Marla':
      return value * 225;
    case 'Sq. Ft.':
      return value;
    default:
      return value;
  }
}

/**
 * Calculates monthly mortgage / financing payment in PKR.
 */
export function calculateMortgage(
  principal: number,
  downPaymentPercent: number,
  annualInterestRate: number,
  termYears: number
): {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  downPaymentAmount: number;
} {
  const downPaymentAmount = Math.round(principal * (downPaymentPercent / 100));
  const loanAmount = principal - downPaymentAmount;

  if (loanAmount <= 0) {
    return {
      loanAmount: 0,
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      downPaymentAmount,
    };
  }

  const monthlyRate = annualInterestRate / 100 / 12;
  const totalMonths = termYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = Math.round(loanAmount / totalMonths);
  } else {
    monthlyPayment = Math.round(
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  }

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  return {
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest,
    downPaymentAmount,
  };
}

/**
 * Creates a WhatsApp direct click-to-chat URL with pre-filled message
 */
export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Filters a list of property listings based on current filter state
 */
export function filterProperties(
  properties: PropertyListing[],
  filters: Partial<FilterState>
): PropertyListing[] {
  return properties.filter((item) => {
    // Purpose filter
    if (filters.purpose && filters.purpose !== 'all' && item.purpose !== filters.purpose) {
      return false;
    }

    // Type filter
    if (filters.type && filters.type !== 'all' && item.type !== filters.type) {
      return false;
    }

    // Area / Location filter
    if (filters.areaName && filters.areaName !== 'all' && filters.areaName !== '') {
      if (item.areaName.toLowerCase() !== filters.areaName.toLowerCase()) {
        return false;
      }
    }

    // Price range
    if (typeof filters.minPrice === 'number' && filters.minPrice > 0) {
      if (item.price < filters.minPrice) return false;
    }
    if (typeof filters.maxPrice === 'number' && filters.maxPrice > 0) {
      if (item.price > filters.maxPrice) return false;
    }

    // Bedrooms
    if (filters.beds && filters.beds !== 'any') {
      if (!item.beds || item.beds < Number(filters.beds)) return false;
    }

    // Furnished
    if (filters.furnished && filters.furnished !== 'any') {
      const isFurnished = Boolean(item.furnished);
      if (filters.furnished === 'yes' && !isFurnished) return false;
      if (filters.furnished === 'no' && isFurnished) return false;
    }

    // Search query
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchesTitle = item.title.toLowerCase().includes(q) || item.titleUrdu.includes(q);
      const matchesLocation = item.location.toLowerCase().includes(q) || item.areaName.toLowerCase().includes(q);
      const matchesType = item.type.toLowerCase().includes(q);
      if (!matchesTitle && !matchesLocation && !matchesType) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sorts properties by specified criteria
 */
export function sortProperties(
  properties: PropertyListing[],
  sortBy: FilterState['sortBy'] = 'featured'
): PropertyListing[] {
  const cloned = [...properties];
  switch (sortBy) {
    case 'featured':
      return cloned.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    case 'newest':
      return cloned.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    case 'price-low':
      return cloned.sort((a, b) => a.price - b.price);
    case 'price-high':
      return cloned.sort((a, b) => b.price - a.price);
    default:
      return cloned;
  }
}
