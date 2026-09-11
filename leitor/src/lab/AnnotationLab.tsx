import { useState } from 'react'
import { AuthKitProvider, useAuth } from '@workos-inc/authkit-react'
import { ConvexProviderWithAuthKit } from '@convex-dev/workos'
import { ConvexReactClient, useConvexAuth, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { LabViewer } from './LabViewer'
import './lab.css'

const convexUrl = import.meta.env.VITE_CONVEX_URL
const clientId = import.meta.env.VITE_WORKOS_CLIENT_ID
const client = convexUrl ? new ConvexReactClient(convexUrl) : null

export default function AnnotationLab() {
  if (!client || !clientId) return <main className="lab-login"><h1>Laboratório de PDF</h1><p>A conexão de acesso ainda não foi configurada.</p><a href="/">Voltar às aulas</a></main>
  return <AuthKitProvider clientId={clientId} devMode={import.meta.env.VITE_AUTHKIT_TEST_MODE === 'true'} redirectUri={`${window.location.origin}/auth/retorno`} onRedirectCallback={() => window.location.replace('/laboratorio/pdf')}>
    <ConvexProviderWithAuthKit client={client} useAuth={useAuth}><Access /></ConvexProviderWithAuthKit>
  </AuthKitProvider>
}

function Access() {
  const auth = useAuth()
  const { isAuthenticated, isLoading } = useConvexAuth()
  const access = useQuery(api.annotations.access, isAuthenticated ? {} : 'skip')
  const [error, setError] = useState('')
  if (isAuthenticated && access?.allowed && auth.user) return <LabViewer owner={auth.user.id} onSignOut={() => auth.signOut({ returnTo: window.location.origin + '/laboratorio/pdf' })} />
  const loading = auth.isLoading || isLoading || (isAuthenticated && !access)
  return <main className="lab-login">
    <a href="/" className="lab-back">← Voltar às aulas</a>
    <span className="lab-eyebrow">ESPAÇO DE TESTES</span><h1>Seu caderno de PDF.</h1>
    <p>{loading ? 'Confirmando seu acesso…' : auth.user ? 'Esta conta não tem acesso ao laboratório.' : 'Entre para escrever, marcar e continuar a leitura em outro dispositivo.'}</p>
    {!loading && <button onClick={() => { setError(''); if (auth.user) auth.signOut({ returnTo: window.location.origin + '/laboratorio/pdf' }); else void auth.signIn().catch(() => setError('Não foi possível iniciar o login. Tente novamente.')) }}>{auth.user ? 'Sair desta conta' : 'Entrar'}</button>}
    {error && <p role="alert">{error}</p>}
    <small>Acesso exclusivo de Gabriel Alonso.</small>
  </main>
}
