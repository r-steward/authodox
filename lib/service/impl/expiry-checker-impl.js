"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiryCheckerImpl = void 0;
/**
 * Check the token date is not past expiry
 */
class ExpiryCheckerImpl {
    constructor(dateProvider) {
        this._dateProvider = dateProvider;
    }
    isValid(expiry) {
        return this._dateProvider.getDateTime() < expiry;
    }
}
exports.ExpiryCheckerImpl = ExpiryCheckerImpl;
