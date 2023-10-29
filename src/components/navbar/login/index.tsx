import { useContext } from "react";
import { AuthContext, isValid } from "@state/auth";
import { LoginButton } from "./loginbutton";
import { SignedIn } from "./signedin";

export function Login() {
  const { authState } = useContext(AuthContext);

  return <>{isValid(authState) ? <SignedIn /> : <LoginButton />}</>;
}
