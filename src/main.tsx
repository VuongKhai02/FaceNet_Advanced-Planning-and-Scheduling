import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './App.tsx'
import './index.css'
import store from './store'
import { AuthService } from './auth/index.ts'
import { LoadingProvider } from './contexts/Loading.tsx';

const rendenReactApp = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </Provider>
    </React.StrictMode>,
  )
}

AuthService.initKeycloak(rendenReactApp)

