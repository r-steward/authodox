"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenEncoderStringSeparated = void 0;
class TokenEncoderStringSeparated {
    constructor(separator) {
        this._separator = separator;
    }
    decode(token) {
        const [tokenKey, tokenValue, expiry] = token == null ? [null, null, null] : token.split(this._separator);
        const expire = expiry == null ? 0 : Buffer.from(expiry, 'base64').readDoubleBE();
        return { tokenKey, tokenValue, expire };
    }
    encode(info) {
        const expiryDate = Buffer.alloc(8);
        expiryDate.writeDoubleBE(info.expire);
        return info.tokenKey + this._separator + info.tokenValue + this._separator + expiryDate.toString('base64');
    }
}
exports.TokenEncoderStringSeparated = TokenEncoderStringSeparated;
