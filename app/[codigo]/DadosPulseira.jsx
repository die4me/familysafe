'use client'

export default function DadosPulseira({ pulseira }) {
  return (
    <main className="card">
      <h1>🟢 Pulseira cadastrada</h1>
      <p><strong>{pulseira.nome_crianca}</strong></p>
      <p>Responsável: {pulseira.nome_responsavel}</p>
      <a className="btn" href={`tel:${pulseira.telefone}`}>
        📞 Contatar responsável
      </a>
    </main>
  )
}