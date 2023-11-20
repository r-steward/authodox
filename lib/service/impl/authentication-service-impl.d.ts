import { AuthenticationService } from '../authentication-service';
import { PasswordAuthClaim, AccessTokenAuthClaim, PasswordResetAuthClaim, RefreshAccessTokenAuthClaim, VerifyUserAuthClaim } from '../../domain/auth-claim';
import { UserSecurityContext, ActionSecurityContext } from '../../domain/security-context';
import { UserAuthenticator } from '../user-authenticator';
import { TokenCreator } from '../token-creator';
import { TokenAuthenticator } from '../token-authenticator';
import { TokenEncoder } from '../token-encoder';
import { TokenDao } from '../../dao/token-dao';
import { ResetRequest, ResetRequestResponse } from '../../domain/reset-request';
import { PrincipalDao } from '../../dao/principal-dao';
import { Principal } from '../../domain/principal';
import { SecureHash } from '../secure-hash';
import { RegisterRequest, RegisterResponse } from '../../domain/register-request';
import { AccessTokenResponse, AuthTokenSecure } from '../../domain/auth-token';
import { ActionMessageService } from '../../actions/action-message-service';
/**
 * Implementation of authentication service
 */
export declare class AuthenticationServiceImpl<P extends Principal> implements AuthenticationService<P> {
    private _userAuthenticator;
    private _tokenAuthenticator;
    private _tokenCreator;
    private _tokenEncoder;
    private _tokenDao;
    private _principalDao;
    private _secureHash;
    private _actionMessageService;
    constructor(userAuthenticator: UserAuthenticator<P>, tokenAuthenticator: TokenAuthenticator<P>, tokenCreator: TokenCreator<P>, tokenEncoder: TokenEncoder, tokenDao: TokenDao<P>, principalDao: PrincipalDao<P>, secureHash: SecureHash, actionMessageService: ActionMessageService<P>);
    authenticateVerifyClaim(claim: VerifyUserAuthClaim): Promise<ActionSecurityContext<P>>;
    authenticatePasswordClaim(claim: PasswordAuthClaim): Promise<UserSecurityContext<P>>;
    authenticateAccessTokenClaim(claim: AccessTokenAuthClaim): Promise<UserSecurityContext<P>>;
    authenticateTokenRefreshClaim(claim: RefreshAccessTokenAuthClaim): Promise<ActionSecurityContext<P>>;
    authenticatePasswordResetClaim(claim: PasswordResetAuthClaim): Promise<ActionSecurityContext<P>>;
    createAccessToken(principal: P): Promise<AccessTokenResponse>;
    refreshAccessToken(refreshToken: AuthTokenSecure<P>): Promise<AccessTokenResponse>;
    revokeRefreshToken(refreshToken: AuthTokenSecure<P>): Promise<boolean>;
    createUserAndSendVerificationMessage(registerRequest: RegisterRequest<P>): Promise<RegisterResponse>;
    requestResetPassword(resetRequest: ResetRequest): Promise<ResetRequestResponse<P>>;
    resetPassword(principal: P, newPassword: string): Promise<boolean>;
    /**
     * Set verified flag to true and save user
     * @param principal
     */
    verifyUser(principal: P): Promise<boolean>;
    /**
     * Add an associated key to an existing token
     * @param token
     * @param associatedKey
     */
    private _addAssociatedKey;
    /**
     * Save secure part of the token
     * return the auth token (with any values updated by the save action e.g. key)
     * @param token auth token
     */
    private _saveToken;
    /**
     * Delete tokens for a user
     * @param principal
     */
    private _deleteUserTokens;
}
