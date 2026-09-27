import { Currency } from '../types';

export function formatCurrencyAmount(amount: number | string, currency: Currency = 'FCFA'): string {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) || 0 : amount;
  const formatted = Math.round(num).toLocaleString('fr-FR');

  switch (currency) {
    case 'FCFA':
      return `${formatted} FCFA`;
    case 'EUR':
      return `${formatted} €`;
    case 'USD':
      return `$${formatted}`;
    default:
      return `${formatted} FCFA`;
  }
}

export function getCurrencySymbol(currency: Currency = 'FCFA'): string {
  switch (currency) {
    case 'FCFA':
      return 'FCFA';
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    default:
      return 'FCFA';
  }
}

export function getCurrencyConfig(currency: Currency = 'FCFA') {
  if (currency === 'FCFA') {
    return {
      min: 100000,
      max: 100000000,
      step: 50000,
      defaultAmount: 200000,
      quickValues: [200000, 500000, 1000000, 5000000, 20000000],
      quickLabels: ['200K FCFA', '500K FCFA', '1M FCFA', '5M FCFA', '20M FCFA']
    };
  } else if (currency === 'EUR') {
    return {
      min: 1000,
      max: 500000,
      step: 1000,
      defaultAmount: 25000,
      quickValues: [5000, 25000, 50000, 100000, 200000],
      quickLabels: ['5k €', '25k €', '50k €', '100k €', '200k €']
    };
  } else {
    return {
      min: 1000,
      max: 500000,
      step: 1000,
      defaultAmount: 30000,
      quickValues: [5000, 25000, 50000, 100000, 200000],
      quickLabels: ['$5k', '$25k', '$50k', '$100k', '$200k']
    };
  }
}
