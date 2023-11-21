import { LogFactory } from "fourspace-logger-ts";
import { TokenDao } from "../../dao/token-dao";
import { TokenAuthenticator } from "./../token-authenticator";
import { SecureHash } from "./../secure-hash";
import { TokenEncoder } from "../token-encoder";
import {
  AccessTokenAuthClaim,
  PasswordResetAuthClaim,
  RefreshAccessTokenAuthClaim,
  VerifyUserAuthClaim
} from "../../domain/auth-claim";
import { TokenType } from "../../domain/auth-token";
import { TokenAuthResult } from "../../domain/auth-result";
import { createFailTokenResult } from "../util";
import { ExpiryChecker } from "../expiry-checker";

const logger = LogFactory.getLogger("TokenAuthenticatorImpl");

/**
 * Authenticate users with a secure token
 */
export class TokenAuthenticatorImpl<P> implements TokenAuthenticator<P> {
  private readonly _tokenEncoder: TokenEncoder;
  private readonly _tokenDao: TokenDao<P>;
  private readonly _secureHash: SecureHash;
  private readonly _expiryChecker: ExpiryChecker;

  constructor(
    tokenEncoder: TokenEncoder,
    tokenDao: TokenDao<P>,
    secureHash: SecureHash,
    expiryChecker: ExpiryChecker
  ) {
    this._tokenEncoder = tokenEncoder;
    this._tokenDao = tokenDao;
    this._secureHash = secureHash;
    this._expiryChecker = expiryChecker;
  }

  public async authenticateVerifyToken(
    claim: VerifyUserAuthClaim
  ): Promise<TokenAuthResult<P>> {
    const token = claim.verifyToken;
    return this._authToken(token, TokenType.VerifyUser);
  }

  public async authenticateRefreshToken(
    claim: RefreshAccessTokenAuthClaim
  ): Promise<TokenAuthResult<P>> {
    const token = claim.refreshToken;
    return this._authToken(token, TokenType.RefreshToken);
  }

  public async authenticateAccessToken(
    claim: AccessTokenAuthClaim
  ): Promise<TokenAuthResult<P>> {
    const token = claim.accessToken;
    return this._authToken(token, TokenType.AccessToken);
  }

  public async authenticatePasswordResetToken(
    claim: PasswordResetAuthClaim
  ): Promise<TokenAuthResult<P>> {
    const token = claim.resetToken;
    return this._authToken(token, TokenType.PasswordResetToken);
  }

  private async _authToken(
    encodedToken: string,
    tokenType: TokenType
  ): Promise<TokenAuthResult<P>> {
    // decode the token and look up via the key
    const tokenInfo = this._tokenEncoder.decode(encodedToken);
    const authToken = await this._tokenDao.getToken(tokenInfo.tokenKey);
    // if token found and types match, then verify the hash
    if (
      authToken != null &&
      authToken.tokenType === tokenType &&
      this._expiryChecker.isValid(authToken.expiry) &&
      (await this._secureHash.verifyHash(
        tokenInfo.tokenValue,
        authToken.encryptedToken
      ))
    ) {
      if (logger.isDebugEnabled()) {
        logger.debug(
          `Authentication successful for ${tokenInfo.tokenKey} ${tokenInfo.tokenValue}`
        );
      }
      return {
        isAuthenticated: true,
        principal: authToken.principal,
        authToken
      };
    }
    return createFailTokenResult("Failed");
  }
}
