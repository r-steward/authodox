"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDaoDemo = void 0;
const memory_dao_1 = require("./memory-dao");
const token_dao_1 = require("../token-dao");
/**
 * Demo token dao
 * Keeps tokens in memory using the 'key' property as ID.
 */
class TokenDaoDemo {
    constructor() {
        this._key = ((prop) => prop)('key');
        this._storage = new memory_dao_1.MemoryDao(this._key, () => false);
    }
    getAll() {
        return this._storage.get();
    }
    getToken(key) {
        return this._storage.getById(key);
    }
    saveToken(token) {
        return this._storage.save(token);
    }
    updateToken(token) {
        return this._storage.save(token);
    }
    deleteTokens(sc) {
        switch (sc.searchType) {
            case token_dao_1.TokenCriteriaSearchType.Token:
                return this._deleteToken(sc);
            case token_dao_1.TokenCriteriaSearchType.UserTokenType:
                return this._deleteTokenTypes(sc);
            case token_dao_1.TokenCriteriaSearchType.User:
                return this._deleteUserTokens(sc);
        }
    }
    async _deleteToken(sc) {
        return this._cascadeDelete(sc.token);
    }
    async _deleteTokenTypes(sc) {
        const allItems = await this._storage.get();
        allItems
            .filter(t => t.tokenType === sc.tokenType && t.principal.username === sc.username)
            .forEach(j => this._cascadeDelete(j));
    }
    async _deleteUserTokens(sc) {
        const allItems = await this._storage.get();
        allItems.filter(t => t.principal.username === sc.username).forEach(j => this._cascadeDelete(j));
    }
    async _cascadeDelete(t) {
        const thisKey = t.key;
        // delete children
        const allItems = await this._storage.get();
        allItems.filter(i => i.associatedKey === thisKey).forEach(j => this._cascadeDelete(j));
        // delete this
        return this._storage.deleteItem(t);
    }
}
exports.TokenDaoDemo = TokenDaoDemo;
