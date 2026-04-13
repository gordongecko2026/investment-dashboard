import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    lastUpdated: new Date().toISOString(),
    summary: {
      totalCapital: 45746,
      deployedCapital: 38163,
      reserve: 7582,
      goal: 240000,
      monthlyIncomeTarget: 20000,
      currentMonthlyIncome: 167,
      asOf: '2026-04-07 09:52 AM ET',
      dayChange: 2018.16,
      dayChangePct: 4.41,
      totalGainLoss: -20.00,
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
          { name: 'Charles Schwab Investment Acct (Conservative + Aggressive + Covered Calls)', value: 43895 },
          { name: 'Charles Schwab INV Cash', value: 0 },
        ]},
        { category: 'Retirement Plans', items: [
          { name: 'Andria HD Retirement Account (Solomon — IRA 650R6039)', value: 407000 },
          { name: 'Andria Merrill Lynch Account (not Solomon)', value: 86870 },
          { name: 'Andria 401k (not Solomon)', value: 232037 },
          { name: 'Citadel Dev - FRGXX (Solomon)', value: 316242 },
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
    solomon: {
      accounts: [
        {
          name: 'Andria Smith IRA — 650R6039',
          color: '#a855f7',
          holdings: [
            { ticker: 'AQMIX',  shares: 1577.81,  costBasis: 8.64,   currentPrice: 10.56  },
            { ticker: 'BXMIX',  shares: 898.256,  costBasis: 10.78,  currentPrice: 11.02  },
            { ticker: 'DGIGX',  shares: 322.451,  costBasis: 38.24,  currentPrice: 32.34  },
            { ticker: 'MBXIX',  shares: 429.06,   costBasis: 38.20,  currentPrice: 44.75  },
            { ticker: 'DNVYX',  shares: 624.636,  costBasis: 28.54,  currentPrice: 30.55  },
            { ticker: 'DODIX',  shares: 606.27,   costBasis: 12.51,  currentPrice: 12.75  },
            { ticker: 'FTCS',   shares: 142,      costBasis: 67.72,  currentPrice: 93.06  },
            { ticker: 'FNZJGX', shares: 605,      costBasis: 10.15,  currentPrice: 11.37  },
            { ticker: 'FVD',    shares: 402,      costBasis: 44.23,  currentPrice: 47.35  },
            { ticker: 'IEMG',   shares: 144,      costBasis: 57.15,  currentPrice: 69.56  },
            { ticker: 'IEFA',   shares: 383,      costBasis: 80.60,  currentPrice: 91.41  },
            { ticker: 'MBB',    shares: 40,       costBasis: 92.03,  currentPrice: 94.86  },
            { ticker: 'IWN',    shares: 46,       costBasis: 152.70, currentPrice: 192.19 },
            { ticker: 'SHV',    shares: 29,       costBasis: 110.24, currentPrice: 110.33 },
            { ticker: 'IYC',    shares: 122,      costBasis: 96.62,  currentPrice: 96.93  },
            { ticker: 'PIFZX',  shares: 557.42,   costBasis: 10.69,  currentPrice: 10.78  },
            { ticker: 'MINT',   shares: 47,       costBasis: 100.31, currentPrice: 100.37 },
            { ticker: 'PTTPX',  shares: 1100.49,  costBasis: 8.52,   currentPrice: 8.76   },
            { ticker: 'PSDYX',  shares: 297.963,  costBasis: 10.12,  currentPrice: 10.12  },
            { ticker: 'XLP',    shares: 139,      costBasis: 80.12,  currentPrice: 81.89  },
            { ticker: 'XLE',    shares: 54,       costBasis: 84.32,  currentPrice: 59.25  },
            { ticker: 'XLV',    shares: 175,      costBasis: 128.02, currentPrice: 146.81 },
            { ticker: 'XLI',    shares: 49,       costBasis: 141.53, currentPrice: 163.77 },
            { ticker: 'XLU',    shares: 22,       costBasis: 80.35,  currentPrice: 46.34  },
            { ticker: 'TGLMX',  shares: 635.034,  costBasis: 7.71,   currentPrice: 7.77   },
            { ticker: 'TSLA',   shares: 225,      costBasis: 20.99,  currentPrice: 360.59 },
            { ticker: 'VOX',    shares: 28,       costBasis: 158.13, currentPrice: 182.15 },
            { ticker: 'VFH',    shares: 107,      costBasis: 123.54, currentPrice: 121.32 },
            { ticker: 'VGT',    shares: 38,       costBasis: 612.78, currentPrice: 712.65 },
            { ticker: 'PIMSX',  shares: 1306.872, costBasis: 4.53,   currentPrice: 4.55   },
            { ticker: 'CASH',   shares: 1,        costBasis: 2478,   currentPrice: 2478   },
          ]
        },
        {
          name: 'Citadel Development Services',
          color: '#ff6b35',
          holdings: [
            { ticker: 'FRGXX', shares: 316242.02, costBasis: 1.00, currentPrice: 1.00 },
          ]
        },
        {
          name: 'J&A Collateral Account — 657C9214',
          color: '#00a8ff',
          holdings: [
            { ticker: 'GOOGL',   shares: 600,    costBasis: 83.20,   currentPrice: 295.77  },
            { ticker: 'AAPL',    shares: 170,    costBasis: 115.22,  currentPrice: 255.92  },
            { ticker: 'CGGR',    shares: 700,    costBasis: 25.16,   currentPrice: 40.41   },
            { ticker: 'CGNX',    shares: 350,    costBasis: 38.41,   currentPrice: 49.17   },
            { ticker: 'JPM',     shares: 152,    costBasis: 125.09,  currentPrice: 294.60  },
            { ticker: 'MDT',     shares: 150,    costBasis: 113.27,  currentPrice: 86.63   },
            { ticker: 'PAYX',    shares: 200,    costBasis: 114.00,  currentPrice: 91.70   },
            { ticker: 'SHOP',    shares: 100,    costBasis: 34.72,   currentPrice: 118.25  },
            { ticker: 'TDW',     shares: 50,     costBasis: 91.90,   currentPrice: 84.38   },
            { ticker: 'MOAT',    shares: 250,    costBasis: 60.74,   currentPrice: 59.09   },
            { ticker: 'ALIANZ',  shares: 1,      costBasis: 225000,  currentPrice: 304266.46 },
            { ticker: 'CASH',    shares: 1,      costBasis: 216,     currentPrice: 216     },
          ]
        },
        {
          name: 'J&A JTWROS — 363W9094',
          color: '#00d4aa',
          holdings: [
            { ticker: 'CASH',   shares: 1,        costBasis: 21751.72, currentPrice: 21751.72 },
            { ticker: 'ABYIX',  shares: 2031.011, costBasis: 10.38,  currentPrice: 11.61  },
            { ticker: 'AMZN',   shares: 260,      costBasis: 159.67, currentPrice: 209.77 },
            { ticker: 'AAPL',   shares: 400,      costBasis: 131.45, currentPrice: 255.92 },
            { ticker: 'ARM',    shares: 100,      costBasis: 71.19,  currentPrice: 149.11 },
            { ticker: 'MBXIX',  shares: 747.466,  costBasis: 38.28,  currentPrice: 44.75  },
            { ticker: 'CMS',    shares: 225,      costBasis: 56.20,  currentPrice: 78.58  },
            { ticker: 'DINT',   shares: 1382,     costBasis: 24.78,  currentPrice: 26.87  },
            { ticker: 'DELL',   shares: 200,      costBasis: 39.84,  currentPrice: 174.37 },
            { ticker: 'ETN',    shares: 50,       costBasis: 281.78, currentPrice: 361.10 },
            { ticker: 'FTCS',   shares: 150,      costBasis: 74.11,  currentPrice: 93.06  },
            { ticker: 'HGIIX',  shares: 253.15,   costBasis: 19.75,  currentPrice: 52.31  },
            { ticker: 'HD',     shares: 200,      costBasis: 69.78,  currentPrice: 321.63 },
            { ticker: 'PCY',    shares: 329,      costBasis: 19.80,  currentPrice: 21.06  },
            { ticker: 'ORSYX',  shares: 5304.949, costBasis: 3.70,   currentPrice: 3.71   },
            { ticker: 'IEFA',   shares: 653,      costBasis: 81.45,  currentPrice: 91.41  },
            { ticker: 'MBB',    shares: 94,       costBasis: 92.20,  currentPrice: 94.86  },
            { ticker: 'EEM',    shares: 455,      costBasis: 46.23,  currentPrice: 56.59  },
            { ticker: 'SHV',    shares: 208,      costBasis: 110.29, currentPrice: 110.33 },
            { ticker: 'IYW',    shares: 451,      costBasis: 159.66, currentPrice: 185.38 },
            { ticker: 'IYZ',    shares: 541,      costBasis: 28.60,  currentPrice: 40.48  },
            { ticker: 'JPM',    shares: 100,      costBasis: 125.09, currentPrice: 294.60 },
            { ticker: 'LIN',    shares: 52,       costBasis: 256.90, currentPrice: 502.60 },
            { ticker: 'META',   shares: 75,       costBasis: 300.02, currentPrice: 574.46 },
            { ticker: 'MSFT',   shares: 135,      costBasis: 223.28, currentPrice: 373.46 },
            { ticker: 'NUVBX',  shares: 2188.936, costBasis: 8.69,   currentPrice: 8.85   },
            { ticker: 'NVDA',   shares: 1627,     costBasis: 13.21,  currentPrice: 177.39 },
            { ticker: 'PLTR',   shares: 400,      costBasis: 14.19,  currentPrice: 148.46 },
            { ticker: 'PANW',   shares: 100,      costBasis: 142.01, currentPrice: 163.21 },
            { ticker: 'MINT',   shares: 35,       costBasis: 100.37, currentPrice: 100.37 },
            { ticker: 'PSDYX',  shares: 834.534,  costBasis: 10.12,  currentPrice: 10.12  },
            { ticker: 'RTX',    shares: 190,      costBasis: 70.09,  currentPrice: 196.21 },
            { ticker: 'CRM',    shares: 75,       costBasis: 228.14, currentPrice: 187.18 },
            { ticker: 'SHOP',   shares: 100,      costBasis: 82.99,  currentPrice: 118.25 },
            { ticker: 'SNOW',   shares: 100,      costBasis: 114.08, currentPrice: 151.85 },
            { ticker: 'BIL',    shares: 153,      costBasis: 91.61,  currentPrice: 91.42  },
            { ticker: 'XLY',    shares: 177,      costBasis: 216.57, currentPrice: 108.15 },
            { ticker: 'XLP',    shares: 529,      costBasis: 82.07,  currentPrice: 81.89  },
            { ticker: 'XLE',    shares: 174,      costBasis: 84.36,  currentPrice: 59.25  },
            { ticker: 'XLF',    shares: 1324,     costBasis: 51.37,  currentPrice: 49.53  },
            { ticker: 'XLV',    shares: 562,      costBasis: 132.87, currentPrice: 146.81 },
            { ticker: 'XLI',    shares: 320,      costBasis: 143.43, currentPrice: 163.77 },
            { ticker: 'XLB',    shares: 106,      costBasis: 86.86,  currentPrice: 50.41  },
            { ticker: 'XLU',    shares: 219,      costBasis: 81.85,  currentPrice: 46.34  },
            { ticker: 'TGCEX',  shares: 595.341,  costBasis: 11.75,  currentPrice: 26.70  },
            { ticker: 'TSLA',   shares: 144,      costBasis: 208.06, currentPrice: 360.59 },
            { ticker: 'TTD',    shares: 150,      costBasis: 66.95,  currentPrice: 22.05  },
            { ticker: 'THMIX',  shares: 1466.947, costBasis: 12.93,  currentPrice: 13.14  },
            { ticker: 'VLO',    shares: 332,      costBasis: 54.83,  currentPrice: 244.09 },
            { ticker: 'VOX',    shares: 38,       costBasis: 158.92, currentPrice: 182.15 },
          ]
        }
      ]
    },
    portfolios: [
      {
        id: 'schwab-conservative',
        name: 'Schwab Conservative',
        type: 'INCOME',
        capital: 9358,
        color: '#00d4aa',
        asOf: '2026-04-07 09:52 AM ET',
        holdings: [
          { ticker: 'MAIN', shares: 45,  costBasis: 53.665, marketValue: 2427.75, gainLoss: 12.82,  gainPct: 0.53,  dayChange: -11.25, pctOfAcct: 5.20, yield: 5.93, payout: 76.8, signal: 'BUY', confidence: 9 },
          { ticker: 'EPD',  shares: 57,  costBasis: 37.689, marketValue: 2181.01, gainLoss: 32.69,  gainPct: 1.52,  dayChange: 24.70,  pctOfAcct: 4.67, yield: 5.79, payout: 81.2, signal: 'BUY', confidence: 8 },
          { ticker: 'PG',   shares: 11,  costBasis: 142.900,marketValue: 1560.46, gainLoss: -11.44, gainPct: -0.73, dayChange: -10.01, pctOfAcct: 3.34, yield: 2.95, payout: 61.9, signal: 'BUY', confidence: 8 },
          { ticker: 'EMR',  shares: 9,   costBasis: 130.530,marketValue: 1189.13, gainLoss: 14.36,  gainPct: 1.22,  dayChange: -4.82,  pctOfAcct: 2.54, yield: 1.69, payout: 52.0, signal: 'BUY', confidence: 7 },
        ]
      },
      {
        id: 'schwab-aggressive',
        name: 'Schwab Aggressive',
        type: 'CLOSED — Converted to Covered Calls',
        capital: 0,
        color: '#ff6b35',
        asOf: '2026-04-07',
        holdings: []
      },
      {
        id: 'solomon',
        name: 'Solomon Account',
        type: 'RAYMOND JAMES',
        capital: 3289762,
        color: '#a855f7',
        holdings: []
      }
    ],
    coveredCalls: {
      totalCapital: 38886,  // updated Apr 13: added HOOD $7,045
      description: 'Sell covered calls on 100-share positions to generate monthly premium income.',
      rules: [
        'Buy 100 shares of target stock',
        'Sell 1 call option 5-10% above current price',
        'Target expiry: 2-4 weeks out (weekly or monthly options)',
        'Keep premium if stock stays below strike = income',
        'If stock called away, buy back and repeat',
        'Target: 2-4% premium per month on capital deployed'
      ],
      positions: [
        {
          ticker: 'MO',   shares: 100, costBasis: 65.92,  netCostBasis: 65.28, totalCost: 6592,
          stockPrice: 67.04, stockValue: 6703.86, stockGain: 111.86, stockGainPct: 1.70,
          dayChange: 48.86,
          yield: 6.45, status: 'ACTIVE', strike: 70.00, expiry: '05/08/2026',
          optionValue: -71.50, optionCost: -63.34, optionGain: -8.16,
          fillPrice: 0.64, premiumCollected: 64, premiumPct: 0.97, annualizedReturn: 11.6,
          maxProfit: 472, breakeven: 65.28, filledAt: '04/06/2026',
          note: 'Sell to Open 1 MO $70 Call exp 05/08/2026 @ $0.64', rating: 'A'
        },
        {
          ticker: 'PLTR', shares: 100, costBasis: 147.50, netCostBasis: 140.93, totalCost: 14750,
          stockPrice: 132.19, stockValue: 13219, stockGain: -1531, stockGainPct: -10.4,
          dayChange: 320,
          yield: 0, status: 'ACTIVE', strike: 135.00, expiry: '05/15/2026',
          optionValue: -760, optionCost: -657.50, optionGain: -102.50,
          fillPrice: 6.575, premiumCollected: 657.50, premiumPct: 4.46, annualizedReturn: 53.5,
          maxProfit: 2207, breakeven: 140.93, filledAt: '04/10/2026',
          note: 'Sell to Open 1 PLTR $135 Call exp 05/15/2026 @ $6.575 — ⚠️ Watch: $2.81 buffer', rating: 'A'
        },
        {
          ticker: 'HOOD', shares: 100, costBasis: 70.575, netCostBasis: 66.685, totalCost: 7057.50,
          stockPrice: 70.50, stockValue: 7050, stockGain: -7.50, stockGainPct: -0.11,
          dayChange: 0,
          yield: 0, status: 'ACTIVE', strike: 75.00, expiry: '05/15/2026',
          optionValue: -391, optionCost: -391, optionGain: 0,
          fillPrice: 3.95, premiumCollected: 395, premiumPct: 5.60, annualizedReturn: 67.2,
          maxProfit: 842, breakeven: 66.685, filledAt: '04/13/2026',
          note: 'Sell to Open 1 HOOD $75 Call exp 05/15/2026 @ $3.95', rating: 'A'
        },
        {
          ticker: 'VZ',   shares: 100, costBasis: 49.505, netCostBasis: 48.985, totalCost: 4950,
          stockPrice: 45.19, stockValue: 4519, stockGain: -431, stockGainPct: -8.71,
          dayChange: -90,
          yield: 6.50, status: 'ACTIVE', strike: 48.00, expiry: '05/15/2026',
          optionValue: -49, optionCost: -49, optionGain: 0,
          fillPrice: 0.49, premiumCollected: 49, premiumPct: 0.99, annualizedReturn: 11.9,
          maxProfit: 149, breakeven: 48.985, filledAt: '04/13/2026',
          note: 'Sell to Open 1 VZ $48 Call exp 05/15/2026 @ $0.49', rating: 'B+'
        },
        {
          ticker: 'PFE',  shares: 100, costBasis: 27.1366, netCostBasis: 26.6466, totalCost: 2714,
          stockPrice: 27.15, stockValue: 2715, stockGain: 1.34, stockGainPct: 0.05,
          dayChange: 0,
          yield: 6.07, status: 'ACTIVE', strike: 28.00, expiry: '05/15/2026',
          optionValue: -32, optionCost: -49, optionGain: 17,
          fillPrice: 0.49, premiumCollected: 49, premiumPct: 1.72, annualizedReturn: 20.6,
          maxProfit: 99, breakeven: 26.6466, filledAt: '04/07/2026',
          note: 'Sell to Open 1 PFE $28 Call exp 05/15/2026 @ $0.49', rating: 'B+'
        },
        {
          ticker: 'T',    shares: 100, costBasis: 28.345, netCostBasis: 27.975, totalCost: 2835,
          stockPrice: 25.50, stockValue: 2550, stockGain: -285, stockGainPct: -10.05,
          dayChange: -95,
          yield: 3.92, status: 'ACTIVE', strike: 27.00, expiry: '05/15/2026',
          optionValue: -34, optionCost: -34, optionGain: 0,
          fillPrice: 0.34, premiumCollected: 34, premiumPct: 1.20, annualizedReturn: 14.4,
          maxProfit: 134, breakeven: 27.975, filledAt: '04/13/2026',
          note: 'Sell to Open 1 T $27 Call exp 05/15/2026 @ $0.34', rating: 'B+'
        },
      ]
    },
    incomeProjection: [
      { year: 2026, monthly: 167,   portfolio: 50000   },
      { year: 2027, monthly: 650,   portfolio: 140000  },
      { year: 2028, monthly: 1400,  portfolio: 260000  },
      { year: 2029, monthly: 2400,  portfolio: 420000  },
      { year: 2030, monthly: 3800,  portfolio: 620000  },
      { year: 2031, monthly: 5500,  portfolio: 870000  },
      { year: 2032, monthly: 7800,  portfolio: 1200000 },
      { year: 2033, monthly: 10500, portfolio: 1600000 },
      { year: 2034, monthly: 14000, portfolio: 2100000 },
      { year: 2035, monthly: 18500, portfolio: 2700000 },
      { year: 2036, monthly: 24000, portfolio: 3400000 },
    ],
    pnl: {
      period: 'Apr 1 – Apr 13, 2026',
      lastUpdated: '2026-04-13',
      stockTrades: [
        { ticker: 'GOOGL', shares: 16,  buyDate: '04/06/2026', buyPrice: 296.255, sellDate: '04/07/2026', sellPrice: 302.45,    fees: 0.10, pnl: 99.02,   note: '' },
        { ticker: 'MO',    shares: 100, buyDate: '04/06/2026', buyPrice: 65.375,  sellDate: '04/07/2026', sellPrice: 66.72,     fees: 0.16, pnl: 134.34, note: '' },
        { ticker: 'AMD',   shares: 17,  buyDate: '04/06/2026', buyPrice: 223.2499,sellDate: '04/07/2026', sellPrice: 221.18,    fees: 0.08, pnl: -35.27, note: '' },
        { ticker: 'META',  shares: 6,   buyDate: '04/06/2026', buyPrice: 578.46,  sellDate: '04/07/2026', sellPrice: 570.4301,  fees: 0.07, pnl: -48.25, note: '' },
        { ticker: 'EETH',  shares: 820, buyDate: 'Unknown',    buyPrice: null,    sellDate: '04/06/2026', sellPrice: 26.565,    fees: 0.16, pnl: null,   note: 'Cost basis needed — est. ~-$30,012 loss' },
        { ticker: 'STRC',  shares: 125, buyDate: 'Unknown',    buyPrice: null,    sellDate: '04/06/2026', sellPrice: 99.995,    fees: 0.02, pnl: null,   note: 'Cost basis needed' },
        { ticker: 'HOOD',  shares: 100, buyDate: '04/13/2026', buyPrice: 70.575,  sellDate: null,         sellPrice: null,      fees: 0,    pnl: null,   note: 'Holding — covered call position' },
      ],
      optionPremiums: [
        { date: '04/06/2026', contract: 'MO $70 Call',    expiry: '05/08/2026', premium: 0.64,  contracts: 1, fees: 0.66, net: 63.34,  status: 'OPEN' },
        { date: '04/07/2026', contract: 'PLTR $160 Call', expiry: '05/15/2026', premium: 6.13,  contracts: 1, fees: 0.67, net: 612.33, status: 'CLOSED — +$422 profit' },
        { date: '04/07/2026', contract: 'VZ $49 Call',    expiry: '05/15/2026', premium: 1.36,  contracts: 1, fees: 0.66, net: 135.34, status: 'CLOSED — +$68 profit' },
        { date: '04/07/2026', contract: 'PFE $28 Call',   expiry: '05/15/2026', premium: 0.55,  contracts: 1, fees: 0.66, net: 54.34,  status: 'OPEN' },
        { date: '04/07/2026', contract: 'T $28 Call',     expiry: '05/15/2026', premium: 1.15,  contracts: 1, fees: 0.66, net: 114.34, status: 'CLOSED — +$72 profit' },
        { date: '04/10/2026', contract: 'PLTR $135 Call', expiry: '05/15/2026', premium: 6.575, contracts: 1, fees: 0.67, net: 657.50, status: 'OPEN' },
        { date: '04/10/2026', contract: 'T $28 Call',     expiry: '05/15/2026', premium: 0.395, contracts: 1, fees: 0.66, net: 38.84,  status: 'CLOSED — +$21 profit' },
        { date: '04/10/2026', contract: 'VZ $49 Call',    expiry: '05/15/2026', premium: 0.47,  contracts: 1, fees: 0.66, net: 46.34,  status: 'CLOSED — +$38 profit' },
        { date: '04/13/2026', contract: 'HOOD $75 Call',  expiry: '05/15/2026', premium: 3.95,  contracts: 1, fees: 0.66, net: 394.34, status: 'OPEN' },
        { date: '04/13/2026', contract: 'VZ $48 Call',    expiry: '05/15/2026', premium: 0.49,  contracts: 1, fees: 0.66, net: 48.34,  status: 'OPEN' },
        { date: '04/13/2026', contract: 'T $27 Call',     expiry: '05/15/2026', premium: 0.34,  contracts: 1, fees: 0.66, net: 33.34,  status: 'OPEN' },
      ],
      other: [
        { date: '03/31/2026', type: 'Return of Capital', ticker: 'STRC', amount: 119.79 },
      ]
    }
  }
  return NextResponse.json(data)
}
