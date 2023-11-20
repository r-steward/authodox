import { SecureHash } from '../secure-hash';
export declare class SecureHashImpl implements SecureHash {
    private readonly securePassword;
    constructor();
    createHash(value: string): Promise<string>;
    verifyHash(value: string, hash: string): Promise<boolean>;
}
