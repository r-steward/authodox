import { AuthenticationServiceBuilder } from '../src/service/impl/authentication-service-builder';
import { Principal } from '../src/domain/principal';
import { PrincipalDaoDemo } from '../src/dao/demo/principal-dao-demo';
import { ActionMessageServiceDemo } from '../src/actions/demo/action-message-service-demo';
import { ActionType } from '../src/domain/action-message';
import { TokenDaoDemo } from '../src/dao/demo/token-dao-demo';
import { createAuthenticationRoutes } from '../src/express/auth-routes';
import { AuthHandlerImpl, AuthHandlers } from '../src/express/auth-handlers';
import { AuthController, AuthControllerImpl } from '../src/express/auth-controller';
import { ValidationHandlersImpl } from '../src/express/validation-handlers';
import { AuthExceptionService } from '../src/express/exception-service';
import { RequestUserMapper } from '../src/express/request-user-mapper';
import { RouteConfiguration, ExpressLikeRequestHandler, ExpressLikeRequest, ExpressLikeResponse, ExpressLikeIncomingHttpHeaders, ExpressLikeParamsDictionary } from '../src/express/express-interface';
import { AccessTokenResponse } from '../src/domain/auth-token';

describe('Test Server Routes', () => {

    // Mock the dao objects
    const ExceptionServiceMock = jest.fn<AuthExceptionService, []>(() => ({
        throwBadRequest: jest.fn(),
        throwForbidden: jest.fn(),
        throwInternalServer: jest.fn(),
        throwUnauthenticated: jest.fn(),
    }));
    const RequestUserMapperMock = jest.fn<RequestUserMapper<Principal, Principal>, []>(() => ({
        createNewUser: jest.fn(b => { return { username: b.username } as Principal }),
        validateNewUser: jest.fn().mockReturnValue(true),
        mapToDto: jest.fn(p => p)
    }));
    // Mock the response
    const ResponseMocker = jest.fn<ExpressLikeResponse, [any[]]>(function (jsonList: any[]) {
        return {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn(v => { jsonList.push(v); })
        }
    });


    test('Test full flow', async () => {
        // arrange
        const actionMessageService = new ActionMessageServiceDemo();
        const principalDao = new PrincipalDaoDemo<Principal>([]);
        const tokenDao = new TokenDaoDemo();
        //
        const mockExceptionService = new ExceptionServiceMock();
        const mockUserMapper = new RequestUserMapperMock();
        const authenticationService = new AuthenticationServiceBuilder()
            .setActionMessageService(actionMessageService)
            .setPrincipalDao(principalDao)
            .setTokenDao(tokenDao)
            .buildAuthenticationService();
        const validator = (s: string) => s != null && s.trim() !== '';
        const authHandlers: AuthHandlers = new AuthHandlerImpl(authenticationService, mockExceptionService);
        const authController: AuthController<any> = new AuthControllerImpl(authenticationService, mockUserMapper, mockExceptionService);
        const validationHandlers: ValidationHandlersImpl = new ValidationHandlersImpl(mockExceptionService, validator, validator);
        const routes = createAuthenticationRoutes((s) => s, authHandlers, validationHandlers, authController);
        const routeMap: Map<string, RouteConfiguration> = routes.reduce((m, o) => { m.set(o.path, o); return m; }, new Map());
        const requestRunner = buildRequestRunner(routeMap);
        // act and assert
        const firstPassword = 'testPassword';
        const resetPassword = 'testResetPassword';
        // 1 - Register new user
        const verifyToken = await testRegisterStep(requestRunner, actionMessageService, firstPassword);
        // 2 - verify
        await testVerifyStep(requestRunner, verifyToken);
        // 3 - login
        const { refreshToken, accessToken } = await testLoginStep(requestRunner, firstPassword);
        // 4 - logout
        // 5 - request reset password
        const resetToken = await testRequestResetStep(requestRunner, actionMessageService);
        // 6 - supply reset with token
        await testResetStep(requestRunner, resetToken, resetPassword);
        // 7 - login
        const { refreshToken: newRefreshToken, accessToken: newAccessToken } = await testLoginStep(requestRunner, resetPassword);

    });

    async function testRegisterStep(requestRunner: RequestRunner, actionMessageService: ActionMessageServiceDemo<any>, password: string) {
        expect(getActionMessages(actionMessageService, ActionType.Verify).length).toBe(0);
        // act
        const { mockResponse } = await requestRunner('/auth/register', createBodyRequest({
            username: 'test@testmail.com',
            password
        }));
        // assert
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(true);
        const actions = getActionMessages(actionMessageService, ActionType.Verify);
        expect(actions.length).toBe(1);
        return actions[0].actionToken;
    }

    async function testVerifyStep(requestRunner: RequestRunner, verifyToken: string) {
        // act
        const { mockResponse } = await requestRunner('/auth/verify', createHeaderRequest({ authorization: verifyToken }));
        // assert
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(true);
    }

    async function testLoginStep(requestRunner: RequestRunner, password: string) {
        // make request with token in the header
        const { mockResponse, jsonResults } = await requestRunner('/auth/login', createBodyRequest({
            username: 'test@testmail.com',
            password
        }));
        // assert
        const resultResponse = (jsonResults[0] as AccessTokenResponse);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(resultResponse);
        expect(resultResponse.accessToken.length).toBe(52);
        expect(resultResponse.refreshToken.length).toBe(52);
        // return token result
        return resultResponse;
    }

    async function testRequestResetStep(requestRunner: RequestRunner, actionMessageService: ActionMessageServiceDemo<any>) {
        expect(getActionMessages(actionMessageService, ActionType.PasswordReset)).toStrictEqual([]);
        // make request with token in the header
        const { mockResponse, jsonResults } = await requestRunner('/auth/request-reset', createBodyRequest({ username: 'test@testmail.com' }));
        // assert
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(true);
        expect(getActionMessages(actionMessageService, ActionType.PasswordReset).length).toBe(1);
        return getActionMessages(actionMessageService, ActionType.PasswordReset)[0].actionToken;
    }

    async function testResetStep(requestRunner: RequestRunner, resetToken: string, password: string) {
        // make request with token in the header
        const { mockResponse, jsonResults } = await requestRunner('/auth/perform-reset', createHeaderRequest({ authorization: resetToken }, { password }));
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(true);
    }

    async function testLogoutStepUn(routeMap: Map<string, RouteConfiguration>) {
        // make request with token in the header
    }

    function createHeaderRequest(headers: ExpressLikeIncomingHttpHeaders, body: any = undefined): ExpressLikeRequest {
        return {
            headers,
            params: null as unknown as ExpressLikeParamsDictionary,
            body
        };
    }

    function createBodyRequest(body: any): ExpressLikeRequest {
        return {
            headers: null as unknown as ExpressLikeIncomingHttpHeaders,
            params: null as unknown as ExpressLikeParamsDictionary,
            body
        };
    }

    function getActionMessages(actionMessageService: ActionMessageServiceDemo<any>, type: ActionType) {
        return actionMessageService.actionMessages.filter(a => a.actionType === type);
    }

    type RequestRunner = (route: string, request: ExpressLikeRequest) => Promise<MockedResponse>;
    type MockedResponse = { jsonResults: any[], mockResponse: ExpressLikeResponse };

    function buildRequestRunner(routeMap: Map<string, RouteConfiguration>): RequestRunner {
        return async (route: string, request: ExpressLikeRequest) => {
            const handlerArray = getHandlerArray(routeMap, route);
            return await runHandlers(request, handlerArray);
        };
    }

    /**
     * Gets the express handlers from a route map config
     * @param routeMap 
     * @param route 
     * @returns 
     */
    function getHandlerArray(routeMap: Map<string, RouteConfiguration>, route: string) {
        const config = routeMap.get(route)!;
        expect(config).toBeDefined();
        const handlers = config.handler;
        return Array.isArray(handlers) ? handlers as ExpressLikeRequestHandler[] : [handlers as ExpressLikeRequestHandler];
    }

    /**
     * Runs all the request handlers in sequence and returns the mocked json response
     * @param req 
     * @param handlers 
     * @returns 
     */
    function runHandlers(req: ExpressLikeRequest, handlers: ExpressLikeRequestHandler[]) {
        // return the mocked response and the json values set in the response
        const jsonResults: any[] = [];
        const mockResponse: ExpressLikeResponse = new ResponseMocker(jsonResults);
        const returnValue = { jsonResults, mockResponse };
        // create a list of promises and chain the handlers
        let promises: (Promise<void> | void)[] = [];
        // create next functions from list of handlers
        let nextFns = handlers.map((handler, i) =>
            () => {
                const next = (i + 1) < nextFns.length ? nextFns[i + 1] : () => { }
                promises.push(handler(req, mockResponse, next));
            }
        );
        // run first handler
        if (nextFns.length > 0) {
            nextFns[0]();
        }
        // resolve promises
        const buildResolveNext = (index: number) => {
            return (): Promise<{ mockResponse: ExpressLikeResponse, jsonResults: any[] }> => {
                if (index < promises.length) {
                    let currentPromise = promises[index];
                    return currentPromise != null ? (currentPromise as Promise<void>).then(buildResolveNext(index + 1)) : Promise.resolve(returnValue);
                }
                return Promise.resolve(returnValue);
            }
        }
        return promises.length > 0 ? buildResolveNext(0)() : Promise.resolve(returnValue);
    }
});

