"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCreatorImpl = exports.getConfigExpiry = void 0;
const auth_token_1 = require("../../domain/auth-token");
const moment_1 = __importDefault(require("moment"));
/**
 * Get the expiry minutes for a particular token type
 * @param expiryConfig
 * @param type
 */
function getConfigExpiry(expiryConfig, type) {
    switch (type) {
        case auth_token_1.TokenType.AccessToken:
            return expiryConfig.accessExpiry;
        case auth_token_1.TokenType.PasswordResetToken:
            return expiryConfig.passwordResetExpiry;
        case auth_token_1.TokenType.RefreshToken:
            return expiryConfig.refreshExpiry;
        case auth_token_1.TokenType.VerifyUser:
            return expiryConfig.verifyExpiry;
        default:
            return 0;
    }
}
exports.getConfigExpiry = getConfigExpiry;
/**
 * Token creator implementation
 */
class TokenCreatorImpl {
    /**
     * Construct the token creator
     *
     * @param secureHash
     * @param randomStringGenerator
     * @param dateProvider
     * @param tokenInputLength
     */
    constructor(tokenKeyCreator, secureHash, randomStringGenerator, dateProvider, tokenInputLength, expiry) {
        this._tokenKeyCreator = tokenKeyCreator;
        this._secureHash = secureHash;
        this._randomStringGenerator = randomStringGenerator;
        this._dateProvider = dateProvider;
        this._tokenInputLength = tokenInputLength;
        this._expiry = expiry;
    }
    createVerifyToken(user) {
        const created = this._dateProvider.getDateTime();
        const expiry = this._getExpiry(created, this._expiry.verifyExpiry);
        return this._createToken(user, auth_token_1.TokenType.VerifyUser, created, expiry);
    }
    createPasswordResetToken(user) {
        const created = this._dateProvider.getDateTime();
        const expiry = this._getExpiry(created, this._expiry.passwordResetExpiry);
        return this._createToken(user, auth_token_1.TokenType.PasswordResetToken, created, expiry);
    }
    createAccessToken(user) {
        const created = this._dateProvider.getDateTime();
        const expiry = this._getExpiry(created, this._expiry.accessExpiry);
        return this._createToken(user, auth_token_1.TokenType.AccessToken, created, expiry);
    }
    createRefreshToken(user) {
        const created = this._dateProvider.getDateTime();
        const expiry = this._getExpiry(created, this._expiry.refreshExpiry);
        return this._createToken(user, auth_token_1.TokenType.RefreshToken, created, expiry);
    }
    async updateRefreshToken(currentToken) {
        const expiry = this._getExpiry(this._dateProvider.getDateTime(), this._expiry.refreshExpiry);
        const plainToken = await this._randomStringGenerator.generateRandom(this._tokenInputLength);
        const encryptedToken = await this._secureHash.createHash(plainToken);
        return Object.assign(Object.assign({}, currentToken), { expiry,
            plainToken,
            encryptedToken });
    }
    _getExpiry(from, minutes) {
        return (0, moment_1.default)(from)
            .add(minutes, 'minute')
            .toDate();
    }
    async _createToken(user, tokenType, created, expiry) {
        const key = await this._tokenKeyCreator.createKey(user);
        const plainToken = await this._randomStringGenerator.generateRandom(this._tokenInputLength);
        const encryptedToken = await this._secureHash.createHash(plainToken);
        return {
            tokenType,
            key,
            plainToken,
            encryptedToken,
            principal: user,
            created,
            expiry,
        };
    }
}
exports.TokenCreatorImpl = TokenCreatorImpl;
