import { createContext } from "react";

import { type AuthAction } from "./reducer";
import { type AuthState } from "./state";

export const AuthContext = createContext<{
  authState: AuthState;
  setAuth: React.Dispatch<AuthAction>;
}>({
  authState: undefined,
  setAuth: (_) => {},
});
