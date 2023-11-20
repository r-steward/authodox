"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureHashImpl = void 0;
const secure_password_1 = __importDefault(require("secure-password"));
class SecureHashImpl {
    constructor() {
        this.securePassword = new secure_password_1.default();
    }
    async createHash(value) {
        return (await this.securePassword.hash(Buffer.from(value))).toString().replace(/\0/g, '');
    }
    async verifyHash(value, hash) {
        const hashBuffer = Buffer.alloc(secure_password_1.default.HASH_BYTES);
        hashBuffer.write(hash);
        const result = await this.securePassword.verify(Buffer.from(value), hashBuffer);
        return result === secure_password_1.default.VALID || result === secure_password_1.default.VALID_NEEDS_REHASH;
    }
}
exports.SecureHashImpl = SecureHashImpl;
