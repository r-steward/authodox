"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerifyUserAuthClaim = exports.createPasswordResetAuthClaim = exports.createRefreshAccessTokenAuthClaim = exports.createAccessTokenAuthClaim = exports.createPasswordAuthClaim = exports.AuthClaimType = void 0;
/**
 * Types of authentication claim
 */
var AuthClaimType;
(function (AuthClaimType) {
    AuthClaimType[AuthClaimType["PASSWORD"] = 0] = "PASSWORD";
    AuthClaimType[AuthClaimType["ACCESS_TOKEN"] = 1] = "ACCESS_TOKEN";
    AuthClaimType[AuthClaimType["REFRESH_TOKEN"] = 2] = "REFRESH_TOKEN";
    AuthClaimType[AuthClaimType["VERIFY_USER"] = 3] = "VERIFY_USER";
    AuthClaimType[AuthClaimType["PASSWORD_RESET"] = 4] = "PASSWORD_RESET";
})(AuthClaimType || (exports.AuthClaimType = AuthClaimType = {}));
/**
 * Convenience create method
 * @param user
 * @param password
 */
const createPasswordAuthClaim = (user, password) => ({
    claimType: AuthClaimType.PASSWORD,
    user,
    password,
});
exports.createPasswordAuthClaim = createPasswordAuthClaim;
/**
 * Convenience create method
 * @param accessToken
 */
const createAccessTokenAuthClaim = (accessToken) => ({
    claimType: AuthClaimType.ACCESS_TOKEN,
    accessToken,
});
exports.createAccessTokenAuthClaim = createAccessTokenAuthClaim;
/**
 * Convenience create method
 * @param refreshToken
 */
const createRefreshAccessTokenAuthClaim = (refreshToken) => ({
    claimType: AuthClaimType.REFRESH_TOKEN,
    refreshToken,
});
exports.createRefreshAccessTokenAuthClaim = createRefreshAccessTokenAuthClaim;
/**
 * Convenience create method
 * @param user
 * @param resetToken
 */
const createPasswordResetAuthClaim = (resetToken) => ({
    claimType: AuthClaimType.PASSWORD_RESET,
    resetToken,
});
exports.createPasswordResetAuthClaim = createPasswordResetAuthClaim;
/**
 * Convenience create method
 * @param user
 * @param verifyToken
 */
const createVerifyUserAuthClaim = (verifyToken) => ({
    claimType: AuthClaimType.VERIFY_USER,
    verifyToken,
});
exports.createVerifyUserAuthClaim = createVerifyUserAuthClaim;
