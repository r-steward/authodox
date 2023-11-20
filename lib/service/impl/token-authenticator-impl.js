"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAuthenticatorImpl = void 0;
const fourspace_logger_ts_1 = require("fourspace-logger-ts");
const auth_token_1 = require("../../domain/auth-token");
const util_1 = require("../util");
const logger = fourspace_logger_ts_1.LogFactory.getLogger('TokenAuthenticatorImpl');
/**
 * Authenticate users with a secure token
 */
class TokenAuthenticatorImpl {
    constructor(tokenEncoder, tokenDao, secureHash, expiryChecker) {
        this._tokenEncoder = tokenEncoder;
        this._tokenDao = tokenDao;
        this._secureHash = secureHash;
        this._expiryChecker = expiryChecker;
    }
    async authenticateVerifyToken(claim) {
        const token = claim.verifyToken;
        return this._authToken(token, auth_token_1.TokenType.VerifyUser);
    }
    async authenticateRefreshToken(claim) {
        const token = claim.refreshToken;
        return this._authToken(token, auth_token_1.TokenType.RefreshToken);
    }
    async authenticateAccessToken(claim) {
        const token = claim.accessToken;
        return this._authToken(token, auth_token_1.TokenType.AccessToken);
    }
    async authenticatePasswordResetToken(claim) {
        const token = claim.resetToken;
        return this._authToken(token, auth_token_1.TokenType.PasswordResetToken);
    }
    async _authToken(encodedToken, tokenType) {
        // decode the token and look up via the key
        const tokenInfo = this._tokenEncoder.decode(encodedToken);
        const authToken = await this._tokenDao.getToken(tokenInfo.tokenKey);
        // if token found and types match, then verify the hash
        if (authToken != null &&
            authToken.tokenType === tokenType &&
            this._expiryChecker.isValid(authToken.expiry) &&
            (await this._secureHash.verifyHash(tokenInfo.tokenValue, authToken.encryptedToken))) {
            if (logger.isDebugEnabled()) {
                logger.debug(`Authentication successful for ${tokenInfo.tokenKey} ${tokenInfo.tokenValue}`);
            }
            return {
                isAuthenticated: true,
                principal: authToken.principal,
                authToken,
            };
        }
        return (0, util_1.createFailTokenResult)('Failed');
    }
}
exports.TokenAuthenticatorImpl = TokenAuthenticatorImpl;
