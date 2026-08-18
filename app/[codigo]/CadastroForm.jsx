'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function CadastroForm({ codigo, pulseiraId }) {
  const [nome, setNome] = useState('')
  const [responsavel, setResponsavel] = useState('')
  const [telefone, setTelefone] = useState('')
  const [salvo, setSalvo] = useState(false)
  const [erro, setErro] = useState('')

  async function salvar(e) {
    e.preventDefault()
    const { error } = await supabase
      .from('pulseiras')
      .update({
        nome_crianca: nome,
        nome_responsavel: responsavel,
        telefone: telefone,
        cadastrada: true,
      })
      .eq('id', pulseiraId)

    if (error) {
      setErro('Erro ao salvar. Tente novamente.')
      return
    }
    setSalvo(true)
  }

  if (salvo) {
    return (
      <main className="card">
        <h1>🟢 Pulseira cadastrada!</h1>
        <p><strong>{nome}</strong></p>
        <p>Responsável: {responsavel}</p>
        <p>📞 {telefone}</p>
      </main>
    )
  }

  return (
    <main className="card">
      <h1>🛡️ JMCS Family Safe</h1>
      <p>Pulseira <strong>{codigo}</strong> ainda não está cadastrada.</p>
      <form onSubmit={salvar}>
        <label>
          Nome da criança
          <input value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>
        <label>
          Nome do responsável
          <input value={responsavel} onChange={(e) => setResponsavel(e.target.value)} required />
        </label>
        <label>
          Telefone do responsável
          <input value={telefone} onChange={(e) => setTelefone(e.target.value)} required type="tel" />
        </label>
        <button type="submit">Cadastrar</button>
        {erro && <p className="erro">{erro}</p>}
      </form>
    </main>
  )
}