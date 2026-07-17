import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { AIProvider } from './context/AIContext';
import './styles.css'; 
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <AuthProvider>
        <AIProvider>
            <App />
        </AIProvider>
      </AuthProvider>
    </BrowserRouter>
);