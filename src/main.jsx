import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterCardDetail from '@/components/characterCardDetail'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  
  
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
    <Route path='/detail/:id' element={<CharacterCardDetail />} />
    <Route path='' element={<App />} />
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
  
  
)
