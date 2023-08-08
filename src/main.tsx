import React from 'react'
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client'
import './App.css'
import './index.css'
import { Login } from './components/login.tsx';
import { ActivateKey } from './components/ActivateKey.tsx';
import App from './App.tsx';
import {
  HashRouter,
  Route,
  Routes
} from "react-router-dom";
import { AuthProvider } from './components/auth.tsx';
import { LicenseKeyEntry } from './components/LicenseKeyEntry.tsx';
import { LicenseKeyProvider } from './components/LicenseKeyProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <LicenseKeyProvider>
        <AuthProvider>
          <HashRouter>
            <Routes>
              <Route path='/' Component={LicenseKeyEntry} />
              <Route path='/login' Component={Login} />
              <Route path='/activateKey' Component={ActivateKey} />
              <Route path='/app' Component={App} />
            </Routes>
          </HashRouter>
        </AuthProvider>
      </LicenseKeyProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
