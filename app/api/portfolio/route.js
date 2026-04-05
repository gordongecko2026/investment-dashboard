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
        type: 'TBD',
        capital: 0,
        color: '#a855f7',
        holdings: []
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
