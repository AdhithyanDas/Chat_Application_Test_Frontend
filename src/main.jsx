import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './Context/ContextApi.jsx'
import SocketContext from './Context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextApi>
        <SocketContext>
          <App />
        </SocketContext>
      </ContextApi>
    </BrowserRouter>
  </StrictMode>,
)
