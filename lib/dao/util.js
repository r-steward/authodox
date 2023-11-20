"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenSearchCriteriaSingleToken = exports.createTokenSearchCriteriaByTypeAndUser = exports.createTokenSearchCriteriaUser = void 0;
const token_dao_1 = require("./token-dao");
/**
 * Token Dao search criteria
 * @param username
 */
const createTokenSearchCriteriaUser = (username) => ({
    searchType: token_dao_1.TokenCriteriaSearchType.User,
    username,
});
exports.createTokenSearchCriteriaUser = createTokenSearchCriteriaUser;
/**
 * Token Dao search criteria
 * @param username
 */
const createTokenSearchCriteriaByTypeAndUser = (username, tokenType) => ({
    searchType: token_dao_1.TokenCriteriaSearchType.UserTokenType,
    username,
    tokenType,
});
exports.createTokenSearchCriteriaByTypeAndUser = createTokenSearchCriteriaByTypeAndUser;
/**
 * Token Dao search criteria
 * @param username
 */
const createTokenSearchCriteriaSingleToken = (token) => ({
    searchType: token_dao_1.TokenCriteriaSearchType.Token,
    token,
});
exports.createTokenSearchCriteriaSingleToken = createTokenSearchCriteriaSingleToken;
