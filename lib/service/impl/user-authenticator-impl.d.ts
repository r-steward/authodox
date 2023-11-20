import { UserAuthenticator } from '../user-authenticator';
import { PasswordAuthClaim } from '../../domain/auth-claim';
import { PrincipalDao } from '../../dao/principal-dao';
import { Principal } from '../../domain/principal';
import { SecureHash } from '../secure-hash';
import { AuthResult } from '../../domain/auth-result';
/**
 * User authenticator for password claims
 */
export declare class UserAuthenticatorImpl<P extends Principal> implements UserAuthenticator<P> {
    private readonly _principalDao;
    private readonly _secureHash;
    constructor(principalDao: PrincipalDao<P>, secureHash: SecureHash);
    authenticateUser(claim: PasswordAuthClaim): Promise<AuthResult<P>>;
}
