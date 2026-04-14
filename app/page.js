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
  const [data, setData]             = useState(null)
  const [livePrices, setLivePrices] = useState({})
  const [reData, setReData]         = useState(null)
  const [tab, setTab]               = useState('overview')
  const [loading, setLoading]       = useState(true)
  const [priceStatus, setPriceStatus] = useState('loading')

  useEffect(() => {
    fetch('/api/portfolio').then(r => r.json()).then(d => { setData(d); setLoading(false) })
    fetch('/api/prices').then(r => r.json()).then(d => {
      setLivePrices(d.prices || {})
      setPriceStatus(`Live — ${new Date(d.fetchedAt).toLocaleTimeString()}`)
    }).catch(() => setPriceStatus('Offline — showing last known prices'))
    fetch('/api/realestate').then(r => r.json()).then(d => setReData(d)).catch(() => {})
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
    { id: 'coveredcall', label: '💹 Covered Calls' },
    { id: 'networth',     label: '🏦 Net Worth' },
    { id: 'income',       label: '💰 Income Goal' },
    { id: 'realestate',   label: '🏠 Real Estate' },
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
              { label: 'Total Capital',    value: `$${summary.totalCapital.toLocaleString()}`,    sub: `As of ${summary.asOf}` },
              { label: 'Today\'s Gain',    value: `${summary.dayChange >= 0 ? '+' : ''}$${summary.dayChange?.toLocaleString(undefined,{maximumFractionDigits:2})}`, sub: `${summary.dayChangePct >= 0 ? '+' : ''}${summary.dayChangePct}% today`, color: summary.dayChange >= 0 ? '#00d4aa' : '#ff4757' },
              { label: 'Monthly Income',   value: `$${summary.currentMonthlyIncome.toLocaleString()}`, sub: `Goal: $${summary.monthlyIncomeTarget.toLocaleString()}/mo` },
              { label: 'Reserve Cash',     value: `$${summary.reserve.toLocaleString()}`,         sub: 'Dry powder' },
            ].map(m => (
              <div key={m.label} style={styles.card}>
                <div style={styles.cardTitle}>{m.label}</div>
                <div style={{ ...styles.bigNumber, color: m.color || '#fff' }}>{m.value}</div>
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
          {(() => {
            const totalCostB  = conservative.holdings.reduce((a,h) => a + h.costBasis * h.shares, 0)
            const totalMktVal = conservative.holdings.reduce((a,h) => {
              const lp = livePrices[h.ticker] || (h.marketValue / h.shares)
              return a + lp * h.shares
            }, 0)
            const totalGain = totalMktVal - totalCostB
            const cashBalance = 11979
            const estAnnualIncome = conservative.holdings.reduce((a,h) => a + (h.marketValue * h.yield / 100), 0)
            return (
              <div style={styles.grid4}>
                {[
                  { label: 'Positions Value',    value: `$${totalMktVal.toLocaleString(undefined,{maximumFractionDigits:0})}`, sub: `As of ${conservative.asOf}`, color: '#00d4aa' },
                  { label: 'Total Gain/Loss',    value: `$${totalGain.toFixed(2)}`, sub: `${((totalGain/totalCostB)*100).toFixed(2)}% overall`, color: totalGain >= 0 ? '#00d4aa' : '#ff4757' },
                  { label: 'Est. Annual Income', value: `$${estAnnualIncome.toFixed(0)}`, sub: `$${(estAnnualIncome/12).toFixed(0)}/month`, color: '#00a8ff' },
                  { label: 'Positions',          value: conservative.holdings.filter(h=>h.shares>0).length, sub: 'Active holdings', color: '#a855f7' },
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

          <div style={styles.card}>
            <div style={styles.cardTitle}>Holdings — Live Positions</div>
            <table style={styles.table}>
              <thead>
                <tr>{['Ticker','Shares','Cost Basis','Mkt Value','Gain $','Gain %','% of Acct','Yield','Signal','Confidence'].map(h=><th key={h} style={styles.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {conservative.holdings.filter(h=>h.shares>0).sort((a,b) => {
                  const lpA = livePrices[a.ticker] || (a.marketValue / a.shares)
                  const lpB = livePrices[b.ticker] || (b.marketValue / b.shares)
                  return lpB * b.shares - lpA * a.shares
                }).map(h => {
                  const livePrice  = livePrices[h.ticker] || (h.marketValue / h.shares)
                  const liveMktVal = livePrice * h.shares
                  const liveGain   = liveMktVal - h.costBasis * h.shares
                  const liveGainPct = (liveGain / (h.costBasis * h.shares)) * 100
                  return (
                  <tr key={h.ticker}>
                    <td style={{ ...styles.td, fontWeight: 700, color: '#00d4aa' }}>{h.ticker}{livePrices[h.ticker] ? <span style={{fontSize:9,marginLeft:4,color:'#00d4aa'}}>●</span> : null}</td>
                    <td style={styles.td}>{h.shares}</td>
                    <td style={styles.td}>${h.costBasis.toFixed(2)}</td>
                    <td style={{ ...styles.td, fontWeight: 600 }}>${liveMktVal.toLocaleString(undefined,{maximumFractionDigits:2})}</td>
                    <td style={{ ...styles.td, color: liveGain >= 0 ? '#00d4aa' : '#ff4757', fontWeight: 700 }}>{liveGain >= 0 ? '+' : ''}${liveGain.toFixed(2)}</td>
                    <td style={{ ...styles.td, color: liveGainPct >= 0 ? '#00d4aa' : '#ff4757' }}>{liveGainPct >= 0 ? '+' : ''}{liveGainPct.toFixed(2)}%</td>
                    <td style={styles.td}>{h.pctOfAcct}%</td>
                    <td style={{ ...styles.td, color: h.yield >= 5 ? '#00d4aa' : h.yield >= 3.5 ? '#52e3c2' : '#fff' }}>{h.yield}%</td>
                    <td style={styles.td}>
                      <span style={{ background: signalColor(h.signal)+'22', color: signalColor(h.signal), padding: '3px 10px', borderRadius: 6, fontWeight: 700, fontSize: 12 }}>{h.signal}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                          <div style={{ width: `${h.confidence*10}%`, height: '100%', background: h.confidence >= 7 ? '#00d4aa' : h.confidence >= 5 ? '#ffa502' : '#ff4757', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, color: '#8892b0' }}>{h.confidence}/10</span>
                      </div>
                    </td>
                  </tr>
                  )
                })}
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
          {(() => {
            const active   = aggressive.holdings.filter(h => h.status === 'ACTIVE')
            const watching = aggressive.holdings.filter(h => h.status === 'WATCHING')
            const totalMkt = active.reduce((a,h) => a + h.marketValue, 0)
            const totalGL  = active.reduce((a,h) => a + h.gainLoss, 0)
            const totalCostB = active.reduce((a,h) => a + h.costBasis * h.shares, 0)
            return (
              <div style={styles.grid4}>
                {[
                  { label: 'Active Positions Value', value: `$${totalMkt.toLocaleString(undefined,{maximumFractionDigits:0})}`, sub: `${active.length} active trades`, color: '#ff6b35' },
                  { label: 'Total Gain/Loss',        value: `${totalGL >= 0 ? '+' : ''}$${totalGL.toFixed(2)}`, sub: `${totalCostB > 0 ? ((totalGL/totalCostB)*100).toFixed(2) : 0}% since entry`, color: totalGL >= 0 ? '#00d4aa' : '#ff4757' },
                  { label: 'Recovery Goal',           value: '$30,012', sub: 'EETH loss to recover', color: '#ffa502' },
                  { label: 'Watching',                value: watching.length, sub: 'Waiting for entry', color: '#8892b0' },
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

          <div style={styles.card}>
            <div style={styles.cardTitle}>Swing Trade Positions — Live</div>
            <table style={styles.table}>
              <thead>
                <tr>{['Ticker','Shares','Cost','Mkt Value','Day G/L','Total G/L','Target','Stop','Status','To Target'].map(h=><th key={h} style={styles.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {aggressive.holdings.map(h => {
                  const livePrice  = livePrices[h.ticker] || h.costBasis
                  const upside     = h.target ? ((h.target - (livePrices[h.ticker] || h.costBasis)) / (livePrices[h.ticker] || h.costBasis) * 100).toFixed(1) : '-'
                  const isActive   = h.status === 'ACTIVE'
                  return (
                    <tr key={h.ticker}>
                      <td style={{ ...styles.td, fontWeight: 700, color: '#ff6b35' }}>{h.ticker}</td>
                      <td style={styles.td}>{h.shares || '-'}</td>
                      <td style={styles.td}>{h.costBasis ? `$${h.costBasis.toFixed(2)}` : '-'}</td>
                      <td style={{ ...styles.td, fontWeight: 600 }}>{isActive ? `$${h.marketValue.toLocaleString(undefined,{maximumFractionDigits:0})}` : '-'}</td>
                      <td style={{ ...styles.td, color: h.gainLoss >= 0 ? '#00d4aa' : '#ff4757' }}>{isActive ? `${h.gainLoss >= 0 ? '+' : ''}$${h.gainLoss.toFixed(2)}` : '-'}</td>
                      <td style={{ ...styles.td, color: h.gainLoss >= 0 ? '#00d4aa' : '#ff4757', fontWeight: 700 }}>{isActive ? `${h.gainLoss >= 0 ? '+' : ''}${h.gainPct.toFixed(2)}%` : '-'}</td>
                      <td style={{ ...styles.td, color: '#00d4aa' }}>${h.target}</td>
                      <td style={{ ...styles.td, color: '#ff4757' }}>${h.stop}</td>
                      <td style={styles.td}>
                        <span style={{ background: signalColor(h.status)+'22', color: signalColor(h.status), padding: '3px 10px', borderRadius: 6, fontWeight: 700, fontSize: 12 }}>{h.status}</span>
                      </td>
                      <td style={{ ...styles.td, color: parseFloat(upside) > 0 ? '#00d4aa' : '#ff4757', fontWeight: 700 }}>{upside !== '-' ? `${upside > 0 ? '+' : ''}${upside}%` : '-'}</td>
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

      {tab === 'coveredcall' && (
        <>
          {(() => {
            const cc = data.coveredCalls
            const totalDeployed = cc.positions.reduce((a,p) => a + p.totalCost, 0)
            const estMonthlyPremium = cc.positions.filter(p => p.status === 'ACTIVE').reduce((a,p) => a + (p.fillPrice || 0) * (p.shares || 100), 0)
            const estAnnualPremium = estMonthlyPremium * 12
            const avgAnnualized = cc.positions.reduce((a,p) => a + p.annualizedReturn, 0) / cc.positions.length
            return (
              <div style={styles.grid4}>
                {[
                  { label: 'Capital Allocated',    value: `$${totalDeployed.toLocaleString()}`, sub: `${cc.positions.filter(p=>p.status==='ACTIVE').length} active positions`,        color: '#f59e0b' },
                  { label: 'Est. Monthly Premium', value: `$${estMonthlyPremium.toFixed(0)}`,      sub: 'Per month from all calls',   color: '#00d4aa' },
                  { label: 'Est. Annual Premium',  value: `$${estAnnualPremium.toFixed(0)}`,       sub: 'Premium income only',        color: '#00a8ff' },
                  { label: 'Avg Annualized Return',value: `${avgAnnualized.toFixed(1)}%`,          sub: 'Premium + dividend combined', color: '#a855f7' },
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

          <div style={styles.card}>
            <div style={styles.cardTitle}>📚 How Covered Calls Work</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              {data.coveredCalls.rules.map((r,i) => (
                <div key={i} style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 6, padding: '6px 12px', fontSize: 13, color: '#fcd34d' }}>
                  {i+1}. {r}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={styles.cardTitle}>Covered Call Candidates</div>
              <div style={{ fontSize: 12, color: '#8892b0' }}>Sorted by annualized return</div>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>{['Ticker','Rating','100sh Cost','Yield','Strike','Expiry','Est Premium','Premium %','Annualized','Status','Notes'].map(h=><th key={h} style={styles.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {[...data.coveredCalls.positions].sort((a,b) => {
                  if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') return -1
                  if (b.status === 'ACTIVE' && a.status !== 'ACTIVE') return 1
                  return b.annualizedReturn - a.annualizedReturn
                }).map(p => {
                  const livePrice   = livePrices[p.ticker] || p.stockPrice
                  const liveCost    = livePrice * 100
                  const isActive    = p.status === 'ACTIVE'
                  const liveGain    = isActive ? ((livePrice - p.netCostBasis) * p.shares).toFixed(2) : null
                  const statusColor = isActive ? '#00d4aa' : p.status === 'READY' ? '#00a8ff' : '#ffa502'
                  const ratingColor = p.rating === 'A' ? '#00d4aa' : p.rating === 'B+' ? '#00a8ff' : '#ffa502'
                  return (
                    <tr key={p.ticker} style={isActive ? { background: 'rgba(0,212,170,0.04)' } : {}}>
                      <td style={{ ...styles.td, fontWeight: 800, color: '#f59e0b', fontSize: 15 }}>{p.ticker}</td>
                      <td style={styles.td}><span style={{ background: ratingColor+'22', color: ratingColor, padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>{p.rating}</span></td>
                      <td style={styles.td}>${liveCost.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
                      <td style={{ ...styles.td, color: '#00d4aa' }}>{p.yield}%</td>
                      <td style={{ ...styles.td, color: '#fff', fontWeight: 700 }}>{isActive ? `$${p.strike}` : `$${p.suggestedStrike||'-'}`}</td>
                      <td style={{ ...styles.td, color: '#8892b0' }}>{isActive ? p.expiry : p.suggestedExpiry}</td>
                      <td style={{ ...styles.td, color: '#00d4aa', fontWeight: 700 }}>{isActive ? `$${p.fillPrice}/sh ($${p.premiumCollected} collected)` : `~$${p.estPremium}/sh`}</td>
                      <td style={styles.td}>{isActive ? `${p.premiumPct}%` : `${p.estPremiumPct}%`}</td>
                      <td style={{ ...styles.td, color: '#a855f7', fontWeight: 800 }}>{p.annualizedReturn}%</td>
                      <td style={styles.td}><span style={{ background: statusColor+'22', color: statusColor, padding: '3px 10px', borderRadius: 6, fontWeight: 700, fontSize: 12 }}>{p.status}</span></td>
                      <td style={{ ...styles.td, color: '#8892b0', fontSize: 12, maxWidth: 200 }}>{isActive ? `✅ Filled ${p.filledAt} | Breakeven $${p.breakeven} | Max profit $${p.maxProfit}` : p.note}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div style={styles.grid2}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>💡 Recommended First Trades (with $9,500)</div>
              {[
                { trade: 'Buy 100 MO @ $65.76 = $6,576', action: 'Sell 1 MO Apr call @ $70 strike', premium: '$120/contract', monthly: '$120', note: 'Highest annualized return. Stable dividend stock.' },
                { trade: 'Buy 100 PFE @ $28.32 = $2,832', action: 'Sell 1 PFE Apr call @ $30 strike', premium: '$55/contract', monthly: '$55', note: 'Budget friendly. High dividend + premium combo.' },
              ].map((t,i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 700, marginBottom: 4 }}>{t.trade}</div>
                  <div style={{ color: '#00d4aa', fontSize: 13, marginBottom: 4 }}>→ {t.action}</div>
                  <div style={{ color: '#a855f7', fontSize: 13, marginBottom: 4 }}>Premium: {t.premium} | Monthly income: {t.monthly}</div>
                  <div style={{ color: '#8892b0', fontSize: 12 }}>{t.note}</div>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: 12, background: 'rgba(0,212,170,0.08)', borderRadius: 8, border: '1px solid rgba(0,212,170,0.2)' }}>
                <div style={{ color: '#00d4aa', fontWeight: 700 }}>Combined: $9,408 deployed | ~$175/month premium + $52/month dividends = $227/month</div>
                <div style={{ color: '#8892b0', fontSize: 12, marginTop: 4 }}>Annualized: ~$2,724/year on $9,408 = 28.9% return</div>
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardTitle}>⚠️ Covered Call Rules to Remember</div>
              {[
                { rule: 'Only sell calls on stocks you\'d be happy to sell', detail: 'If called away, you must sell at the strike price' },
                { rule: 'Strike 5-10% above current price', detail: 'Balances premium income vs keeping the stock' },
                { rule: '2-4 weeks to expiry is the sweet spot', detail: 'Theta decay accelerates in final 2 weeks' },
                { rule: 'Close at 50% profit', detail: 'Buy back the call when it\'s worth 50% of what you sold it for' },
                { rule: 'Never sell calls during earnings week', detail: 'IV spike can make premiums too expensive to close' },
                { rule: 'Dividend dates matter', detail: 'Calls can be exercised early before ex-dividend date' },
              ].map((r,i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 600, fontSize: 13 }}>✓ {r.rule}</div>
                  <div style={{ color: '#8892b0', fontSize: 12, marginTop: 2 }}>{r.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'networth' && (
        <>
          {(() => {
            const nw = data.netWorth

            // Calculate live Solomon total from all RJ accounts
            const solomonLive = data.solomon.accounts.reduce((total, acct) => {
              return total + acct.holdings.reduce((a,h) => a + h.shares * (livePrices[h.ticker] || h.currentPrice), 0)
            }, 0)

            // Calculate live Schwab conservative total
            const schwabConservative = data.portfolios.find(p => p.id === 'schwab-conservative')
            const schwabConservativeLive = schwabConservative ? schwabConservative.capital : 50000

            // Calculate live Schwab aggressive total
            const schwabAggressiveLive = 29000

            // Calculate live Schwab total across all 3 accounts
            const schwabConservativeVal = data.portfolios
              .find(p => p.id === 'schwab-conservative')?.holdings
              .reduce((a,h) => a + h.shares * (livePrices[h.ticker] || h.costBasis), 0) || 0

            const schwabAggressiveVal = data.portfolios
              .find(p => p.id === 'schwab-aggressive')?.holdings
              .filter(h => h.status === 'ACTIVE')
              .reduce((a,h) => a + h.shares * (livePrices[h.ticker] || h.costBasis), 0) || 0

            // Covered call positions (MO 100 shares)
            const schwabCoveredCallVal = 100 * (livePrices['MO'] || 65.75)

            const schwabCashBalance = 11979
            const schwabTotalLive = Math.round(schwabConservativeVal + schwabAggressiveVal + schwabCoveredCallVal + schwabCashBalance)

            // Override static values with live calculated values
            const dynamicAssets = nw.assets.map(cat => ({
              ...cat,
              items: cat.items.map(item => {
                if (item.name.includes('Raymond James - JTWROS')) return { ...item, value: Math.round(data.solomon.accounts.find(a=>a.name.includes('JTWROS'))?.holdings.reduce((a,h)=>a+h.shares*(livePrices[h.ticker]||h.currentPrice),0) || item.value) }
                if (item.name.includes('Raymond James - Collateral')) return { ...item, value: Math.round(data.solomon.accounts.find(a=>a.name.includes('Collateral'))?.holdings.reduce((a,h)=>a+h.shares*(livePrices[h.ticker]||h.currentPrice),0) || item.value) }
                if (item.name.includes('Charles Schwab Investment')) return { ...item, value: schwabTotalLive, live: true }
                if (item.name.includes('Charles Schwab INV Cash')) return { ...item, value: 0 } // rolled into above
                return item
              })
            }))

            const totalAssets = dynamicAssets.reduce((a,cat) => a + cat.items.reduce((b,item) => b + item.value, 0), 0)
            const totalLiabilities = nw.liabilities.reduce((a,l) => a + l.value, 0)
            const netWorthVal = totalAssets - totalLiabilities
            return (
              <>
                <div style={styles.grid4}>
                  {[
                    { label: 'Total Assets',      value: `$${(totalAssets/1000000).toFixed(2)}M`,      color: '#00d4aa',  sub: 'Incl. live market values' },
                    { label: 'Total Liabilities', value: `$${(totalLiabilities/1000).toFixed(0)}K`,    color: '#ff4757',  sub: 'Mortgages & notes' },
                    { label: 'Net Worth',          value: `$${(netWorthVal/1000000).toFixed(2)}M`,      color: '#00a8ff',  sub: 'Assets minus liabilities' },
                    { label: 'Solomon (Live)',      value: `$${(solomonLive/1000000).toFixed(2)}M`,      color: '#a855f7',  sub: 'Raymond James • live prices' },
                  ].map(m => (
                    <div key={m.label} style={{ ...styles.card, borderTop: `3px solid ${m.color}` }}>
                      <div style={styles.cardTitle}>{m.label}</div>
                      <div style={{ ...styles.bigNumber, color: m.color }}>{m.value}</div>
                      <div style={styles.subtext}>{m.sub}</div>
                    </div>
                  ))}
                </div>

                {dynamicAssets.map(cat => {
                  const catTotal = cat.items.reduce((a,i) => a + i.value, 0)
                  return (
                    <div key={cat.category} style={{ ...styles.card, marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={styles.cardTitle}>{cat.category}</div>
                        <div style={{ color: '#00d4aa', fontWeight: 700, fontSize: 16 }}>${catTotal.toLocaleString()}</div>
                      </div>
                      <table style={styles.table}>
                        <tbody>
                          {cat.items.filter(item => item.value > 0).map(item => (
                            <tr key={item.name}>
                              <td style={{ ...styles.td, color: '#ccd6f6' }}>
                                {item.name}
                                {item.live && <span style={{ marginLeft: 8, fontSize: 10, background: 'rgba(0,212,170,0.15)', color: '#00d4aa', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>LIVE</span>}
                              </td>
                              <td style={{ ...styles.td, textAlign: 'right', fontWeight: 600, color: item.live ? '#00d4aa' : '#00d4aa' }}>${item.value.toLocaleString()}</td>
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

      {/* REAL ESTATE TAB */}
      {tab === 'realestate' && (
        <>
          {/* Buy Box */}
          <div style={{ ...styles.card, borderTop: '4px solid #00d4aa', marginBottom: 24 }}>
            <div style={styles.cardTitle}>🎯 Your Texas SFH Buy Box</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginTop: 12 }}>
              {[
                { label: 'Target Markets',   value: 'Central TX + DFW' },
                { label: 'Price Range',       value: '$150K – $350K' },
                { label: 'Strategy',          value: 'Hold + Flip' },
                { label: 'Financing',         value: '20% Down Conv.' },
                { label: 'Min Cash-on-Cash',  value: '8 – 10%' },
              ].map(x => (
                <div key={x.label} style={{ textAlign: 'center', background: 'rgba(0,212,170,0.06)', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#8892b0', fontSize: 11, marginBottom: 4 }}>{x.label}</div>
                  <div style={{ color: '#00d4aa', fontWeight: 700, fontSize: 14 }}>{x.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Analyze a Deal */}
          <div style={{ ...styles.card, marginBottom: 24 }}>
            <div style={styles.cardTitle}>💡 How to Analyze a Deal</div>
            <div style={{ color: '#8892b0', fontSize: 13, lineHeight: 1.8 }}>
              Send GordonGecko any property details via Telegram and get an instant pro forma:
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: 16, marginTop: 12, fontFamily: 'monospace', fontSize: 12, color: '#00d4aa' }}>
              “Analyze: 456 Main St, Bastrop TX — asking $240k, 3br/2ba, 1,800sqft, est rent $1,750/mo”
            </div>
            <div style={{ color: '#8892b0', fontSize: 12, marginTop: 8 }}>
              You’ll get: Pro forma • Cash-on-cash return • Cap rate • 10-yr projection • AI verdict • Negotiation target
            </div>
          </div>

          {/* Deal History */}
          <div style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={styles.cardTitle}>📁 Deal Analysis History</div>
              <div style={{ fontSize: 12, color: '#8892b0' }}>Last 50 analyzed deals</div>
            </div>
            {!reData || !reData.dealHistory || reData.dealHistory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 48, color: '#8892b0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🏠</div>
                <div>No deals analyzed yet.</div>
                <div style={{ fontSize: 12, marginTop: 8 }}>Send a property address to GordonGecko on Telegram to run your first analysis.</div>
              </div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>{['Date','Address','City','Price','Score','CoC%','Monthly CF','Verdict'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {reData.dealHistory.map((d, i) => {
                    const scoreColor = { A:'#00d4aa', B:'#00a8ff', C:'#ffa502', D:'#ff6b35', F:'#ff4757' }[d.score] || '#8892b0'
                    const cfColor    = d.monthlyCF >= 0 ? '#00d4aa' : '#ff4757'
                    return (
                      <tr key={i}>
                        <td style={{ ...styles.td, color: '#8892b0', fontSize: 12 }}>{new Date(d.analyzedAt).toLocaleDateString()}</td>
                        <td style={{ ...styles.td, color: '#ccd6f6' }}>{d.address}</td>
                        <td style={{ ...styles.td, color: '#8892b0' }}>{d.city}</td>
                        <td style={styles.td}>${d.price?.toLocaleString()}</td>
                        <td style={styles.td}><span style={{ background: scoreColor+'22', color: scoreColor, padding: '2px 8px', borderRadius: 4, fontWeight: 700, fontSize: 13 }}>{d.score}</span></td>
                        <td style={{ ...styles.td, color: d.coc >= 8 ? '#00d4aa' : '#ff4757', fontWeight: 700 }}>{d.coc?.toFixed(1)}%</td>
                        <td style={{ ...styles.td, color: cfColor, fontWeight: 700 }}>${d.monthlyCF?.toFixed(0)}/mo</td>
                        <td style={{ ...styles.td, color: '#8892b0', fontSize: 11, maxWidth: 200 }}>{d.verdict}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Key Metrics Explainer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div style={{ ...styles.card, borderTop: '3px solid #00d4aa' }}>
              <div style={styles.cardTitle}>📊 Key Metrics — What They Mean</div>
              {[
                { metric: 'Cash-on-Cash Return', desc: 'Annual cash flow ÷ cash invested. Target: 8-10%+', good: '≥ 8%', bad: '< 6%' },
                { metric: 'Cap Rate',            desc: 'NOI ÷ property value. Market health indicator',  good: '≥ 6%', bad: '< 4%' },
                { metric: '1% Rule',             desc: 'Monthly rent ≥ 1% of purchase price',          good: 'Passes',   bad: 'Fails' },
                { metric: 'GRM',                 desc: 'Price ÷ annual rent. Lower = better deal',     good: '< 10x',   bad: '> 15x' },
              ].map((m, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{m.metric}</div>
                  <div style={{ color: '#8892b0', fontSize: 12, marginTop: 2 }}>{m.desc}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                    <span style={{ color: '#00d4aa', fontSize: 11 }}>✅ {m.good}</span>
                    <span style={{ color: '#ff4757', fontSize: 11 }}>❌ {m.bad}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...styles.card, borderTop: '3px solid #a855f7' }}>
              <div style={styles.cardTitle}>💰 Texas Market Rent Comps (3BR/2BA SFH)</div>
              {[
                ['Austin',      '$2,200'], ['Georgetown',  '$1,900'], ['Round Rock',  '$1,800'],
                ['Bastrop',     '$1,650'], ['Kyle/Buda',   '$1,750'], ['San Marcos',  '$1,600'],
                ['McKinney',    '$2,000'], ['Frisco/Plano','$2,100'], ['Dallas',      '$1,800'],
                ['Fort Worth',  '$1,700'], ['Garland',     '$1,600'], ['Arlington',   '$1,650'],
              ].map(([city, rent]) => (
                <div key={city} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13 }}>
                  <span style={{ color: '#ccd6f6' }}>{city}</span>
                  <span style={{ color: '#a855f7', fontWeight: 600 }}>{rent}/mo</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div style={{ textAlign: 'center', color: '#3a4a6b', fontSize: 12, marginTop: 32 }}>
        Educational use only • Not financial advice • All investment decisions are your own responsibility
      </div>
    </div>
  )
}
