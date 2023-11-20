"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionMessageServiceDemo = void 0;
const util_1 = require("../../service/util");
const fourspace_logger_ts_1 = require("fourspace-logger-ts");
const logger = fourspace_logger_ts_1.LogFactory.getLogger('ActionMessageServiceDemo');
class ActionMessageServiceDemo {
    constructor() {
        this._actionMessages = [];
    }
    /**
     * Getter actionMessages
     * @return {ReadonlyArray<ActionMessage<P>> }
     */
    get actionMessages() {
        return this._actionMessages;
    }
    sendActionMessage(actionMessage) {
        this._actionMessages.push(actionMessage);
        // tslint:disable-next-line:no-console
        logger.info('ActionMessage Type:' +
            (0, util_1.getActionTypeName)(actionMessage.actionType) +
            ' To [' +
            actionMessage.principal.username +
            '] with token [' +
            actionMessage.actionToken +
            ']');
        return Promise.resolve({ isSuccess: true });
    }
}
exports.ActionMessageServiceDemo = ActionMessageServiceDemo;
