import { AuthState } from ".";
import { authStateFromJWT, setAuthTokenToLS } from "./jwt";

export enum AuthActionTypes {
    UPDATE,
    DELETE
}

export interface AuthAction {
    type: AuthActionTypes,
    jwt?: string
}

export function AuthReducer(_: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.UPDATE:
            setAuthTokenToLS(action.jwt);
            return authStateFromJWT(action.jwt);
        case AuthActionTypes.DELETE:
            setAuthTokenToLS(undefined);
            return undefined;
    }
}
