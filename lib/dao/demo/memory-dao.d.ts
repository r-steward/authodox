/**
 * Simple in-memory map DAO
 */
export declare class MemoryDao<T extends object, ID, SC> {
    private readonly data;
    private count;
    private _key;
    private _predicate;
    private _timeout;
    constructor(key: string, predicate: (t: T, sc: SC) => boolean, timeout?: number, items?: ReadonlyArray<T>);
    private _getId;
    private _save;
    getById(id: ID): Promise<T>;
    get(): Promise<T[]>;
    search(sc: SC): Promise<T[]>;
    save(item: T): Promise<T>;
    saveAll(item: ReadonlyArray<T>): Promise<T[]>;
    delete(id: ID): Promise<void>;
    deleteItem(item: T): Promise<void>;
    newId(): number;
}
