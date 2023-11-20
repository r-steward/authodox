import { TokenCreator } from '../token-creator';
import { SecureHash } from './../secure-hash';
import { RandomStringGenerator } from './../random-string-generator';
import { DateProvider } from './../date-provider';
import { AuthToken, TokenType, AuthTokenSecure } from '../../domain/auth-token';
import { TokenKeyCreator } from './../token-key-creator';
/**
 * Token expiry configuration
 */
export interface ExpiryConfig {
    verifyExpiry: number;
    passwordResetExpiry: number;
    accessExpiry: number;
    refreshExpiry: number;
}
/**
 * Get the expiry minutes for a particular token type
 * @param expiryConfig
 * @param type
 */
export declare function getConfigExpiry(expiryConfig: ExpiryConfig, type: TokenType): number;
/**
 * Token creator implementation
 */
export declare class TokenCreatorImpl<P> implements TokenCreator<P> {
    private readonly _expiry;
    private readonly _secureHash;
    private readonly _randomStringGenerator;
    private readonly _tokenKeyCreator;
    private readonly _dateProvider;
    private readonly _tokenInputLength;
    /**
     * Construct the token creator
     *
     * @param secureHash
     * @param randomStringGenerator
     * @param dateProvider
     * @param tokenInputLength
     */
    constructor(tokenKeyCreator: TokenKeyCreator<P>, secureHash: SecureHash, randomStringGenerator: RandomStringGenerator, dateProvider: DateProvider, tokenInputLength: number, expiry: ExpiryConfig);
    createVerifyToken(user: P): Promise<AuthToken<P>>;
    createPasswordResetToken(user: P): Promise<AuthToken<P>>;
    createAccessToken(user: P): Promise<AuthToken<P>>;
    createRefreshToken(user: P): Promise<AuthToken<P>>;
    updateRefreshToken(currentToken: AuthTokenSecure<P>): Promise<AuthToken<P>>;
    private _getExpiry;
    private _createToken;
}
