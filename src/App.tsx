import './App.css';
import { Flowbite } from 'flowbite-react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './pages/layout';
import { Home } from './pages/home';
import { useReducer } from 'react';
import { AuthContext, AuthReducer, getAuthStateFromLS } from './state';
import { Login } from './pages/login';

function App() {
  const [authState, authDispatch] = useReducer(AuthReducer, getAuthStateFromLS());

  return (
    <Flowbite>
      <AuthContext.Provider value={{
        authState, setAuth: authDispatch
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </Flowbite>
  );
}

export default App;
