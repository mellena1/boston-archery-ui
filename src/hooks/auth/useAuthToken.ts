import { useEffect, useReducer } from "react";

import { useLocalStorage } from "react-use";

import { type AuthAction, AuthReducer, type AuthState } from "@/state/auth";
import { authStateFromJWT } from "@/state/auth/jwt";

const AUTH_TOKEN_LS_KEY = "authToken";

export function useAuthToken(): [AuthState, React.Dispatch<AuthAction>] {
  const [jwtLS, setJWTLS, removeJWTLS] = useLocalStorage<string | undefined>(
    AUTH_TOKEN_LS_KEY,
    undefined,
    { raw: true },
  );
  const [authState, authDispatch] = useReducer(
    AuthReducer,
    authStateFromJWT(jwtLS),
  );

  useEffect(() => {
    if (authState) {
      setJWTLS(authState.jwt);
      return;
    }

    removeJWTLS();
  }, [authState, setJWTLS, removeJWTLS]);

  return [authState, authDispatch];
}
