"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenKeyCreatorRandom = void 0;
/**
 * Implementation that generates a random key
 */
class TokenKeyCreatorRandom {
    constructor(randomStringGenerator, keyLength) {
        this._randomStringGenerator = randomStringGenerator;
        this._keyLength = keyLength;
    }
    createKey(context) {
        return this._randomStringGenerator.generateRandom(this._keyLength);
    }
}
exports.TokenKeyCreatorRandom = TokenKeyCreatorRandom;
