import { PrincipalDao } from '../principal-dao';
import { Principal } from '../../domain/principal';
/**
 * Demo Principal dao
 * Keeps principals in memory using the 'username' property as ID.
 */
export declare class PrincipalDaoDemo<P extends Principal> implements PrincipalDao<P> {
    private readonly _storage;
    private readonly _key;
    constructor(items: ReadonlyArray<P>);
    updatePrincipal(principal: P): Promise<P>;
    savePrincipal(principal: P): Promise<P>;
    getPrincipal(username: string): Promise<P>;
}
