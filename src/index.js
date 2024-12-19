import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8'
});

root.render(
  <React.StrictMode>
    <AgoraRTCProvider client={client}>
    <BrowserRouter basename='/video-calling-front'>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
      </BrowserRouter>
    </AgoraRTCProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
