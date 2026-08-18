'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import CadastroForm from './CadastroForm'
import DadosPulseira from './DadosPulseira'

export default function PulseiraPage({ params }) {
  const codigo = params.codigo
  const [pulseira, setPulseira] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscar() {
      const { data } = await supabase
        .from('pulseiras')
        .select('*')
        .eq('codigo', codigo)
        .maybeSingle()
      setPulseira(data)
      setCarregando(false)
    }
    buscar()
  }, [codigo])

  if (carregando) {
    return (
      <main className="card">
        <h1>🛡️ JMCS Family Safe</h1>
        <p>Carregando...</p>
      </main>
    )
  }

  if (!pulseira) {
    return (
      <main className="card">
        <h1>🛡️ JMCS Family Safe</h1>
        <p>Pulseira <strong>{codigo}</strong> não encontrada.</p>
      </main>
    )
  }

  if (!pulseira.nome_crianca) {
    return <CadastroForm codigo={codigo} />
  }

  return <DadosPulseira pulseira={pulseira} />
}