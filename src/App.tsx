

import { RouterProvider } from "react-router-dom";
import './index.css';
import { CookiesProvider } from "react-cookie";
import { Provider } from 'react-redux';
import store from './redux/store';
import router from "./route";





function App() {


  return (
    <>
      <CookiesProvider>
        <Provider store={store}>

          <RouterProvider router={router} />
        </Provider>

      </CookiesProvider>

    </>
  )
}

export default App


