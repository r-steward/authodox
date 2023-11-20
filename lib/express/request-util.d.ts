import { AuthTokenSecure } from '../domain/auth-token';
import { AuthExceptionService } from './exception-service';
import { ExpressLikeRequest, ExpressLikeRequestHandler } from './express-interface';
/**
 * Sends a 200 response with the result of the request functor
 * @param f
 */
export declare function sendResult<T>(f: (req: ExpressLikeRequest) => Promise<T> | T): ExpressLikeRequestHandler;
type RequestValueGetter = (r: ExpressLikeRequest) => string;
export declare function createParameterGetter(p: string): RequestValueGetter;
export declare function createBodyGetter(p: string): RequestValueGetter;
export declare function getAuthorizationHeader(r: ExpressLikeRequest): string;
export declare function getUserContextPrincipal<P>(r: ExpressLikeRequest, ex: AuthExceptionService): P;
export declare function getActionContextPrincipal<P>(r: ExpressLikeRequest, ex: AuthExceptionService): P;
export declare function getActionContextToken<P>(r: ExpressLikeRequest, ex: AuthExceptionService): AuthTokenSecure<P>;
export {};
