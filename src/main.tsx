import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './hooks/theme.ts'
import {Provider} from 'react-redux'
import { persistor, store } from './toolkit/store';
import { PersistGate } from 'redux-persist/integration/react'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ThemeProvider theme={theme}>
    <Provider  store={store} >
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
    </Provider>
   </ThemeProvider>
  </StrictMode>,
)
