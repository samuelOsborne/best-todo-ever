import React from 'react'
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client'
import './App.css'
import './index.css'
import { Login } from './components/login.tsx';
import App from './App.tsx';
import {
  HashRouter,
  Route,
  Routes
} from "react-router-dom";
import { AuthProvider } from './components/auth.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path='/' Component={Login} />
            <Route path='/app' Component={App} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
