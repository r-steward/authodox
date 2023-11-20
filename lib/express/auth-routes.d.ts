import { RouteConfiguration } from './express-interface';
import { AuthController } from './auth-controller';
import { AuthHandlers } from './auth-handlers';
import { AuthValidationHandlers } from './validation-handlers';
type ApiRouteAdapter = (r: string) => string;
/**
 * Create the authentication routes for the express server
 * @param routeAdapter
 * @param authHandlers
 * @param validationHandlers
 * @param c controller
 */
export declare const createAuthenticationRoutes: <PDTO>(routeAdapter: ApiRouteAdapter, authHandlers: AuthHandlers, validationHandlers: AuthValidationHandlers, c: AuthController<PDTO>) => RouteConfiguration[];
export {};
