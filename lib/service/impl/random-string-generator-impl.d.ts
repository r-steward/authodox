import { RandomStringGenerator } from '../random-string-generator';
export declare class RandomStringGeneratorImpl implements RandomStringGenerator {
    generateRandom(length: number): Promise<string>;
}
