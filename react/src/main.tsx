import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { store } from './redux/store'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppBarComponent from './components/AppBarComponent'
import EditComponenent from './components/EditComponenent'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/edit/:productId",
    element: <EditComponenent />,
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppBarComponent />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
