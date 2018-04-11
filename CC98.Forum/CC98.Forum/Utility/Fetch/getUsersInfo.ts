import { UserInfo } from '../../States/AppState';

import {
    getUsersInfo as getIndexedDBUsersInfo,
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
 * 使用用户id批量查询用户信息
 * @param {number} userIds 用户id
 * @returns {Promise<UserInfo[]>} 用户信息
 * @author AsukaSong
 */
export async function getUsersInfo(userIds: number[]): Promise<UserInfo[]>;
/**
 * 使用用户名批量查询用户信息
 * @param {string} userNames 用户名
 * @returns {Promise<UserInfo[]>} 用户信息
 * @author AsukaSong
 */
export async function getUsersInfo(userNames: string[]): Promise<UserInfo[]>;
export async function getUsersInfo(keys: (number | string)[]): Promise<UserInfo[]> {
    try {
        // 缓存未命中的项，其值为对应的key，以便进一步通过api查询
        let infos: (UserInfo | number | string)[];

        if(window.indexedDB) {
            infos = (await getIndexedDBUsersInfo(keys)).map((item, index) => (item || keys[index]));
        } else {
            infos = keys.map(item => (getLocalStorage(typeof item === 'number' ? `userId_${item}`: `userName_${item}`)) || item);
        }

        // 批量查询未命中的项
        let querys = infos.filter(item => (typeof item === 'number' || typeof item === 'string'));
        const url = typeof keys[0] === 'number' ? `/user?id=${keys.join('&id=')}` : `/user/name?name=${keys.map(encodeURIComponent).join('&name=')}`;
        let headers = await formAuthorizeHeader();
        let res = await cc98Fetch(url, { headers });
        let queryInfo: UserInfo[] = await res.json();

        // 填充通过api查到的项
        let userInfos = infos.map(item => {
            if(typeof item === 'number' || typeof item === 'string') {
                let userInfo = queryInfo.shift();
                // 未命中的项加入缓存
                if(window.indexedDB) {
                    addUserInfo(userInfo);
                } else {
                    setLocalStorage(`userId_${userInfo.id}`, userInfo, 3600);
                    setLocalStorage(`userName_${userInfo.name}`, userInfo, 3600);
                }
                return userInfo;
            } else {
                return item;
            }
        })

        return userInfos;
    } catch(e) {
        
    }
}
