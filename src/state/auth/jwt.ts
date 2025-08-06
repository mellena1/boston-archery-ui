import { jwtDecode } from "jwt-decode";

import { type AuthState, type UserInfo } from "./state";

export function authStateFromJWT(jwt?: string): AuthState {
  if (jwt === undefined) {
    return undefined;
  }

  try {
    const userInfo = parseJWT(jwt);
    return { jwt, userInfo: userInfo, isExpired: checkIfExpired(userInfo) };
  } catch (e) {
    console.error("failed to parse jwt", e);
    return undefined;
  }
}

function parseJWT(jwt: string): UserInfo {
  return jwtDecode<UserInfo>(jwt);
}

function checkIfExpired(userInfo: UserInfo): boolean {
  const now = Date.now() / 1000;

  return userInfo.exp < now;
}
