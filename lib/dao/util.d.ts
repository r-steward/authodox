import { TokenSearchCriteriaByUser, TokenSearchCriteriaByTypeAndUser, TokenSearchCriteriaSingleToken } from './token-dao';
import { TokenType, AuthTokenSecure } from '../domain/auth-token';
/**
 * Token Dao search criteria
 * @param username
 */
export declare const createTokenSearchCriteriaUser: (username: string) => TokenSearchCriteriaByUser;
/**
 * Token Dao search criteria
 * @param username
 */
export declare const createTokenSearchCriteriaByTypeAndUser: (username: string, tokenType: TokenType) => TokenSearchCriteriaByTypeAndUser;
/**
 * Token Dao search criteria
 * @param username
 */
export declare const createTokenSearchCriteriaSingleToken: <P>(token: AuthTokenSecure<P>) => TokenSearchCriteriaSingleToken<P>;
