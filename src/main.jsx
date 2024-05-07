import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextAPi from './context/ContextAPi.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ContextAPi>
     <BrowserRouter> 
     <App />
     </BrowserRouter>
  </ContextAPi>
  </React.StrictMode>,
)
