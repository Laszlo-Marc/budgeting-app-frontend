import React from 'react';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
});
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider store={store}>
            <App />
        </AuthProvider>
    </React.StrictMode>,
);
