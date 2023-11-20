"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomStringGeneratorImpl = void 0;
const secure_random_string_1 = __importDefault(require("secure-random-string"));
class RandomStringGeneratorImpl {
    generateRandom(length) {
        return new Promise(resolve => {
            (0, secure_random_string_1.default)({ length }, (err, result) => {
                resolve(result);
            });
        });
    }
}
exports.RandomStringGeneratorImpl = RandomStringGeneratorImpl;
