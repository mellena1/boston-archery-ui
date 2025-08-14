import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useTitle } from "react-use";

import "./App.css";
import { ProtectedRoute } from "@/components/protected-route";
import { Toaster } from "@/components/ui/sonner";
import { useAuthToken } from "@/hooks/auth";
import { AdminLayout, AdminSeasonsPage, AdminTeamsPage } from "@/pages/admin";
import { HomePage } from "@/pages/home";
import { Layout } from "@/pages/layout";
import { LoginPage } from "@/pages/login";
import { AuthContext } from "@/state/auth";

function App() {
  const [authState, authDispatch] = useAuthToken();
  const queryClient = new QueryClient();
  useTitle("Boston AG League");

  useEffect(() => {
    document.body.classList.add("dark:bg-zinc-950", "dark:text-gray-300");
  });

  return (
    <>
      <Toaster />
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
                <Route index element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
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
                    <Route path="seasons" element={<AdminSeasonsPage />} />
                    <Route path="teams" element={<AdminTeamsPage />} />
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<p>There is nothing here: 404!</p>} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
