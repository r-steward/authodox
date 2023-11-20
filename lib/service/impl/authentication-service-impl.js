"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationServiceImpl = void 0;
const security_context_1 = require("../../domain/security-context");
const util_1 = require("../util");
const action_message_1 = require("../../domain/action-message");
const util_2 = require("../../dao/util");
/**
 * Implementation of authentication service
 */
class AuthenticationServiceImpl {
    constructor(userAuthenticator, tokenAuthenticator, tokenCreator, tokenEncoder, tokenDao, principalDao, secureHash, actionMessageService) {
        // null checks
        if (userAuthenticator == null)
            throw new Error('Undefined userAuthenticator');
        if (tokenAuthenticator == null)
            throw new Error('Undefined tokenAuthenticator');
        if (tokenCreator == null)
            throw new Error('Undefined tokenCreator');
        if (tokenEncoder == null)
            throw new Error('Undefined tokenEncoder');
        if (tokenDao == null)
            throw new Error('Undefined tokenDao');
        if (principalDao == null)
            throw new Error('Undefined principalDao');
        if (secureHash == null)
            throw new Error('Undefined secureHash');
        if (actionMessageService == null)
            throw new Error('Undefined actionMessageService');
        // set members
        this._userAuthenticator = userAuthenticator;
        this._tokenAuthenticator = tokenAuthenticator;
        this._tokenCreator = tokenCreator;
        this._tokenEncoder = tokenEncoder;
        this._tokenDao = tokenDao;
        this._principalDao = principalDao;
        this._secureHash = secureHash;
        this._actionMessageService = actionMessageService;
    }
    async authenticateVerifyClaim(claim) {
        // authenticate user claim
        const result = await this._tokenAuthenticator.authenticateVerifyToken(claim);
        // return security context
        return {
            contextType: security_context_1.SecurityContextType.Action,
            isAuthenticated: result.isAuthenticated,
            errorMessage: result.errorMessage,
            authClaim: claim,
            authToken: result.authToken,
        };
    }
    async authenticatePasswordClaim(claim) {
        // authenticate user claim
        const result = await this._userAuthenticator.authenticateUser(claim);
        // return security context
        return {
            contextType: security_context_1.SecurityContextType.User,
            isAuthenticated: result.isAuthenticated,
            principal: result.principal,
            errorMessage: result.errorMessage,
            authClaim: claim,
        };
    }
    async authenticateAccessTokenClaim(claim) {
        // authenticate token claim
        const result = await this._tokenAuthenticator.authenticateAccessToken(claim);
        // return security context
        return {
            contextType: security_context_1.SecurityContextType.User,
            isAuthenticated: result.isAuthenticated,
            principal: result.principal,
            errorMessage: result.errorMessage,
            authClaim: claim,
        };
    }
    async authenticateTokenRefreshClaim(claim) {
        // authenticate token claim
        const result = await this._tokenAuthenticator.authenticateRefreshToken(claim);
        // return security context
        return {
            contextType: security_context_1.SecurityContextType.Action,
            isAuthenticated: result.isAuthenticated,
            errorMessage: result.errorMessage,
            authClaim: claim,
            authToken: result.authToken,
        };
    }
    async authenticatePasswordResetClaim(claim) {
        // authenticate token claim
        const result = await this._tokenAuthenticator.authenticatePasswordResetToken(claim);
        // return security context
        return {
            contextType: security_context_1.SecurityContextType.Action,
            isAuthenticated: result.isAuthenticated,
            errorMessage: result.errorMessage,
            authClaim: claim,
            authToken: result.authToken,
        };
    }
    async createAccessToken(principal) {
        // first create a refresh token for this user
        const refreshToken = await this._saveToken(await this._tokenCreator.createRefreshToken(principal));
        // then create associated access token
        const accessToken = await this._saveToken(this._addAssociatedKey(await this._tokenCreator.createAccessToken(principal), refreshToken.key));
        // encode and return
        return {
            accessToken: this._tokenEncoder.encode((0, util_1.getTokenInfo)(accessToken)),
            refreshToken: this._tokenEncoder.encode((0, util_1.getTokenInfo)(refreshToken)),
        };
    }
    async refreshAccessToken(refreshToken) {
        // update the refresh token
        const newRefreshToken = await this._saveToken(await this._tokenCreator.updateRefreshToken(refreshToken), true);
        // then create associated access token
        const accessToken = await this._saveToken(this._addAssociatedKey(await this._tokenCreator.createAccessToken(refreshToken.principal), newRefreshToken.key));
        return {
            accessToken: this._tokenEncoder.encode((0, util_1.getTokenInfo)(accessToken)),
            refreshToken: this._tokenEncoder.encode((0, util_1.getTokenInfo)(newRefreshToken)),
        };
    }
    async revokeRefreshToken(refreshToken) {
        await this._tokenDao.deleteTokens((0, util_2.createTokenSearchCriteriaSingleToken)(refreshToken));
        return true;
    }
    async createUserAndSendVerificationMessage(registerRequest) {
        // set the encrypted password
        const principal = registerRequest.newPrincipal;
        principal.isVerified = false;
        principal.encryptedPassword = await this._secureHash.createHash(registerRequest.password);
        // save the principal
        const savedPrincipal = await this._principalDao.savePrincipal(principal);
        // create new token
        const verifyToken = await this._saveToken(await this._tokenCreator.createVerifyToken(savedPrincipal));
        // encode
        const encodedToken = this._tokenEncoder.encode((0, util_1.getTokenInfo)(verifyToken));
        // send action message
        const action = {
            principal: savedPrincipal,
            actionType: action_message_1.ActionType.Verify,
            actionToken: encodedToken,
        };
        const response = await this._actionMessageService.sendActionMessage(action);
        // return response
        return {
            isSuccess: response.isSuccess,
            message: response.errorMessage,
            encodedToken,
        };
    }
    async requestResetPassword(resetRequest) {
        // get user
        const principal = await this._principalDao.getPrincipal(resetRequest.username);
        if (principal != null) {
            // create and persist new token
            const token = await this._saveToken(await this._tokenCreator.createPasswordResetToken(principal));
            // encode and return
            const encodedToken = this._tokenEncoder.encode((0, util_1.getTokenInfo)(token));
            // send action message
            const action = {
                actionType: action_message_1.ActionType.PasswordReset,
                actionToken: encodedToken,
                principal,
            };
            const response = await this._actionMessageService.sendActionMessage(action);
            // return response
            return {
                success: true,
                origin: resetRequest.origin,
                principal,
                encodedToken,
            };
        }
        return {
            success: false,
            origin: resetRequest.origin,
            principal: null,
            encodedToken: null,
        };
    }
    async resetPassword(principal, newPassword) {
        principal.encryptedPassword = await this._secureHash.createHash(newPassword);
        // save the principal
        this._principalDao.updatePrincipal(principal);
        // return success
        return true;
    }
    /**
     * Set verified flag to true and save user
     * @param principal
     */
    async verifyUser(principal) {
        var _a;
        principal.isVerified = true;
        const saved = await this._principalDao.updatePrincipal(principal);
        return (_a = saved.isVerified) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Add an associated key to an existing token
     * @param token
     * @param associatedKey
     */
    _addAssociatedKey(token, associatedKey) {
        return Object.assign(Object.assign({}, token), { associatedKey });
    }
    /**
     * Save secure part of the token
     * return the auth token (with any values updated by the save action e.g. key)
     * @param token auth token
     */
    async _saveToken(token, isUpdate = false) {
        // remove plain token from object to be saved
        const toSave = Object.assign({}, token);
        delete toSave.plainToken;
        // persist
        const secureToken = isUpdate
            ? await this._tokenDao.updateToken(toSave)
            : await this._tokenDao.saveToken(toSave);
        // merge token, as the key may only be set on persistence
        return Object.assign(Object.assign({}, token), secureToken);
    }
    /**
     * Delete tokens for a user
     * @param principal
     */
    async _deleteUserTokens(principal, tokenType) {
        return this._tokenDao.deleteTokens((0, util_2.createTokenSearchCriteriaByTypeAndUser)(principal.username, tokenType));
    }
}
exports.AuthenticationServiceImpl = AuthenticationServiceImpl;
