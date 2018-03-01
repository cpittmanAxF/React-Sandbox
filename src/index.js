import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider, injectGlobal } from 'styled-components'
import { theme } from 'webapps-components'

injectGlobal`
    html {
        box-sizing: border-box;
    }

    body{
        margin: 0;
        padding: 0;
        font-family: system-ul, sans-serif;
        background: #ccc;
    }
`

ReactDOM.render(<ThemeProvider theme={theme}><App /></ThemeProvider>, document.getElementById('root'));
registerServiceWorker();
