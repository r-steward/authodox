import { TokenKeyCreator } from './../token-key-creator';
import { RandomStringGenerator } from './../random-string-generator';
/**
 * Implementation that generates a random key
 */
export declare class TokenKeyCreatorRandom<P> implements TokenKeyCreator<P> {
    private readonly _randomStringGenerator;
    private readonly _keyLength;
    constructor(randomStringGenerator: RandomStringGenerator, keyLength: number);
    createKey(context: P): Promise<string>;
}
