import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // App 컴포넌트 가져오기
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* App 컴포넌트를 렌더링하여 라우팅 처리 */}
  </React.StrictMode>
);

reportWebVitals();
