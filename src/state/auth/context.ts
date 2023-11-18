import { createContext } from "react";

import { AuthAction, AuthState } from ".";

export const AuthContext = createContext<{
  authState: AuthState;
  setAuth: React.Dispatch<AuthAction>;
}>({
  authState: undefined,
  setAuth: (_) => {},
});
