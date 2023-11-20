import { ExpressLikeRequestHandler } from './express-interface';
import { AuthExceptionService } from './exception-service';
export declare const UsernameParameter = "username";
export declare const PasswordParameter = "password";
export declare const UsernameGetter: (r: import("./express-interface").ExpressLikeRequest) => string;
export declare const PasswordGetter: (r: import("./express-interface").ExpressLikeRequest) => string;
/**
 * These are the express handlers for validating values in the request
 */
export interface AuthValidationHandlers {
    readonly validateInitialUsernameAndPassword: ExpressLikeRequestHandler;
    readonly validateUsername: ExpressLikeRequestHandler;
    readonly validatePassword: ExpressLikeRequestHandler;
}
type Predicate = (s: string) => boolean;
export declare class ValidationHandlersImpl implements AuthValidationHandlers {
    private readonly ex;
    private readonly isUsernameValid;
    private readonly isPasswordValid;
    constructor(ex: AuthExceptionService, isUsernameValid: Predicate, isPasswordValid: Predicate);
    readonly validateInitialUsernameAndPassword: ExpressLikeRequestHandler;
    readonly validateUsername: ExpressLikeRequestHandler;
    readonly validatePassword: ExpressLikeRequestHandler;
}
export {};
