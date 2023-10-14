import { useContext } from "react";
import { AuthContext, AuthState } from "../../../state";
import { LoginButton } from "./loginbutton";
import { SignedIn } from "./signedin";

export function Login() {
    const { authState } = useContext(AuthContext);

    return (
        <>
            {isLoggedIn(authState) ? <SignedIn /> : <LoginButton /> }
        </>
    );
}

function isLoggedIn(authState: AuthState): boolean {
    if (authState?.isExpired === undefined) {
        return false;
    }
    return !authState.isExpired;
}
