"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["VerifyUser"] = 0] = "VerifyUser";
    TokenType[TokenType["AccessToken"] = 1] = "AccessToken";
    TokenType[TokenType["RefreshToken"] = 2] = "RefreshToken";
    TokenType[TokenType["PasswordResetToken"] = 3] = "PasswordResetToken";
    TokenType[TokenType["RememberMeToken"] = 4] = "RememberMeToken";
})(TokenType || (exports.TokenType = TokenType = {}));
