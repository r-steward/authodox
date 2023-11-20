export interface TokenKeyCreator<P> {
    createKey(user: P): Promise<string>;
}
