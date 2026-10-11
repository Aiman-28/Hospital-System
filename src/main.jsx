import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import './index.css';
createRoot(document.getElementById('root')).render(
  <BrowserRouter><ToastProvider><AuthProvider><DataProvider><App /></DataProvider></AuthProvider></ToastProvider></BrowserRouter>
);
