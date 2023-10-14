import jwtDecode from "jwt-decode";

export interface UserInfo {
    isAdmin: boolean,
    nickname: string,
    exp: number,
    iat: number,
}

export type AuthState = {
    jwt?: string,
    userInfo?: UserInfo,
    isExpired?: boolean
} | undefined

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
            return {};
    }
}

function authStateFromJWT(jwt?: string): AuthState {
    const userInfo = parseJWT(jwt);
    return { jwt, userInfo: userInfo, isExpired: checkIfExpired(userInfo) };
}

function parseJWT(jwt?: string): UserInfo | undefined {
    if (!jwt) {
        return undefined;
    }
    return jwtDecode<UserInfo>(jwt);
}

function checkIfExpired(userInfo?: UserInfo): boolean | undefined {
    if (userInfo?.exp === undefined) {
        return undefined;
    }

    const now = Date.now() / 1000;

    return userInfo.exp < now;
}

const AUTH_TOKEN_LS_KEY = 'authToken';

export function getAuthStateFromLS(): AuthState {
    const jwt = localStorage.getItem(AUTH_TOKEN_LS_KEY) ?? undefined;

    return authStateFromJWT(jwt);
}

function setAuthTokenToLS(token?: string) {
    localStorage.setItem(AUTH_TOKEN_LS_KEY, token ?? '');
}
