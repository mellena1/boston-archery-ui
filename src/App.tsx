import './App.css';
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './pages/layout';
import { Home } from './pages/home';
import { useEffect, useReducer } from 'react';
import { AuthContext, AuthReducer, getAuthStateFromLS } from './state';
import { Login } from './pages/login';

function App() {
  const [authState, authDispatch] = useReducer(AuthReducer, getAuthStateFromLS());

  useEffect(() => {
    document.title = 'Boston AG League';
    document.body.classList.add('dark:bg-zinc-950', 'dark:text-gray-300');
  });

  const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        yellow: 'bg-yellow-300 text-black enabled:hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300'
      }
    },
    dropdown: {
      floating: {
        divider: 'my-1 h-px bg-zinc-300 dark:bg-gray-600',
        style: {
          auto: 'bg-zinc-100 dark:bg-zinc-800 dark:text-white',
        }
      }
    },
  };

  return (
    <Flowbite theme={ { theme: customTheme } }>
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
