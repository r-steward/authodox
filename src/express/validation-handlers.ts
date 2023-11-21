import { ExpressLikeRequestHandler } from "./express-interface";
import { AuthExceptionService } from "./exception-service";
import { createBodyGetter } from "./request-util";

// Authentication parameter names
export const UsernameParameter = "username";
export const PasswordParameter = "password";

// Request body getters
export const UsernameGetter = createBodyGetter(UsernameParameter);
export const PasswordGetter = createBodyGetter(PasswordParameter);

/**
 * These are the express handlers for validating values in the request
 */
export interface AuthValidationHandlers {
  readonly validateInitialUsernameAndPassword: ExpressLikeRequestHandler;
  readonly validateUsername: ExpressLikeRequestHandler;
  readonly validatePassword: ExpressLikeRequestHandler;
}

type Predicate = (s: string) => boolean;

export class ValidationHandlersImpl implements AuthValidationHandlers {
  constructor(
    private readonly ex: AuthExceptionService,
    private readonly isUsernameValid: Predicate,
    private readonly isPasswordValid: Predicate
  ) {}

  public readonly validateInitialUsernameAndPassword: ExpressLikeRequestHandler = async (
    req,
    _,
    next
  ) => {
    // validate
    const username = UsernameGetter(req);
    const password = PasswordGetter(req);
    if (!this.isUsernameValid(username) || !this.isPasswordValid(password)) {
      this.ex.throwBadRequest("Invalid username or password");
    }
    // next
    next();
  };

  public readonly validateUsername: ExpressLikeRequestHandler = async (
    req,
    _,
    next
  ) => {
    // validate
    const username = UsernameGetter(req);
    if (!this.isUsernameValid(username)) {
      this.ex.throwBadRequest("Invalid username");
    }
    next();
  };

  public readonly validatePassword: ExpressLikeRequestHandler = async (
    req,
    _,
    next
  ) => {
    // validate
    const password = PasswordGetter(req);
    if (!this.isPasswordValid(password)) {
      this.ex.throwBadRequest("Invalid password");
    }
    next();
  };
}
