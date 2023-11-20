export interface ExpressLikeParamsDictionary {
    [key: string]: string;
}
export interface ExpressLikeNextFunction {
    (err?: any): void;
}
export interface ExpressLikeRequest {
    headers: ExpressLikeIncomingHttpHeaders;
    params: ExpressLikeParamsDictionary;
    body: any;
    securityContext?: any;
}
export interface ExpressLikeResponse {
    status(code: number): this;
    json(j: any): any;
}
export interface ExpressLikeIncomingHttpHeaders {
    authorization?: string;
}
export declare enum ApiMethod {
    GET = "get",
    POST = "post"
}
/**
 * Handler for express routes
 */
export type ExpressLikeRequestHandler = (req: ExpressLikeRequest, res: ExpressLikeResponse, next: ExpressLikeNextFunction) => Promise<void> | void;
/**
 * Configuration for an express route
 */
export type RouteConfiguration = {
    path: string;
    method: string;
    handler: ExpressLikeRequestHandler | ExpressLikeRequestHandler[];
};
