"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionContextToken = exports.getActionContextPrincipal = exports.getUserContextPrincipal = exports.getAuthorizationHeader = exports.createBodyGetter = exports.createParameterGetter = exports.sendResult = void 0;
const security_context_1 = require("../domain/security-context");
/**
 * Sends a 200 response with the result of the request functor
 * @param f
 */
function sendResult(f) {
    return async (request, response) => {
        const result = await f(request);
        response.status(200).json(result);
    };
}
exports.sendResult = sendResult;
function createParameterGetter(p) {
    return r => r.params[p];
}
exports.createParameterGetter = createParameterGetter;
function createBodyGetter(p) {
    return r => r.body[p];
}
exports.createBodyGetter = createBodyGetter;
function getAuthorizationHeader(r) {
    return r.headers.authorization;
}
exports.getAuthorizationHeader = getAuthorizationHeader;
//#endregion
//#region  --- Security Context Helpers
function getUserContextPrincipal(r, ex) {
    const context = r.securityContext;
    if (!context.isAuthenticated || context.contextType !== security_context_1.SecurityContextType.User || context.principal == null) {
        ex.throwInternalServer();
    }
    return context.principal;
}
exports.getUserContextPrincipal = getUserContextPrincipal;
function getActionContextPrincipal(r, ex) {
    const context = r.securityContext;
    if (!context.isAuthenticated ||
        context.contextType !== security_context_1.SecurityContextType.Action ||
        context.authToken == null ||
        context.authToken.principal == null) {
        ex.throwInternalServer();
    }
    return context.authToken.principal;
}
exports.getActionContextPrincipal = getActionContextPrincipal;
function getActionContextToken(r, ex) {
    const context = r.securityContext;
    if (!context.isAuthenticated ||
        context.contextType !== security_context_1.SecurityContextType.Action ||
        context.authToken == null ||
        context.authToken.principal == null) {
        ex.throwInternalServer();
    }
    return context.authToken;
}
exports.getActionContextToken = getActionContextToken;
//#endregion
