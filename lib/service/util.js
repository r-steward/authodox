"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFailResult = exports.createFailTokenResult = exports.getActionTypeName = exports.getTokenInfo = void 0;
const moment_1 = __importDefault(require("moment"));
const action_message_1 = require("../domain/action-message");
/**
 * Create token info object from auth token.
 * This is used to create encoded tokens for clients
 * @param t token
 */
const getTokenInfo = (t) => ({
    tokenKey: t.key,
    tokenValue: t.plainToken,
    expire: (0, moment_1.default)(t.expiry).unix(),
});
exports.getTokenInfo = getTokenInfo;
/**
 * Get description for action types
 * @param m
 */
const getActionTypeName = (m) => {
    switch (m) {
        case action_message_1.ActionType.Verify:
            return 'VerifyUser';
        case action_message_1.ActionType.PasswordReset:
            return 'PasswordReset';
        default:
            return 'Unkown';
    }
};
exports.getActionTypeName = getActionTypeName;
const createFailTokenResult = (errorMessage) => ({
    errorMessage,
    isAuthenticated: false,
    principal: null,
    authToken: null,
});
exports.createFailTokenResult = createFailTokenResult;
const createFailResult = (errorMessage) => ({
    errorMessage,
    isAuthenticated: false,
    principal: null,
});
exports.createFailResult = createFailResult;
