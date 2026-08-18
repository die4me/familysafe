import { supabase } from '@/lib/supabase'
import CadastroForm from './CadastroForm'
import DadosPulseira from './DadosPulseira'

export const dynamic = 'force-dynamic'

export default async function PulseiraPage({ params }) {
  const codigo = params.codigo

  const { data: pulseira } = await supabase
    .from('pulseiras')
    .select('*')
    .eq('codigo', codigo)
    .maybeSingle()

  if (!pulseira) {
    return (
      <main className="card">
        <h1>🛡️ JMCS Family Safe</h1>
        <p>Pulseira <strong>{codigo}</strong> não encontrada.</p>
      </main>
    )
  }

  if (!pulseira.nome_crianca) {
    return <CadastroForm codigo={codigo} pulseiraId={pulseira.id} />
  }

  return <DadosPulseira pulseira={pulseira} />
}