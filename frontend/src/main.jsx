import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
)
