import { useContext } from "react";

import { LoginButton } from "./LoginButton";
import { SignedIn } from "./SignedIn";
import { AuthContext, isValid } from "@/state/auth";

export function Login() {
  const { authState } = useContext(AuthContext);

  return <>{isValid(authState) ? <SignedIn /> : <LoginButton />}</>;
}
