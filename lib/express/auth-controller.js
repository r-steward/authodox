"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllerImpl = void 0;
const request_util_1 = require("./request-util");
const validation_handlers_1 = require("./validation-handlers");
/**
 * Implementation using the authentication service
 */
class AuthControllerImpl {
    constructor(authenticationService, requestUserMapper, exceptionService) {
        this._authenticationService = authenticationService;
        this._requestUserMapper = requestUserMapper;
        this._exceptionService = exceptionService;
    }
    async registerUser(r) {
        // validate the request body
        if (!(await this._requestUserMapper.validateNewUser(r.body))) {
            this._exceptionService.throwBadRequest('Invalid user');
        }
        // create the user
        const newPrincipal = this._requestUserMapper.createNewUser(r.body);
        const password = (0, validation_handlers_1.PasswordGetter)(r);
        //
        if (newPrincipal == null)
            this._exceptionService.throwBadRequest('Unable to register user');
        // register the user
        const response = await this._authenticationService.createUserAndSendVerificationMessage({
            newPrincipal,
            password,
        });
        return response.isSuccess;
    }
    async verifyUser(r) {
        // get the principal from the security context
        const principal = (0, request_util_1.getActionContextPrincipal)(r, this._exceptionService);
        // delete this token - verification can only happen once
        // verify the user
        const verify = await this._authenticationService.verifyUser(principal);
        return verify;
    }
    async logIn(r) {
        // get the principal from the security context
        const principal = (0, request_util_1.getUserContextPrincipal)(r, this._exceptionService);
        // create the tokens for this principal
        return this._authenticationService.createAccessToken(principal);
    }
    getAuthenticatedUser(r) {
        // get the principal from the security context
        const principal = (0, request_util_1.getUserContextPrincipal)(r, this._exceptionService);
        // map to the dto
        return this._requestUserMapper.mapToDto(principal);
    }
    refreshToken(r) {
        // get the refresh token from the security context
        const token = (0, request_util_1.getActionContextToken)(r, this._exceptionService);
        // refresh the access token
        return this._authenticationService.refreshAccessToken(token);
    }
    logOut(r) {
        // get the refresh token from the security context
        const token = (0, request_util_1.getActionContextToken)(r, this._exceptionService);
        // revoke the token
        return this._authenticationService.revokeRefreshToken(token);
    }
    async requestPasswordReset(r) {
        // get the username for the request
        const username = (0, validation_handlers_1.UsernameGetter)(r);
        // get the origin of the request
        const origin = 'unkn';
        // request a reset
        const response = await this._authenticationService.requestResetPassword({ username, origin });
        return response.success;
    }
    async performPasswordReset(r) {
        // get the principal from the security context
        const principal = (0, request_util_1.getActionContextPrincipal)(r, this._exceptionService);
        // get the password for the request
        const password = (0, validation_handlers_1.PasswordGetter)(r);
        // delete this token - password reset should only be allowed once
        // reset the password
        const response = await this._authenticationService.resetPassword(principal, password);
        // return the response
        return response;
    }
}
exports.AuthControllerImpl = AuthControllerImpl;
