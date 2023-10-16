export * from './context';
export * from './reducer';
export { getAuthStateFromLS } from './jwt';

export interface UserInfo {
    isAdmin: boolean,
    nickname: string,
    username: string,
    avatarHash: string,
    userID: string,
    exp: number,
    iat: number,
}

export type AuthState = {
    jwt: string,
    userInfo: UserInfo,
    isExpired: boolean
} | undefined

export function isValid(authState: AuthState): boolean {
    return authState !== undefined && !authState.isExpired;
}

export function isAdmin(authState: AuthState): boolean {
    // authState is guaranteed to be defined after isValid
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return isValid(authState) && authState!.userInfo.isAdmin;
}
