import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProver, ThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

