import { AccessTokenResponse } from '../domain/auth-token';
import { AuthenticationService } from '../service/authentication-service';
import { RequestUserMapper } from './request-user-mapper';
import { AuthExceptionService } from './exception-service';
import { ExpressLikeRequest } from './express-interface';
/**
 * Controller for all authorisation action API requests
 */
export interface AuthController<PDTO> {
    registerUser(r: ExpressLikeRequest): Promise<boolean>;
    verifyUser(r: ExpressLikeRequest): Promise<boolean>;
    logIn(r: ExpressLikeRequest): Promise<AccessTokenResponse>;
    getAuthenticatedUser(r: ExpressLikeRequest): PDTO;
    refreshToken(r: ExpressLikeRequest): Promise<AccessTokenResponse>;
    logOut(r: ExpressLikeRequest): Promise<boolean>;
    requestPasswordReset(r: ExpressLikeRequest): Promise<boolean>;
    performPasswordReset(r: ExpressLikeRequest): Promise<boolean>;
}
/**
 * Implementation using the authentication service
 */
export declare class AuthControllerImpl<P, PDTO> implements AuthController<PDTO> {
    private readonly _authenticationService;
    private readonly _requestUserMapper;
    private readonly _exceptionService;
    constructor(authenticationService: AuthenticationService<P>, requestUserMapper: RequestUserMapper<P, PDTO>, exceptionService: AuthExceptionService);
    registerUser(r: ExpressLikeRequest): Promise<boolean>;
    verifyUser(r: ExpressLikeRequest): Promise<boolean>;
    logIn(r: ExpressLikeRequest): Promise<AccessTokenResponse>;
    getAuthenticatedUser(r: ExpressLikeRequest): PDTO;
    refreshToken(r: ExpressLikeRequest): Promise<AccessTokenResponse>;
    logOut(r: ExpressLikeRequest): Promise<boolean>;
    requestPasswordReset(r: ExpressLikeRequest): Promise<boolean>;
    performPasswordReset(r: ExpressLikeRequest): Promise<boolean>;
}
