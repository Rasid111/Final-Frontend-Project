import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ColorModeProvider } from './contexts/ColorModeContex.jsx'
import { CurrencyProvider } from './contexts/CurrencyContext.jsx'
import { LangProvider } from './contexts/LangContext.jsx'
import { AccountProvider } from './contexts/AccountContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeProvider>
      <LangProvider>
        <CurrencyProvider>
          <AccountProvider>
            <App />
          </AccountProvider>
        </CurrencyProvider>
      </LangProvider>
    </ColorModeProvider>
  </StrictMode>,
)
