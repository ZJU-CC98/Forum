export function createAction<T extends string>(type: T): () => { type: T }
export function createAction<T extends string, P extends (...args: any[]) => { type: T, payload: any }>(type: T, creator: P): P
export function createAction(type, creator?) {
    if(creator) {
        return creator;
    } else {
        return () => { type };
    }
}
