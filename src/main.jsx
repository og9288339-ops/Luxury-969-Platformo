import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // استيراد الـ App الحقيقي بتاعك
import './index.css'; // لو عندك ملف ستايل أساسي

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);