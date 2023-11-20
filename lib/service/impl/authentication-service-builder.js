"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationServiceBuilder = void 0;
const authentication_service_impl_1 = require("./authentication-service-impl");
const user_authenticator_impl_1 = require("./user-authenticator-impl");
const secure_hash_impl_1 = require("./secure-hash-impl");
const token_authenticator_impl_1 = require("./token-authenticator-impl");
const token_encoder_string_separated_1 = require("./token-encoder-string-separated");
const token_creator_impl_1 = require("./token-creator-impl");
const token_key_creator_random_1 = require("./token-key-creator-random");
const random_string_generator_impl_1 = require("./random-string-generator-impl");
const date_provider_system_1 = require("./date-provider-system");
const principal_dao_demo_1 = require("../../dao/demo/principal-dao-demo");
const token_dao_demo_1 = require("../../dao/demo/token-dao-demo");
const action_message_service_demo_1 = require("../../actions/demo/action-message-service-demo");
const expiry_checker_impl_1 = require("./expiry-checker-impl");
class AuthenticationServiceBuilder {
    constructor() {
        this._tokenLength = 30;
        this._keyLength = 8;
        this._expiryConfig = {
            verifyExpiry: 60,
            passwordResetExpiry: 10,
            accessExpiry: 30,
            refreshExpiry: 180,
        };
    }
    buildAuthenticationService() {
        const userAuthenticator = this.getUserAuthenticator();
        const tokenAuthenticator = this.getTokenAuthenticator();
        const tokenCreator = this.getTokenCreator();
        return new authentication_service_impl_1.AuthenticationServiceImpl(userAuthenticator, tokenAuthenticator, tokenCreator, this.getTokenEncoder(), this.getTokenDao(), this.getPrincipalDao(), this.getSecureHash(), this.getActionMessageService());
    }
    /**
     * Getter principalDao
     * @return {PrincipalDao<P>}
     */
    getPrincipalDao() {
        if (this._principalDao == null) {
            this._principalDao = new principal_dao_demo_1.PrincipalDaoDemo([]);
        }
        return this._principalDao;
    }
    /**
     * Setter principalDao
     * @param {PrincipalDao<P>} value
     */
    setPrincipalDao(value) {
        this._principalDao = value;
        return this;
    }
    /**
     * Getter tokenDao
     * @return {TokenDao<P>}
     */
    getTokenDao() {
        if (this._tokenDao == null) {
            this._tokenDao = new token_dao_demo_1.TokenDaoDemo();
        }
        return this._tokenDao;
    }
    /**
     * Setter tokenDao
     * @param {TokenDao<P>} value
     */
    setTokenDao(value) {
        this._tokenDao = value;
        return this;
    }
    /**
     * Getter actionMessageService
     * @return {ActionMessageService<P>}
     */
    getActionMessageService() {
        if (this._actionMessageService == null) {
            this._actionMessageService = new action_message_service_demo_1.ActionMessageServiceDemo();
        }
        return this._actionMessageService;
    }
    /**
     * Setter actionMessageService
     * @param {ActionMessageService<P>} value
     */
    setActionMessageService(value) {
        this._actionMessageService = value;
        return this;
    }
    /**
     * Get secure hash or default version
     * @return {SecureHash}
     */
    getSecureHash() {
        if (this._secureHash == null) {
            this._secureHash = new secure_hash_impl_1.SecureHashImpl();
        }
        return this._secureHash;
    }
    /**
     * Setter secureHash
     * @param {SecureHash} value
     */
    setSecureHash(value) {
        this._secureHash = value;
        return this;
    }
    /**
     * Getter userAuthenticator
     * @return {UserAuthenticator<P>}
     */
    getUserAuthenticator() {
        if (this._userAuthenticator == null) {
            this._userAuthenticator = new user_authenticator_impl_1.UserAuthenticatorImpl(this.getPrincipalDao(), this.getSecureHash());
        }
        return this._userAuthenticator;
    }
    /**
     * Setter userAuthenticator
     * @param {UserAuthenticator<P>} value
     */
    setUserAuthenticator(value) {
        this._userAuthenticator = value;
        return this;
    }
    /**
     * Getter tokenAuthenticator
     * @return {TokenAuthenticator<P>}
     */
    getTokenAuthenticator() {
        if (this._tokenAuthenticator == null) {
            this._tokenAuthenticator = new token_authenticator_impl_1.TokenAuthenticatorImpl(this.getTokenEncoder(), this.getTokenDao(), this.getSecureHash(), this.getExpiryChecker());
        }
        return this._tokenAuthenticator;
    }
    /**
     * Setter tokenAuthenticator
     * @param {TokenAuthenticator<P>} value
     */
    setTokenAuthenticator(value) {
        this._tokenAuthenticator = value;
        return this;
    }
    /**
     * Getter tokenEncoder
     * @return {TokenEncoder}
     */
    getTokenEncoder() {
        if (this._tokenEncoder == null) {
            this._tokenEncoder = new token_encoder_string_separated_1.TokenEncoderStringSeparated('.');
        }
        return this._tokenEncoder;
    }
    /**
     * Setter tokenEncoder
     * @param {TokenEncoder} value
     */
    setTokenEncoder(value) {
        this._tokenEncoder = value;
        return this;
    }
    /**
     * Getter tokenCreator
     * @return {TokenCreator<P>}
     */
    getTokenCreator() {
        if (this._tokenCreator == null) {
            this._tokenCreator = new token_creator_impl_1.TokenCreatorImpl(this.getTokenKeyCreator(), this.getSecureHash(), this.getRandomStringGenerator(), this.getDateProvider(), this.getTokenLength(), this.getExpiryConfig());
        }
        return this._tokenCreator;
    }
    /**
     * Setter tokenCreator
     * @param {TokenCreator<P>} value
     */
    setTokenCreator(value) {
        this._tokenCreator = value;
        return this;
    }
    /**
     * Getter tokenKeyCreator
     * @return {TokenKeyCreator<P>}
     */
    getTokenKeyCreator() {
        if (this._tokenKeyCreator == null) {
            this._tokenKeyCreator = new token_key_creator_random_1.TokenKeyCreatorRandom(this.getRandomStringGenerator(), this.getKeyLength());
        }
        return this._tokenKeyCreator;
    }
    /**
     * Setter tokenKeyCreator
     * @param {TokenKeyCreator<P>} value
     */
    setTokenKeyCreator(value) {
        this._tokenKeyCreator = value;
        return this;
    }
    /**
     * Getter keyLength
     * @return {number}
     */
    getKeyLength() {
        return this._keyLength;
    }
    /**
     * Setter keyLength
     * @param {number} value
     */
    setKeyLength(value) {
        this._keyLength = value;
        return this;
    }
    /**
     * Getter randomStringGenerator
     * @return {RandomStringGenerator}
     */
    getRandomStringGenerator() {
        if (this._randomStringGenerator == null) {
            this._randomStringGenerator = new random_string_generator_impl_1.RandomStringGeneratorImpl();
        }
        return this._randomStringGenerator;
    }
    /**
     * Setter randomStringGenerator
     * @param {RandomStringGenerator} value
     */
    setRandomStringGenerator(value) {
        this._randomStringGenerator = value;
        return this;
    }
    /**
     * Getter dateProvider
     * @return {DateProvider}
     */
    getDateProvider() {
        if (this._dateProvider == null) {
            this._dateProvider = new date_provider_system_1.DateProviderSystem();
        }
        return this._dateProvider;
    }
    /**
     * Setter dateProvider
     * @param {DateProvider} value
     */
    setDateProvider(value) {
        this._dateProvider = value;
        return this;
    }
    /**
     * Getter expiryChecker
     * @return {ExpiryChecker}
     */
    getExpiryChecker() {
        if (this._expiryChecker == null) {
            this._expiryChecker = new expiry_checker_impl_1.ExpiryCheckerImpl(this.getDateProvider());
        }
        return this._expiryChecker;
    }
    /**
     * Setter expiryChecker
     * @param {ExpiryChecker} value
     */
    setExpiryChecker(value) {
        this._expiryChecker = value;
        return this;
    }
    /**
     * Getter tokenLength
     * @return {number }
     */
    getTokenLength() {
        return this._tokenLength;
    }
    /**
     * Setter tokenLength
     * @param {number } value
     */
    setTokenLength(value) {
        this._tokenLength = value;
        return this;
    }
    /**
     * Getter expiryConfig
     * @return {ExpiryConfig }
     */
    getExpiryConfig() {
        return this._expiryConfig;
    }
    /**
     * Setter expiryConfig
     * @param {ExpiryConfig } value
     */
    setExpiryConfig(value) {
        this._expiryConfig = value;
        return this;
    }
}
exports.AuthenticationServiceBuilder = AuthenticationServiceBuilder;
