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
  const [data, setData]       = useState(null)
  const [tab, setTab]         = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portfolio').then(r => r.json()).then(d => { setData(d); setLoading(false) })
  }, [])

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
    { id: 'income',       label: '💰 Income Goal' },
  ]

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.title}>⚡ Investment Command Center</div>
          <div style={styles.subtitle}>AI-Powered | 7 Institutional Frameworks | Updated: {new Date(data.lastUpdated).toLocaleString()}</div>
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
        <div style={{ ...styles.card, textAlign: 'center', padding: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👁</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#a855f7', marginBottom: 8 }}>Solomon Account</div>
          <div style={{ color: '#8892b0' }}>Details coming soon. This account will be configured in the next session.</div>
        </div>
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
