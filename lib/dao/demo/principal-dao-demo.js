"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrincipalDaoDemo = void 0;
const memory_dao_1 = require("./memory-dao");
/**
 * Demo Principal dao
 * Keeps principals in memory using the 'username' property as ID.
 */
class PrincipalDaoDemo {
    constructor(items) {
        this._key = ((prop) => prop)('username');
        this._storage = new memory_dao_1.MemoryDao(this._key, () => false, 0, items);
    }
    updatePrincipal(principal) {
        return this._storage.save(principal);
    }
    savePrincipal(principal) {
        return this._storage.save(principal);
    }
    getPrincipal(username) {
        return this._storage.getById(username);
    }
}
exports.PrincipalDaoDemo = PrincipalDaoDemo;
