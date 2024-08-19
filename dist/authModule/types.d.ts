export type AuthObject = {
    authId: string;
    fullName: string;
    email: string;
};
export type SignInObject = {
    authId: string;
    email: string;
    isAdmin: boolean;
    fullName: string;
};
export interface JwtPayload {
    authId: string;
    fullName: string;
    email: string;
    isAdmin: boolean;
}
