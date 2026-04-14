import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const histPath = join(process.env.HOME || '/Users/gordongecko',
      'Documents', 'investment-agent', 'deal_history.json')
    let history = []
    try { history = JSON.parse(readFileSync(histPath, 'utf8')) } catch {}

    return NextResponse.json({
      ok: true,
      buyBox: {
        markets:       ['Central Texas', 'DFW'],
        priceRange:    '$150,000 – $350,000',
        strategy:      'Buy & Hold + Fix & Flip',
        financing:     'Conventional 20% Down',
        minCashOnCash: '8–10%',
        interestRate:  '7.25%',
      },
      dealHistory: history,
      fetchedAt: new Date().toISOString(),
    })
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message })
  }
}
