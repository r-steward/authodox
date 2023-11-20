import { AuthToken } from '../domain/auth-token';
import { TokenInfo } from '../domain/token-info';
import { TokenAuthResult, AuthResult } from '../domain/auth-result';
import { ActionType } from '../domain/action-message';
/**
 * Create token info object from auth token.
 * This is used to create encoded tokens for clients
 * @param t token
 */
export declare const getTokenInfo: (t: AuthToken<any>) => TokenInfo;
/**
 * Get description for action types
 * @param m
 */
export declare const getActionTypeName: (m: ActionType) => string;
export declare const createFailTokenResult: <P>(errorMessage: string) => TokenAuthResult<P>;
export declare const createFailResult: <P>(errorMessage: string) => AuthResult<P>;
