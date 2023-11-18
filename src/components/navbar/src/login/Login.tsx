import { useContext } from "react";

import { AuthContext, isValid } from "@state/auth";

import { LoginButton } from "./LoginButton";
import { SignedIn } from "./SignedIn";

export function Login() {
  const { authState } = useContext(AuthContext);

  return <>{isValid(authState) ? <SignedIn /> : <LoginButton />}</>;
}
