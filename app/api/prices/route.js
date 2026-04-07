import { NextResponse } from 'next/server'

// All unique tickers across all accounts (Solomon + Schwab + Covered Calls)
const SOLOMON_TICKERS = [
  // IRA
  'FTCS','IEMG','IEFA','MBB','IWN','SHV','IYC','MINT','XLP','XLE','XLV','XLI','XLU','TSLA','VOX','VFH','VGT',
  // Collateral
  'GOOGL','AAPL','JPM','MDT','PAYX','SHOP','TDW','MOAT',
  // JTWROS
  'AMZN','ARM','CMS','DELL','ETN','HD','EEM','IYW','IYZ','LIN','META','MSFT','NVDA','PLTR','PANW','RTX','CRM','SNOW','BIL','XLY','XLF','XLB','VLO','TTD',
  // Schwab Conservative
  'MAIN','EPD','PG','EMR',
  // Covered Call positions
  'MO','VZ','PFE','T',
]

async function fetchPrice(ticker) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 0 } // never cache
    })
    const json = await res.json()
    const price = json?.chart?.result?.[0]?.meta?.regularMarketPrice
    return price ? Math.round(price * 100) / 100 : null
  } catch {
    return null
  }
}

export async function GET() {
  // Fetch all prices in parallel
  const results = await Promise.allSettled(
    SOLOMON_TICKERS.map(async (ticker) => {
      const price = await fetchPrice(ticker)
      return { ticker, price }
    })
  )

  const prices = {}
  results.forEach(r => {
    if (r.status === 'fulfilled' && r.value.price) {
      prices[r.value.ticker] = r.value.price
    }
  })

  return NextResponse.json({
    prices,
    fetchedAt: new Date().toISOString(),
    count: Object.keys(prices).length,
    total: SOLOMON_TICKERS.length
  })
}
