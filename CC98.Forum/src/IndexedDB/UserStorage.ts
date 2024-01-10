import { UserInfo } from '../States/AppState';
import { IndexedDB } from './IndexedDB';

/**
 * 向storage中添加用户信息
 * @param {UserInfo} userInfo 要添加的用户信息
 * @returns {Pormise<void>} 无
 * @author AsukaSong
 */
export async function addUserInfo(userInfo: UserInfo) {
    let t = IndexedDB.db.transaction('userInfo', 'readwrite');
    let store = t.objectStore('userInfo');
    let req = store.put({
        userInfo,
        addTime: Date.now(),
    });
    return new Promise((resolve, reject) => {
        req.onsuccess = e => resolve();
        req.onerror = e => reject();
    }) as Promise<void>;
}

/**
 * 在storage中查询用户信息
 * @param {(number | string)} key 索引，数字表示用id查询，字符串表示用用户名查询
 * @returns {Pormise<UserInfo} 查找到的用户信息
 * @author AsukaSong
 */
export async function getUserInfo(key: number | string) {
    let t = IndexedDB.db.transaction('userInfo', 'readonly');
    let store = t.objectStore('userInfo');
    let req: IDBRequest;
    if(typeof key === 'number'){ 
        // search by userId
        req = store.get(key);
    } else if(typeof key === 'string') { 
        // serach by name
        req = store.index("name").get(key);
    } else { // id === null
        return {
            id: null
        } as UserInfo;
    }
    return new Promise((resolve, reject) => {
        req.onsuccess = e => {
            if(req.result && req.result.addTime + 3600000 > Date.now()){ // 默认3600s过期
                resolve(req.result.userInfo);
            } else {
                resolve(undefined);
            }
        } 
        req.onerror = e => reject();
    }) as Promise<UserInfo>;
}

/**
 * 批量查询用户信息
 * @param {((number | string)[])} keys 索引组成的数组
 * @returns {Promise<UserInfo[]>} 返回的用户信息
 * @author AsukaSong
 */
export async function getUsersInfo(keys: (number | string)[]) {
    let t = IndexedDB.db.transaction('userInfo', 'readonly');
    let store = t.objectStore('userInfo');
    return Promise.all(keys.map(item => {
        let req: IDBRequest;
        if(typeof item === 'number'){ 
            // search by userId
            req = store.get(item);
        } else if(typeof item === 'string') { 
            // serach by name
            req = store.index("name").get(item);
        } else { // id === null
            return {
                id: null
            } as UserInfo;
        }
        return new Promise((resolve, reject) => {
            req.onsuccess = e => {
                if(req.result && req.result.addTime + 3600000 > Date.now()){ // 默认3600s过期
                    resolve(req.result.userInfo);
                } else {
                    resolve(undefined);
                }
            };
            req.onerror = e => reject();
        }) as Promise<UserInfo>;
    }));
}

/**
 * 根据用户id删除indexdb中储存的用户信息
 * @param id 用户id
 * @returns {Promise<void>} 
 * @author AsukaSong
 */
export async function removeUserInfo(id: number): Promise<void> {
    let t = IndexedDB.db.transaction('userInfo', 'readwrite');
    let store = t.objectStore('userInfo');
    let req = store.delete(id);
    return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve();
        req.onerror = () => reject();
    }) as Promise<void>;
}