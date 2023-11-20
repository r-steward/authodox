"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHandlerImpl = void 0;
const auth_claim_1 = require("../domain/auth-claim");
const validation_handlers_1 = require("./validation-handlers");
const request_util_1 = require("./request-util");
/**
 * Handler implementation
 */
class AuthHandlerImpl {
    constructor(service, ex) {
        this.service = service;
        this.ex = ex;
        this.authenticatePasswordClaim = async (req, _, next) => {
            // authenticate
            const claim = (0, auth_claim_1.createPasswordAuthClaim)((0, validation_handlers_1.UsernameGetter)(req), (0, validation_handlers_1.PasswordGetter)(req));
            req.securityContext = await this.service.authenticatePasswordClaim(claim);
            // advance if authenticated
            if (!throwIfNotAuthenticated(req, this.ex)) {
                next();
            }
        };
        this.authenticateAccessTokenClaim = async (req, _, next) => {
            // authenticate
            const claim = (0, auth_claim_1.createAccessTokenAuthClaim)((0, request_util_1.getAuthorizationHeader)(req));
            req.securityContext = await this.service.authenticateAccessTokenClaim(claim);
            // advance
            if (!throwIfNotAuthenticated(req, this.ex)) {
                next();
            }
        };
        this.authenticatePasswordResetClaim = async (req, _, next) => {
            // authenticate
            const claim = (0, auth_claim_1.createPasswordResetAuthClaim)((0, request_util_1.getAuthorizationHeader)(req));
            req.securityContext = await this.service.authenticatePasswordResetClaim(claim);
            // advance
            if (!throwIfNotAuthenticated(req, this.ex)) {
                next();
            }
        };
        this.authenticateTokenRefreshClaim = async (req, _, next) => {
            // authenticate
            const claim = (0, auth_claim_1.createRefreshAccessTokenAuthClaim)((0, request_util_1.getAuthorizationHeader)(req));
            req.securityContext = await this.service.authenticateTokenRefreshClaim(claim);
            // advance
            if (!throwIfNotAuthenticated(req, this.ex)) {
                next();
            }
        };
        this.authenticateVerifyClaim = async (req, _, next) => {
            // authenticate
            const claim = (0, auth_claim_1.createVerifyUserAuthClaim)((0, request_util_1.getAuthorizationHeader)(req));
            req.securityContext = await this.service.authenticateVerifyClaim(claim);
            // advance
            if (!throwIfNotAuthenticated(req, this.ex)) {
                next();
            }
        };
    }
}
exports.AuthHandlerImpl = AuthHandlerImpl;
function throwIfNotAuthenticated(req, ex) {
    return !(req.securityContext.isAuthenticated || ex.throwUnauthenticated());
}
