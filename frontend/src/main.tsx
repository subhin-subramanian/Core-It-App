import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'

const rootElement = document.getElementById('root') as HTMLElement;

if(!rootElement) {
  throw new Error("Root element not found");
}
createRoot(rootElement).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
)
