import { PrincipalDao } from '../../dao/principal-dao';
import { AuthenticationService } from '../authentication-service';
import { TokenDao } from '../../dao/token-dao';
import { UserAuthenticator } from '../user-authenticator';
import { SecureHash } from '../secure-hash';
import { Principal } from '../../domain/principal';
import { TokenAuthenticator } from '../token-authenticator';
import { TokenEncoder } from '../token-encoder';
import { TokenCreator } from '../token-creator';
import { ExpiryConfig } from './token-creator-impl';
import { TokenKeyCreator } from '../token-key-creator';
import { RandomStringGenerator } from '../random-string-generator';
import { DateProvider } from '../date-provider';
import { ActionMessageService } from '../../actions/action-message-service';
import { ExpiryChecker } from '../expiry-checker';
export declare class AuthenticationServiceBuilder<P extends Principal> {
    private _principalDao;
    private _tokenDao;
    private _secureHash;
    private _actionMessageService;
    private _userAuthenticator;
    private _tokenAuthenticator;
    private _tokenEncoder;
    private _tokenCreator;
    private _tokenKeyCreator;
    private _randomStringGenerator;
    private _expiryChecker;
    private _dateProvider;
    private _tokenLength;
    private _keyLength;
    private _expiryConfig;
    buildAuthenticationService(): AuthenticationService<P>;
    /**
     * Getter principalDao
     * @return {PrincipalDao<P>}
     */
    private getPrincipalDao;
    /**
     * Setter principalDao
     * @param {PrincipalDao<P>} value
     */
    setPrincipalDao(value: PrincipalDao<P>): AuthenticationServiceBuilder<P>;
    /**
     * Getter tokenDao
     * @return {TokenDao<P>}
     */
    private getTokenDao;
    /**
     * Setter tokenDao
     * @param {TokenDao<P>} value
     */
    setTokenDao(value: TokenDao<P>): AuthenticationServiceBuilder<P>;
    /**
     * Getter actionMessageService
     * @return {ActionMessageService<P>}
     */
    private getActionMessageService;
    /**
     * Setter actionMessageService
     * @param {ActionMessageService<P>} value
     */
    setActionMessageService(value: ActionMessageService<P>): this;
    /**
     * Get secure hash or default version
     * @return {SecureHash}
     */
    private getSecureHash;
    /**
     * Setter secureHash
     * @param {SecureHash} value
     */
    setSecureHash(value: SecureHash): this;
    /**
     * Getter userAuthenticator
     * @return {UserAuthenticator<P>}
     */
    private getUserAuthenticator;
    /**
     * Setter userAuthenticator
     * @param {UserAuthenticator<P>} value
     */
    setUserAuthenticator(value: UserAuthenticator<P>): this;
    /**
     * Getter tokenAuthenticator
     * @return {TokenAuthenticator<P>}
     */
    private getTokenAuthenticator;
    /**
     * Setter tokenAuthenticator
     * @param {TokenAuthenticator<P>} value
     */
    setTokenAuthenticator(value: TokenAuthenticator<P>): this;
    /**
     * Getter tokenEncoder
     * @return {TokenEncoder}
     */
    private getTokenEncoder;
    /**
     * Setter tokenEncoder
     * @param {TokenEncoder} value
     */
    setTokenEncoder(value: TokenEncoder): this;
    /**
     * Getter tokenCreator
     * @return {TokenCreator<P>}
     */
    private getTokenCreator;
    /**
     * Setter tokenCreator
     * @param {TokenCreator<P>} value
     */
    setTokenCreator(value: TokenCreator<P>): this;
    /**
     * Getter tokenKeyCreator
     * @return {TokenKeyCreator<P>}
     */
    private getTokenKeyCreator;
    /**
     * Setter tokenKeyCreator
     * @param {TokenKeyCreator<P>} value
     */
    setTokenKeyCreator(value: TokenKeyCreator<P>): this;
    /**
     * Getter keyLength
     * @return {number}
     */
    private getKeyLength;
    /**
     * Setter keyLength
     * @param {number} value
     */
    setKeyLength(value: number): this;
    /**
     * Getter randomStringGenerator
     * @return {RandomStringGenerator}
     */
    private getRandomStringGenerator;
    /**
     * Setter randomStringGenerator
     * @param {RandomStringGenerator} value
     */
    setRandomStringGenerator(value: RandomStringGenerator): this;
    /**
     * Getter dateProvider
     * @return {DateProvider}
     */
    private getDateProvider;
    /**
     * Setter dateProvider
     * @param {DateProvider} value
     */
    setDateProvider(value: DateProvider): this;
    /**
     * Getter expiryChecker
     * @return {ExpiryChecker}
     */
    getExpiryChecker(): ExpiryChecker;
    /**
     * Setter expiryChecker
     * @param {ExpiryChecker} value
     */
    setExpiryChecker(value: ExpiryChecker): this;
    /**
     * Getter tokenLength
     * @return {number }
     */
    private getTokenLength;
    /**
     * Setter tokenLength
     * @param {number } value
     */
    setTokenLength(value: number): this;
    /**
     * Getter expiryConfig
     * @return {ExpiryConfig }
     */
    private getExpiryConfig;
    /**
     * Setter expiryConfig
     * @param {ExpiryConfig } value
     */
    setExpiryConfig(value: ExpiryConfig): this;
}
