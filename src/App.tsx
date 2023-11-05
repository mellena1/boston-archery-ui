import "./App.css";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@pages/layout";
import { Home } from "@pages/home";
import { useEffect } from "react";
import { AuthContext } from "@state/auth";
import { Login } from "@pages/login";
import { ProtectedRoute } from "@components/protected-route";
import { AdminLayout } from "@pages/admin";
import { useAuthToken } from "@hooks/auth";
import { AdminSeasons } from "@pages/admin/seasons";
import { useTitle } from "react-use";
import { AdminTeams } from "@pages/admin/teams";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const [authState, authDispatch] = useAuthToken();
  const queryClient = new QueryClient();
  useTitle("Boston AG League");

  useEffect(() => {
    document.body.classList.add("dark:bg-zinc-950", "dark:text-gray-300");
  });

  const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        yellow:
          "bg-yellow-300 text-black enabled:hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300",
      },
    },
    dropdown: {
      floating: {
        divider: "my-1 h-px bg-zinc-300 dark:bg-gray-600",
        style: {
          auto: "bg-zinc-100 dark:bg-zinc-800 dark:text-white",
        },
      },
    },
    select: {
      field: {
        select: {
          colors: {
            gray: "bg-white border-gray-300 focus:border-emerald-900 focus:ring-emerald-900 dark:bg-emerald-900 dark:border-gray-600 dark:text-white dark:focus:border-yellow-300 dark:focus:ring-yellow-300",
          },
        },
      },
    },
    tab: {
      tablist: {
        tabitem: {
          base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
          styles: {
            underline: {
              active: {
                on: "text-emerald-900 rounded-t-lg border-b-2 border-emerald-900 active dark:text-yellow-300 dark:border-yellow-300",
              },
            },
          },
        },
      },
    },
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{
            authState,
            setAuth: authDispatch,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute isAllowed={(info) => info.isAdmin} />
                  }
                >
                  <Route element={<AdminLayout />}>
                    <Route
                      index
                      element={<Navigate to="/admin/seasons" replace />}
                    />
                    <Route path="seasons" element={<AdminSeasons />} />
                    <Route path="teams" element={<AdminTeams />} />
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<p>There is nothing here: 404!</p>} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
    </Flowbite>
  );
}

export default App;
