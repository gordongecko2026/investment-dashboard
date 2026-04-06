'use client'
import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts'

const styles = {
  page:       { minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1f3c 100%)', padding: '24px' },
  header:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  title:      { fontSize: 28, fontWeight: 800, background: 'linear-gradient(90deg, #00d4aa, #00a8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subtitle:   { color: '#8892b0', fontSize: 13, marginTop: 4 },
  tabs:       { display: 'flex', gap: 8, marginBottom: 24 },
  tab:        { padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s' },
  grid4:      { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 },
  grid2:      { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 },
  card:       { background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.08)' },
  cardTitle:  { color: '#8892b0', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  bigNumber:  { fontSize: 32, fontWeight: 800, color: '#fff' },
  subtext:    { color: '#8892b0', fontSize: 13, marginTop: 4 },
  table:      { width: '100%', borderCollapse: 'collapse' },
  th:         { color: '#8892b0', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  td:         { padding: '12px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 14 },
}

const signalColor = (s) => ({ BUY: '#00d4aa', SELL: '#ff4757', HOLD: '#ffa502', WATCH: '#a855f7', 'AT ZONE': '#00a8ff', 'IN ZONE': '#00d4aa', WATCHING: '#8892b0' }[s] || '#8892b0')

export default function Dashboard() {
  const [data, setData]         = useState(null)
  const [livePrices, setLivePrices] = useState({})
  const [tab, setTab]           = useState('overview')
  const [loading, setLoading]   = useState(true)
  const [priceStatus, setPriceStatus] = useState('loading')

  useEffect(() => {
    // Load portfolio structure
    fetch('/api/portfolio').then(r => r.json()).then(d => {
      setData(d)
      setLoading(false)
    })
    // Load live prices in parallel
    fetch('/api/prices').then(r => r.json()).then(d => {
      setLivePrices(d.prices || {})
      setPriceStatus(`Live — ${new Date(d.fetchedAt).toLocaleTimeString()}`)
    }).catch(() => setPriceStatus('Offline — showing last known prices'))
  }, [])

  // Helper: get live price or fall back to static
  const getPrice = (ticker, staticPrice) => livePrices[ticker] || staticPrice

  if (loading) return (
    <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📈</div>
        <div style={{ color: '#00d4aa', fontSize: 18 }}>Loading Investment Command Center...</div>
      </div>
    </div>
  )

  const conservative = data.portfolios.find(p => p.id === 'schwab-conservative')
  const aggressive   = data.portfolios.find(p => p.id === 'schwab-aggressive')
  const { summary }  = data

  const tabs = [
    { id: 'overview',     label: '📊 Overview' },
    { id: 'conservative', label: '🟢 Conservative' },
    { id: 'aggressive',   label: '🔥 Aggressive' },
    { id: 'solomon',      label: '👁 Solomon' },
    { id: 'networth',     label: '🏦 Net Worth' },
    { id: 'income',       label: '💰 Income Goal' },
  ]

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.title}>⚡ Investment Command Center</div>
          <div style={styles.subtitle}>AI-Powered | 7 Institutional Frameworks | Updated: {new Date(data.lastUpdated).toLocaleString()}</div>
        <div style={{ fontSize: 12, marginTop: 4, color: priceStatus.startsWith('Live') ? '#00d4aa' : '#ffa502' }}>📡 Prices: {priceStatus}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#00d4aa', fontSize: 22, fontWeight: 800 }}>${summary.totalCapital.toLocaleString()}</div>
          <div style={{ color: '#8892b0', fontSize: 13 }}>Total Capital</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabs.map(t => (
          <button key={t.id} style={{ ...styles.tab, background: tab === t.id ? 'linear-gradient(135deg, #00d4aa, #00a8ff)' : 'rgba(255,255,255,0.07)', color: tab === t.id ? '#000' : '#ccc' }}
            onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === 'overview' && (
        <>
          <div style={styles.grid4}>
            {[
              { label: 'Total Capital',    value: `$${summary.totalCapital.toLocaleString()}`,    sub: '3 portfolios' },
              { label: 'Monthly Income',   value: `$${summary.currentMonthlyIncome.toLocaleString()}`, sub: `Goal: $${summary.monthlyIncomeTarget.toLocaleString()}/mo` },
              { label: 'Goal Progress',    value: `${(summary.currentMonthlyIncome/summary.monthlyIncomeTarget*100).toFixed(1)}%`, sub: 'To $20K/month' },
              { label: 'Reserve Cash',     value: `$${summary.reserve.toLocaleString()}`,         sub: 'Dry powder' },
            ].map(m => (
              <div key={m.label} style={styles.card}>
                <div style={styles.cardTitle}>{m.label}</div>
                <div style={styles.bigNumber}>{m.value}</div>
                <div style={styles.subtext}>{m.sub}</div>
              </div>
            ))}
          </div>

          <div style={styles.grid2}>
            {data.portfolios.map(p => (
              <div key={p.id} style={{ ...styles.card, borderLeft: `4px solid ${p.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: p.color }}>{p.name}</div>
                    <div style={{ color: '#8892b0', fontSize: 13, marginTop: 4 }}>{p.type}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>${p.capital.toLocaleString()}</div>
                    <div style={{ color: '#8892b0', fontSize: 13 }}>{p.holdings.length} positions</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Income projection mini */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>📈 Path to $20K/Month — Income Projection</div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={data.incomeProjection}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#00d4aa" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="#8892b0" tick={{ fontSize: 12 }} />
                <YAxis stroke="#8892b0" tick={{ fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Monthly Income']} contentStyle={{ background: '#1a2035', border: '1px solid #00d4aa', borderRadius: 8 }} />
                <ReferenceLine y={20000} stroke="#ff6b35" strokeDasharray="5 5" label={{ value: '$20K Goal', fill: '#ff6b35', fontSize: 12 }} />
                <Area type="monotone" dataKey="monthly" stroke="#00d4aa" strokeWidth={2} fill="url(#incomeGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* CONSERVATIVE */}
      {tab === 'conservative' && (
        <>
          <div style={styles.grid4}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Capital</div>
              <div style={styles.bigNumber}>${conservative.capital.toLocaleString()}</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Avg Yield</div>
              <div style={styles.bigNumber}>{(conservative.holdings.reduce((a,h)=>a+h.yield,0)/conservative.holdings.length).toFixed(2)}%</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Est. Annual Income</div>
              <div style={styles.bigNumber}>${Math.round(conservative.capital * 0.045).toLocaleString()}</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Positions</div>
              <div style={styles.bigNumber}>{conservative.holdings.length}</div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Holdings & Signals</div>
            <table style={styles.table}>
              <thead>
                <tr>{['Ticker','Price','Yield','Payout','Signal','Confidence'].map(h=><th key={h} style={styles.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {conservative.holdings.map(h => (
                  <tr key={h.ticker}>
                    <td style={{ ...styles.td, fontWeight: 700, color: '#00d4aa' }}>{h.ticker}</td>
                    <td style={styles.td}>${h.price}</td>
                    <td style={{ ...styles.td, color: h.yield >= 5 ? '#00d4aa' : h.yield >= 3.5 ? '#52e3c2' : '#fff' }}>{h.yield}%</td>
                    <td style={{ ...styles.td, color: h.payout >= 95 ? '#ff4757' : h.payout >= 85 ? '#ffa502' : '#fff' }}>{h.payout}%</td>
                    <td style={styles.td}>
                      <span style={{ background: signalColor(h.signal)+'22', color: signalColor(h.signal), padding: '3px 10px', borderRadius: 6, fontWeight: 700, fontSize: 12 }}>{h.signal}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 80, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                          <div style={{ width: `${h.confidence*10}%`, height: '100%', background: h.confidence >= 7 ? '#00d4aa' : h.confidence >= 5 ? '#ffa502' : '#ff4757', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, color: '#8892b0' }}>{h.confidence}/10</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Yield Distribution</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[...conservative.holdings].sort((a,b)=>b.yield-a.yield)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="ticker" stroke="#8892b0" tick={{ fontSize: 12 }} />
                <YAxis stroke="#8892b0" tick={{ fontSize: 12 }} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v) => [`${v}%`, 'Yield']} contentStyle={{ background: '#1a2035', border: '1px solid #00d4aa', borderRadius: 8 }} />
                <ReferenceLine y={3.5} stroke="#ffa502" strokeDasharray="4 4" label={{ value: '3.5% min', fill: '#ffa502', fontSize: 11 }} />
                <Bar dataKey="yield" fill="#00d4aa" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* AGGRESSIVE */}
      {tab === 'aggressive' && (
        <>
          <div style={styles.grid4}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Capital Deployed</div>
              <div style={styles.bigNumber}>${aggressive.capital.toLocaleString()}</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Recovery Goal</div>
              <div style={styles.bigNumber}>$30,012</div>
              <div style={styles.subtext}>EETH loss to recover</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Positions Watching</div>
              <div style={styles.bigNumber}>{aggressive.holdings.filter(h=>h.status==='WATCHING').length}</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>At/In Entry Zones</div>
              <div style={{ ...styles.bigNumber, color: '#ff6b35' }}>{aggressive.holdings.filter(h=>h.status==='AT ZONE'||h.status==='IN ZONE').length}</div>
              <div style={styles.subtext}>Ready to buy</div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Swing Trade Setups</div>
            <table style={styles.table}>
              <thead>
                <tr>{['Ticker','Current','Entry Zone','Target','Stop','Position','Status','Upside'].map(h=><th key={h} style={styles.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {aggressive.holdings.map(h => {
                  const upside = ((h.target - h.price) / h.price * 100).toFixed(1)
                  const inZone = h.price >= h.entryLow && h.price <= h.entryHigh
                  return (
                    <tr key={h.ticker}>
                      <td style={{ ...styles.td, fontWeight: 700, color: '#ff6b35' }}>{h.ticker}</td>
                      <td style={styles.td}>${h.price}</td>
                      <td style={{ ...styles.td, color: '#8892b0' }}>${h.entryLow}–${h.entryHigh}</td>
                      <td style={{ ...styles.td, color: '#00d4aa' }}>${h.target}</td>
                      <td style={{ ...styles.td, color: '#ff4757' }}>${h.stop}</td>
                      <td style={styles.td}>${h.position.toLocaleString()}</td>
                      <td style={styles.td}>
                        <span style={{ background: signalColor(h.status)+'22', color: signalColor(h.status), padding: '3px 10px', borderRadius: 6, fontWeight: 700, fontSize: 12 }}>{h.status}</span>
                      </td>
                      <td style={{ ...styles.td, color: upside > 0 ? '#00d4aa' : '#ff4757', fontWeight: 700 }}>{upside > 0 ? '+' : ''}{upside}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* SOLOMON */}
      {tab === 'solomon' && (
        <>
          {(() => {
            const allHoldings = data.solomon.accounts.flatMap(a => a.holdings)
            const totalCost = allHoldings.reduce((a,h) => a + h.shares * h.costBasis, 0)
            const totalValue = allHoldings.reduce((a,h) => a + h.shares * (livePrices[h.ticker] || h.currentPrice), 0)
            const totalGain = totalValue - totalCost
            const gainPct = totalCost > 0 ? (totalGain / totalCost * 100).toFixed(1) : 0
            const totalPositions = allHoldings.length
            return (
              <div style={styles.grid4}>
                {[
                  { label: 'Total Market Value', value: `$${(totalValue/1000000).toFixed(2)}M`, sub: `${data.solomon.accounts.length} accounts`, color: '#a855f7' },
                  { label: 'Total Cost Basis',   value: `$${(totalCost/1000000).toFixed(2)}M`,  sub: 'Original invested', color: '#8892b0' },
                  { label: 'Total Gain',         value: `$${(totalGain/1000000).toFixed(2)}M`,  sub: `${gainPct}% overall return`, color: totalGain >= 0 ? '#00d4aa' : '#ff4757' },
                  { label: 'Total Positions',    value: totalPositions, sub: 'All Raymond James accts', color: '#00a8ff' },
                ].map(m => (
                  <div key={m.label} style={{ ...styles.card, borderTop: `3px solid ${m.color}` }}>
                    <div style={styles.cardTitle}>{m.label}</div>
                    <div style={{ ...styles.bigNumber, color: m.color }}>{m.value}</div>
                    <div style={styles.subtext}>{m.sub}</div>
                  </div>
                ))}
              </div>
            )
          })()}

          {data.solomon.accounts.map(acct => {
            const acctCost  = acct.holdings.reduce((a,h) => a + h.shares * h.costBasis, 0)
            const acctValue = acct.holdings.reduce((a,h) => a + h.shares * (livePrices[h.ticker] || h.currentPrice), 0)
            const acctGain  = acctValue - acctCost
            const acctPct   = acctCost > 0 ? (acctGain / acctCost * 100).toFixed(1) : 0
            return (
              <div key={acct.name} style={{ ...styles.card, marginBottom: 20, borderLeft: `4px solid ${acct.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: acct.color }}>{acct.name}</div>
                    <div style={{ color: '#8892b0', fontSize: 12, marginTop: 2 }}>{acct.holdings.length} positions</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>${acctValue.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
                    <div style={{ color: acctGain >= 0 ? '#00d4aa' : '#ff4757', fontSize: 13, fontWeight: 600 }}>{acctGain >= 0 ? '+' : ''}${acctGain.toLocaleString(undefined,{maximumFractionDigits:0})} ({acctPct}%)</div>
                  </div>
                </div>
                <table style={styles.table}>
                  <thead>
                    <tr>{['Ticker','Shares','Cost','Price','Cost Amt','Mkt Value','Gain $','Return'].map(h=><th key={h} style={styles.th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {[...acct.holdings].sort((a,b) => {
                      const va = a.shares * (livePrices[a.ticker] || a.currentPrice)
                      const vb = b.shares * (livePrices[b.ticker] || b.currentPrice)
                      return vb - va
                    }).map((h,i) => {
                      const livePrice = livePrices[h.ticker] || h.currentPrice
                      const cost  = h.shares * h.costBasis
                      const value = h.shares * livePrice
                      const gain  = value - cost
                      const pct   = cost > 0 ? (gain / cost * 100).toFixed(1) : 0
                      return (
                        <tr key={i}>
                          <td style={{ ...styles.td, fontWeight: 700, color: acct.color }}>{h.ticker}</td>
                          <td style={styles.td}>{h.shares.toLocaleString(undefined,{maximumFractionDigits:2})}</td>
                          <td style={styles.td}>${h.costBasis.toFixed(2)}</td>
                          <td style={{ ...styles.td, color: livePrices[h.ticker] ? '#00d4aa' : '#8892b0' }}>${(livePrices[h.ticker] || h.currentPrice).toFixed(2)}{livePrices[h.ticker] ? ' •' : ''}</td>
                          <td style={styles.td}>${cost.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
                          <td style={{ ...styles.td, fontWeight: 600 }}>${value.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
                          <td style={{ ...styles.td, color: gain >= 0 ? '#00d4aa' : '#ff4757', fontWeight: 700 }}>{gain >= 0 ? '+' : ''}${gain.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
                          <td style={{ ...styles.td, color: gain >= 0 ? '#00d4aa' : '#ff4757', fontWeight: 700 }}>{gain >= 0 ? '+' : ''}{pct}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          })}
        </>
      )}

      {tab === 'networth' && (
        <>
          {(() => {
            const nw = data.netWorth
            const totalAssets = nw.assets.reduce((a,cat) => a + cat.items.reduce((b,item) => b + item.value, 0), 0)
            const totalLiabilities = nw.liabilities.reduce((a,l) => a + l.value, 0)
            const netWorthVal = totalAssets - totalLiabilities
            return (
              <>
                <div style={styles.grid4}>
                  {[
                    { label: 'Total Assets',      value: `$${(totalAssets/1000000).toFixed(2)}M`,      color: '#00d4aa' },
                    { label: 'Total Liabilities', value: `$${(totalLiabilities/1000).toFixed(0)}K`,    color: '#ff4757' },
                    { label: 'Net Worth',          value: `$${(netWorthVal/1000000).toFixed(2)}M`,      color: '#00a8ff' },
                    { label: 'Debt Ratio',         value: `${(totalLiabilities/totalAssets*100).toFixed(1)}%`, color: '#ffa502' },
                  ].map(m => (
                    <div key={m.label} style={{ ...styles.card, borderTop: `3px solid ${m.color}` }}>
                      <div style={styles.cardTitle}>{m.label}</div>
                      <div style={{ ...styles.bigNumber, color: m.color }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {nw.assets.map(cat => {
                  const catTotal = cat.items.reduce((a,i) => a + i.value, 0)
                  return (
                    <div key={cat.category} style={{ ...styles.card, marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={styles.cardTitle}>{cat.category}</div>
                        <div style={{ color: '#00d4aa', fontWeight: 700, fontSize: 16 }}>${catTotal.toLocaleString()}</div>
                      </div>
                      <table style={styles.table}>
                        <tbody>
                          {cat.items.map(item => (
                            <tr key={item.name}>
                              <td style={{ ...styles.td, color: '#ccd6f6' }}>{item.name}</td>
                              <td style={{ ...styles.td, textAlign: 'right', fontWeight: 600, color: '#00d4aa' }}>${item.value.toLocaleString()}</td>
                              <td style={{ ...styles.td, textAlign: 'right', color: '#8892b0', width: 80 }}>{(item.value/totalAssets*100).toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                })}

                <div style={styles.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={styles.cardTitle}>Liabilities</div>
                    <div style={{ color: '#ff4757', fontWeight: 700, fontSize: 16 }}>${totalLiabilities.toLocaleString()}</div>
                  </div>
                  <table style={styles.table}>
                    <tbody>
                      {nw.liabilities.map(l => (
                        <tr key={l.name}>
                          <td style={{ ...styles.td, color: '#ccd6f6' }}>{l.name}</td>
                          <td style={{ ...styles.td, textAlign: 'right', fontWeight: 600, color: '#ff4757' }}>${l.value.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )
          })()}
        </>
      )}

      {/* INCOME GOAL */}
      {tab === 'income' && (
        <>
          <div style={styles.grid4}>
            {[
              { label: 'Current Monthly', value: '$167', sub: 'Year 1 baseline', color: '#8892b0' },
              { label: '5-Year Target',   value: '$3,800', sub: '~2031 projection', color: '#00a8ff' },
              { label: '10-Year Target',  value: '$10,500', sub: '~2034 projection', color: '#00d4aa' },
              { label: 'Final Goal',      value: '$20,000', sub: '~2035-2036', color: '#ff6b35' },
            ].map(m => (
              <div key={m.label} style={{ ...styles.card, borderTop: `3px solid ${m.color}` }}>
                <div style={styles.cardTitle}>{m.label}</div>
                <div style={{ ...styles.bigNumber, color: m.color }}>{m.value}</div>
                <div style={styles.subtext}>{m.sub}</div>
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Monthly Passive Income Projection — Path to $20K/Month</div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={data.incomeProjection}>
                <defs>
                  <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#00d4aa" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="#8892b0" />
                <YAxis stroke="#8892b0" tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(v, n) => [`$${v.toLocaleString()}`, n === 'monthly' ? 'Monthly Income' : 'Portfolio Value']}
                  contentStyle={{ background: '#1a2035', border: '1px solid #00d4aa', borderRadius: 8 }}
                />
                <ReferenceLine y={20000} stroke="#ff6b35" strokeDasharray="6 3" label={{ value: '🎯 $20K Goal', fill: '#ff6b35', fontSize: 13 }} />
                <Area type="monotone" dataKey="monthly" stroke="#00d4aa" strokeWidth={3} fill="url(#incGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Year-by-Year Breakdown</div>
            <table style={styles.table}>
              <thead>
                <tr>{['Year','Portfolio Value','Monthly Income','Annual Income','% of Goal'].map(h=><th key={h} style={styles.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {data.incomeProjection.map(r => (
                  <tr key={r.year}>
                    <td style={{ ...styles.td, fontWeight: 700 }}>{r.year}</td>
                    <td style={styles.td}>${r.portfolio.toLocaleString()}</td>
                    <td style={{ ...styles.td, color: r.monthly >= 20000 ? '#00d4aa' : '#fff', fontWeight: r.monthly >= 20000 ? 800 : 400 }}>${r.monthly.toLocaleString()}</td>
                    <td style={styles.td}>${(r.monthly*12).toLocaleString()}</td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 100, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                          <div style={{ width: `${Math.min(r.monthly/20000*100,100)}%`, height: '100%', background: r.monthly >= 20000 ? '#00d4aa' : '#00a8ff', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, color: '#8892b0' }}>{(r.monthly/20000*100).toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div style={{ textAlign: 'center', color: '#3a4a6b', fontSize: 12, marginTop: 32 }}>
        Educational use only • Not financial advice • All investment decisions are your own responsibility
      </div>
    </div>
  )
}
