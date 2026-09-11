import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider'
import { Home } from './pages/Home'
import { Reader } from './pages/Reader'
import { lazy, Suspense } from 'react'

const AnnotationLab = lazy(() => import('./lab/AnnotationLab'))

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/laboratorio/pdf" element={<Suspense fallback={<p role="status">Abrindo laboratório…</p>}><AnnotationLab /></Suspense>} />
            <Route path="/auth/retorno" element={<Suspense fallback={<p role="status">Confirmando acesso…</p>}><AnnotationLab /></Suspense>} />
            <Route path="/" element={<Home />} />
            <Route path="/ler/*" element={<Reader />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}
