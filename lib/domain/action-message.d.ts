export declare enum ActionType {
    Verify = 0,
    PasswordReset = 1
}
export interface ActionMessage<P> {
    readonly principal: P;
    readonly actionType: ActionType;
    readonly actionToken: string;
}
export interface ActionMessageResponse {
    readonly isSuccess: boolean;
    readonly errorMessage?: string;
}
