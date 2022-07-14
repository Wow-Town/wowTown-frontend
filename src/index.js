import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { RecoilRoot } from 'recoil';
axios.defaults.withCredentials = true;
const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
    <RecoilRoot>
    <App />
    </RecoilRoot>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
