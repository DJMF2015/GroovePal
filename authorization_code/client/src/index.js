import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Snowfall from 'react-snowfall';
import App from './App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Snowfall
      style={{ position: 'fixed', width: '100vw', height: '100vh' }}
      snowflakeCount={200}
      color="white"
      radius={[0.5, 3.0]}
      speed={[0.5, 3.0]}
      wind={[-1.5, 4.0]}
      rotationSpeed={[-1.0, 2.0]}
    /> */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
