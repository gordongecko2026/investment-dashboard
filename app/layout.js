export const metadata = {
  title: 'Investment Command Center',
  description: 'AI-Powered Portfolio Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0a0e1a', color: '#fff' }}>
        {children}
      </body>
    </html>
  )
}
