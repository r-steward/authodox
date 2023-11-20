import { TokenDao } from '../../dao/token-dao';
import { TokenAuthenticator } from './../token-authenticator';
import { SecureHash } from './../secure-hash';
import { TokenEncoder } from '../token-encoder';
import { AccessTokenAuthClaim, PasswordResetAuthClaim, RefreshAccessTokenAuthClaim, VerifyUserAuthClaim } from '../../domain/auth-claim';
import { TokenAuthResult } from '../../domain/auth-result';
import { ExpiryChecker } from '../expiry-checker';
/**
 * Authenticate users with a secure token
 */
export declare class TokenAuthenticatorImpl<P> implements TokenAuthenticator<P> {
    private readonly _tokenEncoder;
    private readonly _tokenDao;
    private readonly _secureHash;
    private readonly _expiryChecker;
    constructor(tokenEncoder: TokenEncoder, tokenDao: TokenDao<P>, secureHash: SecureHash, expiryChecker: ExpiryChecker);
    authenticateVerifyToken(claim: VerifyUserAuthClaim): Promise<TokenAuthResult<P>>;
    authenticateRefreshToken(claim: RefreshAccessTokenAuthClaim): Promise<TokenAuthResult<P>>;
    authenticateAccessToken(claim: AccessTokenAuthClaim): Promise<TokenAuthResult<P>>;
    authenticatePasswordResetToken(claim: PasswordResetAuthClaim): Promise<TokenAuthResult<P>>;
    private _authToken;
}
