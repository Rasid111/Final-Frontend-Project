import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ColorModeProvider } from './contexts/ColorModeContex.jsx'
import { CurrencyProvider } from './contexts/CurrencyContext.jsx'
import { LangProvider } from './contexts/LangContext.jsx'
import { Provider } from 'react-redux'
import { store } from './tools/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <ColorModeProvider>
        <LangProvider>
          <CurrencyProvider>
            <App />
          </CurrencyProvider>
        </LangProvider>
      </ColorModeProvider>
    </Provider>
  </StrictMode>,
)
