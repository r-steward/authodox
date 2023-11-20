"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthenticationRoutes = void 0;
const express_interface_1 = require("./express-interface");
const Util = __importStar(require("./request-util"));
/**
 * Create the authentication routes for the express server
 * @param routeAdapter
 * @param authHandlers
 * @param validationHandlers
 * @param c controller
 */
const createAuthenticationRoutes = (routeAdapter, authHandlers, validationHandlers, c) => {
    return [
        {
            path: routeAdapter('/auth/register'),
            method: express_interface_1.ApiMethod.POST,
            handler: [
                // no auth required for this action, but verify body values
                validationHandlers.validateInitialUsernameAndPassword,
                // perform action
                Util.sendResult(r => c.registerUser(r)),
            ],
        },
        {
            path: routeAdapter('/auth/verify'),
            method: express_interface_1.ApiMethod.POST,
            handler: [
                // authenticate the verification claim
                authHandlers.authenticateVerifyClaim,
                // perform action
                Util.sendResult(r => c.verifyUser(r)),
            ],
        },
        {
            path: routeAdapter('/auth/login'),
            method: express_interface_1.ApiMethod.POST,
            handler: [
                // authenticate the login claim
                authHandlers.authenticatePasswordClaim,
                // perform action
                Util.sendResult(r => c.logIn(r)),
            ],
        },
        {
            path: routeAdapter('/auth/user'),
            method: express_interface_1.ApiMethod.GET,
            handler: [
                // authenticate the login claim
                authHandlers.authenticateAccessTokenClaim,
                // perform action
                Util.sendResult(r => c.getAuthenticatedUser(r)),
            ],
        },
        {
            path: routeAdapter('/auth/logout'),
            method: express_interface_1.ApiMethod.POST,
            handler: [
                // authenticate the login claim
                authHandlers.authenticateTokenRefreshClaim,
                // perform action
                Util.sendResult(r => c.logOut(r)),
            ],
        },
        {
            path: routeAdapter('/auth/refresh'),
            method: express_interface_1.ApiMethod.POST,
            handler: [
                // authenticate the login claim
                authHandlers.authenticateTokenRefreshClaim,
                // perform action
                Util.sendResult(r => c.refreshToken(r)),
            ],
        },
        {
            path: routeAdapter('/auth/request-reset'),
            method: express_interface_1.ApiMethod.POST,
            handler: [
                // no authentication required for this action, but validate the username
                validationHandlers.validateUsername,
                // perform action
                Util.sendResult(r => c.requestPasswordReset(r)),
            ],
        },
        {
            path: routeAdapter('/auth/perform-reset'),
            method: express_interface_1.ApiMethod.POST,
            handler: [
                // authenticate the claim
                authHandlers.authenticatePasswordResetClaim,
                // validate the password
                validationHandlers.validatePassword,
                // perform action
                Util.sendResult(r => c.performPasswordReset(r)),
            ],
        },
    ];
};
exports.createAuthenticationRoutes = createAuthenticationRoutes;
