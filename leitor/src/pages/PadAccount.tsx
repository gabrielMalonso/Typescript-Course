import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'

export function PadConnect() {
  const key = new URLSearchParams(location.search).get('key') ?? ''
  const valid = /^[a-f0-9]{64}$/.test(key)
  const connect = useMutation(api.pad.connect)
  const [state, setState] = useState<'idle' | 'saving' | 'done'>('idle')
  const [error, setError] = useState('')
  const approve = async () => {
    setState('saving')
    setError('')
    try {
      await connect({ tokenHash: key, name: 'TypeScript Pad · Android' })
      setState('done')
    } catch {
      setState('idle')
      setError('Não foi possível conectar. Se este link já foi usado, inicie outra entrada pelo aplicativo.')
    }
  }
  return <main className="pad-account-page">
    <a href="/">← Voltar ao curso</a>
    <p className="home-eyebrow">TypeScript Pad</p>
    <h1>{state === 'done' ? 'Tablet conectado' : 'Conectar seu tablet'}</h1>
    {state === 'done' ? <p>Volte ao aplicativo. Seu rascunho será sincronizado com esta conta.</p> : valid ? <>
      <p>Confirme que este é o código mostrado no seu aplicativo:</p>
      <p className="pad-pair-code">{key.slice(0, 8).toUpperCase()}</p>
      <p>O aparelho terá acesso somente ao rascunho do Pad por 30 dias. Conecte apenas se você iniciou esta entrada.</p>
      <button className="btn primary" disabled={state === 'saving'} onClick={() => void approve()}>{state === 'saving' ? 'Conectando…' : 'Conectar este aparelho'}</button>
      {error && <p role="alert">{error}</p>}
    </> : <p>Link inválido. Abra o TypeScript Pad no tablet e toque em Entrar.</p>}
    <p><a href="/pad/dispositivos">Gerenciar dispositivos conectados</a></p>
  </main>
}

export function PadDevices() {
  const devices = useQuery(api.pad.devices)
  const revoke = useMutation(api.pad.revoke)
  const [pending, setPending] = useState<Id<'padDevices'> | null>(null)
  const [error, setError] = useState('')
  const disconnect = async (id: Id<'padDevices'>) => {
    setPending(id)
    setError('')
    try { await revoke({ id }) }
    catch { setError('Não foi possível desconectar. Tente novamente.') }
    finally { setPending(null) }
  }
  return <main className="pad-account-page">
    <a href="/pad/">← Voltar ao Pad</a>
    <p className="home-eyebrow">Sua conta</p>
    <h1>Dispositivos conectados</h1>
    <p>Desconectar interrompe a sincronização do aparelho e preserva o código salvo nele.</p>
    {!devices ? <p role="status">Carregando…</p> : devices.length === 0 ? <p>Nenhum aplicativo Android conectado.</p> : <ul className="pad-device-list">
      {devices.map(device => <li key={device.id}>
        <div><strong>{device.name}</strong><p>Acesso até {new Date(device.expiresAt).toLocaleDateString('pt-BR')}</p></div>
        <button className="btn ghost" disabled={pending !== null} onClick={() => void disconnect(device.id)}>{pending === device.id ? 'Desconectando…' : 'Desconectar'}</button>
      </li>)}
    </ul>}
    {error && <p role="alert">{error}</p>}
  </main>
}
