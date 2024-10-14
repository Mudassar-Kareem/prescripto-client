import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import "./index.css"
import { Provider } from 'react-redux';
import Store from './reduex/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
)
