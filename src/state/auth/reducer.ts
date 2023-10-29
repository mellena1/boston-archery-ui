import { AuthState } from ".";
import { authStateFromJWT } from "./jwt";

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
            return authStateFromJWT(action.jwt);
        case AuthActionTypes.DELETE:
            return undefined;
    }
}
