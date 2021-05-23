import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './index.css';
import "@popperjs/core";
import "bootstrap";
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import Cookies from "universal-cookie";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from './contexts/User';

axios.interceptors.request.use(
    async (config) => {
        const cookies = new Cookies();
        const token: string | undefined = cookies.get('tk');

        if (token) {
            config.headers = {
                authorization: `Bearer ${token}`
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.defaults.baseURL = "http://localhost:3000/api/";

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
