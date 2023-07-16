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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <HashRouter>
        <Routes>
          <Route path='/' Component={Login} />
          <Route path='/app' Component={App} />
        </Routes>
        {/* <App /> */}
      </HashRouter>
    </RecoilRoot>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
