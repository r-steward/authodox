import { ActionMessageService } from '../action-message-service';
import { ActionMessage, ActionMessageResponse } from '../../domain/action-message';
import { Principal } from '../../domain/principal';
export declare class ActionMessageServiceDemo<P extends Principal> implements ActionMessageService<P> {
    private _actionMessages;
    /**
     * Getter actionMessages
     * @return {ReadonlyArray<ActionMessage<P>> }
     */
    get actionMessages(): ReadonlyArray<ActionMessage<P>>;
    sendActionMessage(actionMessage: ActionMessage<P>): Promise<ActionMessageResponse>;
}
