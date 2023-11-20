/**
 * Types of authentication claim
 */
export declare enum AuthClaimType {
    PASSWORD = 0,
    ACCESS_TOKEN = 1,
    REFRESH_TOKEN = 2,
    VERIFY_USER = 3,
    PASSWORD_RESET = 4
}
/**
 * User access claim with username and password
 */
export interface PasswordAuthClaim {
    readonly claimType: AuthClaimType.PASSWORD;
    readonly user: string;
    readonly password: string;
}
/**
 * User access claim with an access token
 */
export interface AccessTokenAuthClaim {
    readonly claimType: AuthClaimType.ACCESS_TOKEN;
    readonly accessToken: string;
}
/**
 * Claim for refreshing the access token with a refresh token
 */
export interface RefreshAccessTokenAuthClaim {
    readonly claimType: AuthClaimType.REFRESH_TOKEN;
    readonly refreshToken: string;
}
/**
 * Claim for resetting the password, with a reset token
 */
export interface PasswordResetAuthClaim {
    readonly claimType: AuthClaimType.PASSWORD_RESET;
    readonly resetToken: string;
}
/**
 * Claim for verifying a user with a verify token
 */
export interface VerifyUserAuthClaim {
    readonly claimType: AuthClaimType.VERIFY_USER;
    readonly verifyToken: string;
}
export type AuthClaim = PasswordAuthClaim | AccessTokenAuthClaim | RefreshAccessTokenAuthClaim | PasswordResetAuthClaim | VerifyUserAuthClaim;
/**
 * Convenience create method
 * @param user
 * @param password
 */
export declare const createPasswordAuthClaim: (user: string, password: string) => PasswordAuthClaim;
/**
 * Convenience create method
 * @param accessToken
 */
export declare const createAccessTokenAuthClaim: (accessToken: string) => AccessTokenAuthClaim;
/**
 * Convenience create method
 * @param refreshToken
 */
export declare const createRefreshAccessTokenAuthClaim: (refreshToken: string) => RefreshAccessTokenAuthClaim;
/**
 * Convenience create method
 * @param user
 * @param resetToken
 */
export declare const createPasswordResetAuthClaim: (resetToken: string) => PasswordResetAuthClaim;
/**
 * Convenience create method
 * @param user
 * @param verifyToken
 */
export declare const createVerifyUserAuthClaim: (verifyToken: string) => VerifyUserAuthClaim;
