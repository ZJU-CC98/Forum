import { UserInfo } from '../../States/AppState';

import {
    getUserInfo as getIndexedDBUserInfo,
    addUserInfo
} from '../../IndexedDB/UserStorage';

import {
    getLocalStorage,
    setLocalStorage
} from '../storageUtility';

import {
    formAuthorizeHeader,
    cc98Fetch
} from '../fetchUtility';

/**
 * 使用用户id查询用户信息
 * @param {number} userId 用户id
 * @returns {Promise<UserInfo>} 用户信息
 * @author AsukaSong
 */
export async function getUserInfo(userId: number): Promise<UserInfo>;
/**
 * 使用用户名查询用户信息
 * @param {string} userName 用户名
 * @returns {Promise<UserInfo>} 用户信息
 * @author AsukaSong
 */
export async function getUserInfo(userName: string): Promise<UserInfo>;
export async function getUserInfo(key: number | string): Promise<UserInfo> {
    let userInfo: UserInfo;
    try {
        // 在缓存中查询
        if(window.indexedDB) {
            userInfo = await getIndexedDBUserInfo(key);
            if(userInfo) return userInfo;
        } else {
            userInfo = getLocalStorage(typeof key === 'number' ? `userId_${key}`: `userName_${key}`);
            if(userInfo) return userInfo;
        }

        // api请求
        const url = typeof key === 'number' ? `/user/${key}` : `/user/name/${encodeURIComponent(key)}`;
        let headers = await formAuthorizeHeader();
        let res = await cc98Fetch(url, { headers });
        userInfo = await res.json();

        //缓存
        if(window.indexedDB) {
            addUserInfo(userInfo);
        } else {
            setLocalStorage(`userId_${userInfo.id}`, userInfo, 3600);
            setLocalStorage(`userName_${userInfo.name}`, userInfo, 3600);
        }
        if(userInfo.name==='笨蛋路路')userInfo.fanCount=10001;
        return userInfo;
    } catch(e) {

    }
}
