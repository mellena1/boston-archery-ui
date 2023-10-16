import jwtDecode from "jwt-decode";
import { AuthState, UserInfo } from ".";

export function authStateFromJWT(jwt?: string): AuthState {
    if (jwt === undefined) {
        return undefined;
    }

    try {
        const userInfo = parseJWT(jwt);
        return { jwt, userInfo: userInfo, isExpired: checkIfExpired(userInfo) };
    } catch(Exception) {
        return undefined;
    }
}

export function parseJWT(jwt: string): UserInfo {
    return jwtDecode<UserInfo>(jwt);
}

export function checkIfExpired(userInfo: UserInfo): boolean {
    const now = Date.now() / 1000;

    return userInfo.exp < now;
}

const AUTH_TOKEN_LS_KEY = 'authToken';

export function getAuthStateFromLS(): AuthState {
    const jwt = localStorage.getItem(AUTH_TOKEN_LS_KEY) ?? undefined;

    return authStateFromJWT(jwt);
}

export function setAuthTokenToLS(token?: string) {
    if (!token) {
        localStorage.removeItem(AUTH_TOKEN_LS_KEY);
        return;
    }
    localStorage.setItem(AUTH_TOKEN_LS_KEY, token);
}
