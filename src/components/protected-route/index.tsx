import { useContext, useEffect, PropsWithChildren } from "react";
import { AuthContext, AuthState, UserInfo, isValid } from "@state/auth";
import { Outlet, useNavigate } from "react-router-dom";

type isAllowedFunc = (info: UserInfo) => boolean

export type ProtectedRouteProps = {
    isAllowed: isAllowedFunc,
    redirectPath?: string,
} & PropsWithChildren

export function ProtectedRoute({ isAllowed, redirectPath = '/', children }: ProtectedRouteProps) {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const willRedirect = shouldRedirect(authState, isAllowed);

    useEffect(() => {
        if (willRedirect) {
            navigate(redirectPath);
        }
    }, [navigate, willRedirect, redirectPath]);

    if (willRedirect) {
        return null;
    }

    return children ? children : <Outlet />;
}

function shouldRedirect(authState: AuthState, isAllowed: isAllowedFunc): boolean {
    // authState is guaranteed to be defined after isValid
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return !isValid(authState) || !isAllowed(authState!.userInfo);
}
