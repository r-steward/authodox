"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationHandlersImpl = exports.PasswordGetter = exports.UsernameGetter = exports.PasswordParameter = exports.UsernameParameter = void 0;
const request_util_1 = require("./request-util");
// Authentication parameter names
exports.UsernameParameter = 'username';
exports.PasswordParameter = 'password';
// Request body getters
exports.UsernameGetter = (0, request_util_1.createBodyGetter)(exports.UsernameParameter);
exports.PasswordGetter = (0, request_util_1.createBodyGetter)(exports.PasswordParameter);
class ValidationHandlersImpl {
    constructor(ex, isUsernameValid, isPasswordValid) {
        this.ex = ex;
        this.isUsernameValid = isUsernameValid;
        this.isPasswordValid = isPasswordValid;
        this.validateInitialUsernameAndPassword = async (req, _, next) => {
            // validate
            const username = (0, exports.UsernameGetter)(req);
            const password = (0, exports.PasswordGetter)(req);
            if (!this.isUsernameValid(username) || !this.isPasswordValid(password)) {
                this.ex.throwBadRequest('Invalid username or password');
            }
            // next
            next();
        };
        this.validateUsername = async (req, _, next) => {
            // validate
            const username = (0, exports.UsernameGetter)(req);
            if (!this.isUsernameValid(username)) {
                this.ex.throwBadRequest('Invalid username');
            }
            next();
        };
        this.validatePassword = async (req, _, next) => {
            // validate
            const password = (0, exports.PasswordGetter)(req);
            if (!this.isPasswordValid(password)) {
                this.ex.throwBadRequest('Invalid password');
            }
            next();
        };
    }
}
exports.ValidationHandlersImpl = ValidationHandlersImpl;
