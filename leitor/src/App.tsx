import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider'
import { Home } from './pages/Home'
import { Reader } from './pages/Reader'
import { StudySession } from './auth/StudySession'


export default function App() {
  return (
    <ThemeProvider>
      <StudySession><BrowserRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/laboratorio/pdf" element={<Navigate to="/" replace />} />

            <Route path="/" element={<Home />} />
            <Route path="/ler/*" element={<Reader />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter></StudySession>
    </ThemeProvider>
  )
}
