import {
  ExpressLikeRequestHandler,
  ExpressLikeRequest
} from "./express-interface";
import { AuthenticationService } from "../service/authentication-service";
import {
  createPasswordAuthClaim,
  createAccessTokenAuthClaim,
  createPasswordResetAuthClaim,
  createRefreshAccessTokenAuthClaim,
  createVerifyUserAuthClaim
} from "../domain/auth-claim";
import { AuthExceptionService } from "./exception-service";
import { UsernameGetter, PasswordGetter } from "./validation-handlers";
import { getAuthorizationHeader } from "./request-util";

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
export class AuthHandlerImpl<P> implements AuthHandlers {
  constructor(
    private readonly service: AuthenticationService<P>,
    private readonly ex: AuthExceptionService
  ) {}

  public readonly authenticatePasswordClaim: ExpressLikeRequestHandler = async (
    req,
    _,
    next
  ) => {
    // authenticate
    const claim = createPasswordAuthClaim(
      UsernameGetter(req),
      PasswordGetter(req)
    );
    req.securityContext = await this.service.authenticatePasswordClaim(claim);
    // advance if authenticated
    if (!throwIfNotAuthenticated(req, this.ex)) {
      next();
    }
  };

  public readonly authenticateAccessTokenClaim: ExpressLikeRequestHandler = async (
    req,
    _,
    next
  ) => {
    // authenticate
    const claim = createAccessTokenAuthClaim(getAuthorizationHeader(req));
    req.securityContext = await this.service.authenticateAccessTokenClaim(
      claim
    );
    // advance
    if (!throwIfNotAuthenticated(req, this.ex)) {
      next();
    }
  };

  public readonly authenticatePasswordResetClaim: ExpressLikeRequestHandler = async (
    req,
    _,
    next
  ) => {
    // authenticate
    const claim = createPasswordResetAuthClaim(getAuthorizationHeader(req));
    req.securityContext = await this.service.authenticatePasswordResetClaim(
      claim
    );
    // advance
    if (!throwIfNotAuthenticated(req, this.ex)) {
      next();
    }
  };

  public readonly authenticateTokenRefreshClaim: ExpressLikeRequestHandler = async (
    req,
    _,
    next
  ) => {
    // authenticate
    const claim = createRefreshAccessTokenAuthClaim(
      getAuthorizationHeader(req)
    );
    req.securityContext = await this.service.authenticateTokenRefreshClaim(
      claim
    );
    // advance
    if (!throwIfNotAuthenticated(req, this.ex)) {
      next();
    }
  };

  public readonly authenticateVerifyClaim: ExpressLikeRequestHandler = async (
    req,
    _,
    next
  ) => {
    // authenticate
    const claim = createVerifyUserAuthClaim(getAuthorizationHeader(req));
    req.securityContext = await this.service.authenticateVerifyClaim(claim);
    // advance
    if (!throwIfNotAuthenticated(req, this.ex)) {
      next();
    }
  };
}

function throwIfNotAuthenticated(
  req: ExpressLikeRequest,
  ex: AuthExceptionService
): boolean {
  return !(req.securityContext.isAuthenticated || ex.throwUnauthenticated());
}
