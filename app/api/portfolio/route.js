import { NextResponse } from 'next/server'

// Static portfolio data — replace with live DB later
export async function GET() {
  const data = {
    lastUpdated: new Date().toISOString(),
    summary: {
      totalCapital: 79000,
      deployedCapital: 55000,
      reserve: 24000,
      goal: 240000,
      monthlyIncomeTarget: 20000,
      currentMonthlyIncome: 167,
    },
    netWorth: {
      name: 'Jeremy & Andria Smith',
      assets: [
        { category: 'Cash On Hand', items: [
          { name: 'Horizon Bank - CDS Savings', value: 725000 },
          { name: 'Horizon Bank - Citadel MFC', value: 400000 },
          { name: 'Raymond James - Cash Mgmt', value: 317400 },
          { name: 'Horizon Bank - Personal MM', value: 191000 },
          { name: 'Horizon Bank - Personal Checking', value: 10000 },
          { name: 'Charles Schwab - Personal Checking', value: 3854 },
          { name: 'Horizon - Tier 1 Cash/Equity', value: 60000 },
          { name: 'Horizon CEDx', value: 64759 },
          { name: 'Horizon Bank - Triple A Holdings', value: 7752 },
        ]},
        { category: 'Marketable Securities', items: [
          { name: 'Raymond James - JTWROS Equities', value: 1850000 },
          { name: 'Raymond James - Collateral Acct', value: 850000 },
          { name: 'Charles Schwab Investment Acct', value: 65400 },
          { name: 'Charles Schwab INV Cash', value: 3433 },
        ]},
        { category: 'Retirement Plans', items: [
          { name: 'Andria HD Retirement Account', value: 185000 },
          { name: 'Andria Merrill Lynch Account', value: 85000 },
          { name: 'Citadel Dev - FRGXX', value: 316242 },
        ]},
        { category: 'Real Estate', items: [
          { name: '1184 County Road 200', value: 1245000 },
          { name: '811 E Hempstead, Giddings TX', value: 440000 },
          { name: '8271 FM 1565', value: 385500 },
        ]},
        { category: 'Business Interests', items: [
          { name: 'Citadel Development Services LLC (100%)', value: 6750000 },
          { name: 'Citadel Excavation & Demolition LLC (100%)', value: 0 },
          { name: 'Andria Home Depot Shares', value: 85000 },
          { name: 'Allianz Insurance', value: 304266 },
        ]},
      ],
      liabilities: [
        { name: 'Capital Farm Credit (1184 CR 200)', value: 119520 },
        { name: 'Horizon Bank (811 E Hempstead)', value: 291000 },
      ]
    },
    portfolios: [
      {
        id: 'schwab-conservative',
        name: 'Schwab Conservative',
        type: 'INCOME',
        capital: 50000,
        color: '#00d4aa',
        holdings: [
          { ticker: 'VZ',   price: 49.40,  yield: 5.73, payout: 67.4, signal: 'BUY',  confidence: 8 },
          { ticker: 'MAIN', price: 52.63,  yield: 5.93, payout: 76.8, signal: 'BUY',  confidence: 9 },
          { ticker: 'EPD',  price: 37.57,  yield: 5.79, payout: 81.2, signal: 'BUY',  confidence: 8 },
          { ticker: 'PG',   price: 143.12, yield: 2.95, payout: 61.9, signal: 'BUY',  confidence: 8 },
          { ticker: 'EMR',  price: 131.70, yield: 1.69, payout: 52.0, signal: 'BUY',  confidence: 7 },
          { ticker: 'ABBV', price: 208.84, yield: 3.31, payout: 71.0, signal: 'HOLD', confidence: 4 },
          { ticker: 'CVX',  price: 198.97, yield: 3.58, payout: 63.0, signal: 'HOLD', confidence: 4 },
          { ticker: 'TROW', price: 90.17,  yield: 5.77, payout: 55.0, signal: 'HOLD', confidence: 6 },
          { ticker: 'MO',   price: 65.76,  yield: 6.45, payout: 79.0, signal: 'WATCH', confidence: 5 },
          { ticker: 'PFE',  price: 28.32,  yield: 6.07, payout: 126.5, signal: 'HOLD', confidence: 4 },
        ]
      },
      {
        id: 'schwab-aggressive',
        name: 'Schwab Aggressive',
        type: 'GROWTH',
        capital: 29000,
        color: '#ff6b35',
        holdings: [
          { ticker: 'NVDA',  price: 177.39, entryLow: 165, entryHigh: 175, target: 207, stop: 153, position: 5000, status: 'WATCHING' },
          { ticker: 'GOOGL', price: 295.77, entryLow: 280, entryHigh: 295, target: 338, stop: 260, position: 5000, status: 'AT ZONE'  },
          { ticker: 'META',  price: 574.46, entryLow: 540, entryHigh: 575, target: 660, stop: 502, position: 4000, status: 'AT ZONE'  },
          { ticker: 'AMD',   price: 217.50, entryLow: 200, entryHigh: 220, target: 255, stop: 186, position: 4000, status: 'AT ZONE'  },
          { ticker: 'PLTR',  price: 148.46, entryLow: 130, entryHigh: 150, target: 178, stop: 121, position: 4000, status: 'AT ZONE'  },
          { ticker: 'COIN',  price: 171.46, entryLow: 155, entryHigh: 180, target: 220, stop: 144, position: 4000, status: 'IN ZONE'  },
        ]
      },
      {
        id: 'solomon',
        name: 'Solomon Account',
        type: 'RAYMOND JAMES',
        capital: 4250000,
        color: '#a855f7',
        holdings: [
          // Jeremy & Andria JTWROS - 363W9094 (key positions)
          { ticker: 'NVDA',  shares: 1627,  costBasis: 13.21,  currentPrice: 177.39, account: 'JTWROS' },
          { ticker: 'AAPL',  shares: 400,   costBasis: 131.45, currentPrice: 255.92, account: 'JTWROS' },
          { ticker: 'AMZN',  shares: 260,   costBasis: 159.67, currentPrice: 209.77, account: 'JTWROS' },
          { ticker: 'PLTR',  shares: 400,   costBasis: 14.19,  currentPrice: 148.46, account: 'JTWROS' },
          { ticker: 'META',  shares: 75,    costBasis: 300.02, currentPrice: 574.46, account: 'JTWROS' },
          { ticker: 'MSFT',  shares: 135,   costBasis: 223.28, currentPrice: 373.46, account: 'JTWROS' },
          { ticker: 'JPM',   shares: 100,   costBasis: 125.09, currentPrice: 294.60, account: 'JTWROS' },
          { ticker: 'VLO',   shares: 332,   costBasis: 54.83,  currentPrice: 244.09, account: 'JTWROS' },
          { ticker: 'TSLA',  shares: 144,   costBasis: 208.06, currentPrice: 360.59, account: 'JTWROS' },
          { ticker: 'HD',    shares: 200,   costBasis: 69.78,  currentPrice: 321.63, account: 'JTWROS' },
          { ticker: 'ETN',   shares: 50,    costBasis: 281.78, currentPrice: 361.10, account: 'JTWROS' },
          { ticker: 'LIN',   shares: 52,    costBasis: 256.90, currentPrice: 502.60, account: 'JTWROS' },
          { ticker: 'DELL',  shares: 200,   costBasis: 39.84,  currentPrice: 174.37, account: 'JTWROS' },
          { ticker: 'RTX',   shares: 190,   costBasis: 70.09,  currentPrice: 196.21, account: 'JTWROS' },
          { ticker: 'PANW',  shares: 100,   costBasis: 142.01, currentPrice: 163.21, account: 'JTWROS' },
          { ticker: 'ARM',   shares: 100,   costBasis: 71.19,  currentPrice: 149.11, account: 'JTWROS' },
          { ticker: 'CRM',   shares: 75,    costBasis: 228.14, currentPrice: 187.18, account: 'JTWROS' },
          { ticker: 'SHOP',  shares: 100,   costBasis: 82.99,  currentPrice: 118.25, account: 'JTWROS' },
          { ticker: 'SNOW',  shares: 100,   costBasis: 114.08, currentPrice: 151.85, account: 'JTWROS' },
          // Collateral Account
          { ticker: 'GOOGL', shares: 600,   costBasis: 83.20,  currentPrice: 295.77, account: 'Collateral' },
          { ticker: 'AAPL',  shares: 170,   costBasis: 115.22, currentPrice: 255.92, account: 'Collateral' },
          { ticker: 'JPM',   shares: 152,   costBasis: 125.09, currentPrice: 294.60, account: 'Collateral' },
        ]
      }
    ],
    incomeProjection: [
      { year: 2026, monthly: 167,  portfolio: 50000  },
      { year: 2027, monthly: 650,  portfolio: 140000 },
      { year: 2028, monthly: 1400, portfolio: 260000 },
      { year: 2029, monthly: 2400, portfolio: 420000 },
      { year: 2030, monthly: 3800, portfolio: 620000 },
      { year: 2031, monthly: 5500, portfolio: 870000 },
      { year: 2032, monthly: 7800, portfolio: 1200000 },
      { year: 2033, monthly: 10500, portfolio: 1600000 },
      { year: 2034, monthly: 14000, portfolio: 2100000 },
      { year: 2035, monthly: 18500, portfolio: 2700000 },
      { year: 2036, monthly: 24000, portfolio: 3400000 },
    ]
  }
  return NextResponse.json(data)
}
