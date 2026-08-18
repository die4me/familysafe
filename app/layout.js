import './globals.css'

export const metadata = {
  title: 'JMCS Family Safe',
  description: 'Pulseiras de identificação com QR Code',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}