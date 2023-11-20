"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthenticatorImpl = void 0;
const util_1 = require("../util");
/**
 * User authenticator for password claims
 */
class UserAuthenticatorImpl {
    constructor(principalDao, secureHash) {
        this._principalDao = principalDao;
        this._secureHash = secureHash;
    }
    async authenticateUser(claim) {
        const user = await this._principalDao.getPrincipal(claim.user);
        if (user != null &&
            user.isVerified &&
            (await this._secureHash.verifyHash(claim.password, user.encryptedPassword))) {
            return {
                isAuthenticated: true,
                principal: user,
            };
        }
        return (0, util_1.createFailResult)('Failed');
    }
}
exports.UserAuthenticatorImpl = UserAuthenticatorImpl;
