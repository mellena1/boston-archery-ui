import { useEffect } from "react";

import { type CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useTitle } from "react-use";

import "./App.css";
import { ProtectedRoute } from "@/components/protected-route";
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

  const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        info: "bg-emerald-900 text-white enabled:hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-700 dark:bg-yellow-300 dark:text-black dark:enabled:hover:bg-yellow-100 dark:focus:ring-4 dark:focus:ring-yellow-300",
        yellow:
          "bg-yellow-300 text-black enabled:hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300",
      },
    },
    datepicker: {
      popup: {
        root: {
          inner:
            "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-emerald-900",
        },
        header: {
          selectors: {
            button: {
              base: "text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:text-gray-900 dark:bg-yellow-300 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch",
            },
          },
        },
        footer: {
          button: {
            today:
              "bg-emerald-900 text-white hover:bg-emerald-700 dark:text-gray-900 dark:bg-yellow-300 dark:hover:bg-yellow-500",
          },
        },
      },
      views: {
        days: {
          items: {
            item: {
              base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:text-white hover:bg-emerald-700 dark:text-white dark:hover:bg-yellow-500",
              selected:
                "bg-emerald-900 text-white hover:bg-emerald-700 dark:bg-yellow-300 dark:text-gray-900 dark:hover:bg-yellow-500",
            },
          },
        },
        months: {
          items: {
            item: {
              base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:text-white hover:bg-emerald-700 dark:text-white dark:hover:bg-yellow-500",
              selected:
                "bg-emerald-900 text-white hover:bg-emerald-700 dark:bg-yellow-300 dark:text-gray-900 dark:hover:bg-yellow-500",
            },
          },
        },
        years: {
          items: {
            item: {
              base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:text-white hover:bg-emerald-700 dark:text-white dark:hover:bg-yellow-500",
              selected:
                "bg-emerald-900 text-white hover:bg-emerald-700 dark:bg-yellow-300 dark:text-gray-900 dark:hover:bg-yellow-500",
            },
          },
        },
        decades: {
          items: {
            item: {
              base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:text-white hover:bg-emerald-700 dark:text-white dark:hover:bg-yellow-500",
              selected:
                "bg-emerald-900 text-white hover:bg-emerald-700 dark:bg-yellow-300 dark:text-gray-900 dark:hover:bg-yellow-500",
            },
          },
        },
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
    textInput: {
      field: {
        input: {
          colors: {
            gray: "border-emerald-900 focus:border-emerald-900 focus:ring-emerald-900 dark:bg-emerald-900 dark:focus:border-yellow-300 dark:focus:ring-yellow-300",
          },
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
    tabs: {
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
    </Flowbite>
  );
}

export default App;
