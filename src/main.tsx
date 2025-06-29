import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/styles/index.css'
import '@ant-design/v5-patch-for-react-19'
import App from '@/app/App'
import { makeServer } from '@/mocks/server'
import 'nprogress/nprogress.css'
import 'simplebar-react/dist/simplebar.min.css'

makeServer()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
