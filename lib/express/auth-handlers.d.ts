import { ExpressLikeRequestHandler } from './express-interface';
import { AuthenticationService } from '../service/authentication-service';
import { AuthExceptionService } from './exception-service';
/**
 * These are the express handlers for authenticating various claims
 */
export interface AuthHandlers {
    readonly authenticatePasswordClaim: ExpressLikeRequestHandler;
    readonly authenticateAccessTokenClaim: ExpressLikeRequestHandler;
    readonly authenticateVerifyClaim: ExpressLikeRequestHandler;
    readonly authenticateTokenRefreshClaim: ExpressLikeRequestHandler;
    readonly authenticatePasswordResetClaim: ExpressLikeRequestHandler;
}
/**
 * Handler implementation
 */
export declare class AuthHandlerImpl<P> implements AuthHandlers {
    private readonly service;
    private readonly ex;
    constructor(service: AuthenticationService<P>, ex: AuthExceptionService);
    readonly authenticatePasswordClaim: ExpressLikeRequestHandler;
    readonly authenticateAccessTokenClaim: ExpressLikeRequestHandler;
    readonly authenticatePasswordResetClaim: ExpressLikeRequestHandler;
    readonly authenticateTokenRefreshClaim: ExpressLikeRequestHandler;
    readonly authenticateVerifyClaim: ExpressLikeRequestHandler;
}
