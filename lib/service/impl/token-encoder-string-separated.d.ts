import { TokenEncoder } from '../token-encoder';
import { TokenInfo } from '../../domain/token-info';
export declare class TokenEncoderStringSeparated implements TokenEncoder {
    private readonly _separator;
    constructor(separator: string);
    decode(token: string): TokenInfo;
    encode(info: TokenInfo): string;
}
