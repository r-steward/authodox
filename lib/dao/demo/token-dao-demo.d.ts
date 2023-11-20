import { TokenDao, SearchCriteria } from '../token-dao';
import { AuthTokenSecure } from '../../domain/auth-token';
import { Principal } from '../../domain/principal';
/**
 * Demo token dao
 * Keeps tokens in memory using the 'key' property as ID.
 */
export declare class TokenDaoDemo<P extends Principal> implements TokenDao<P> {
    private readonly _storage;
    private readonly _key;
    constructor();
    getAll(): Promise<ReadonlyArray<AuthTokenSecure<P>>>;
    getToken(key: string): Promise<AuthTokenSecure<P>>;
    saveToken(token: AuthTokenSecure<P>): Promise<AuthTokenSecure<P>>;
    updateToken(token: AuthTokenSecure<P>): Promise<AuthTokenSecure<P>>;
    deleteTokens(sc: SearchCriteria<P>): Promise<void>;
    private _deleteToken;
    private _deleteTokenTypes;
    private _deleteUserTokens;
    private _cascadeDelete;
}
