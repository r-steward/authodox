"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryDao = void 0;
/**
 * Simple in-memory map DAO
 */
class MemoryDao {
    constructor(key, predicate, timeout = 0, items) {
        this.data = new Map();
        this.count = 1;
        this._key = key;
        this._predicate = predicate;
        this._timeout = timeout;
        if (items != null) {
            items.map(i => this._save(i));
        }
    }
    _getId(t) {
        return t[this._key];
    }
    _save(item) {
        const obj = Object.assign({}, item);
        if (this._getId(obj) == null) {
            obj[this._key] = this.newId();
        }
        this.data.set(this._getId(obj), obj);
        return obj;
    }
    getById(id) {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.data.get(id)), this._timeout);
        });
    }
    get() {
        return new Promise(resolve => {
            setTimeout(() => resolve(Array.from(this.data.values())), this._timeout);
        });
    }
    search(sc) {
        return new Promise(resolve => {
            setTimeout(() => resolve(Array.from(this.data.values()).filter(i => this._predicate(i, sc))), this._timeout);
        });
    }
    save(item) {
        return new Promise(resolve => {
            const obj = this._save(item);
            setTimeout(() => resolve(obj), this._timeout);
        });
    }
    saveAll(item) {
        return Promise.resolve(item.map(i => this._save(i)));
    }
    delete(id) {
        return new Promise(resolve => {
            this.data.delete(id);
            setTimeout(() => resolve(), this._timeout);
        });
    }
    deleteItem(item) {
        const id = this._getId(item);
        return this.delete(id);
    }
    newId() {
        const ids = Array.from(this.data.entries()).map(i => this._getId(i[1]));
        const max = ids.length === 0 ? 0 : Math.max(...ids);
        return (isNaN(max) ? 0 : max) + 1;
    }
}
exports.MemoryDao = MemoryDao;
