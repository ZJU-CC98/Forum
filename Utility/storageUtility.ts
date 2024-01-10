import { MyInfo, UserInfo } from "../States/AppState";

//与缓存相关的函数
export function setStorage(key: string, value: any) {
    let v: string;
    if (typeof value == 'object') {
        v = JSON.stringify(value);
        v = `obj-${v}`;
    } else {
        v = `str-${value}`;
    }
    sessionStorage.setItem(key, v);
}

export function getStorage(key: string) {
    let v = sessionStorage.getItem(key);
    if (!v) {
        return;
    }
    if (v.indexOf('obj-') === 0) {
        v = v.slice(4);
        return JSON.parse(v);
    } else if (v.indexOf('str-') === 0) {
        return v.slice(4);
    }
}

/**
 * 从存储区中删除给定的对象。
 * @param {string} key 要移除的对象的键。如果为 all 则表示移除所有内容。
 */
export function removeStorage(key: string) : void {
    if (key != 'all') {
        sessionStorage.removeItem(key);
    }
    else {
        sessionStorage.clear();
    }
    return;
}

/**
 * 将值存入存储区。
 * @param {string} key 要存入的对象的键。
 * @param {any} value 要存入的值。
 * @param {number} expireIn 过期时间，以秒为单位。如果设定为 0 则表示不过期。
 */
export function setLocalStorage(key: string, value: any, expireIn: number = 0) {
    try {
        let v = value;
        if (typeof v == 'object') {
            v = JSON.stringify(v);
            v = `obj-${v}`;
        } else {
            v = `str-${v}`;
        }
        localStorage.setItem(key, v);

        if (expireIn !== 0) {
            const now = new Date().getTime();
            let expirationTime = now + expireIn * 1000;
            localStorage.setItem(`${key}_expirationTime`, expirationTime.toString().slice(0, expirationTime.toString().length - 3));
        } else {
            localStorage.removeItem(`${key}_expirationTime`);
        }
    } catch(e) {
        autoClearLocalStorage();
        setLocalStorage(key, value, expireIn);
    }
}

/**
 * 获取当前的用户信息。
 * @returns {MyInfo} 当前的用户信息。
 */
export function getMyInfo(): MyInfo {
    return getLocalStorage<MyInfo>("userInfo");
}

/**
 * 获取当前的访问令牌。
 * @returns {string} 当前活动的访问令牌。
 */
export function getAccessToken(): string {
    return getLocalStorage<string>("accessToken");
}

/**
 * 从存储区中获得具有给定键的对象。
 * @typeParam T 存储对象的类型。
 * @param {string} key 存储对象的键。
 * @returns {T} 具有给定对象的键。
 */
export function getLocalStorage<T>(key: string): T {
    let v = localStorage.getItem(key);
    let expirationTime = localStorage.getItem(`${key}_expirationTime`);
    if (expirationTime) {
        const now = new Date().getTime();
        const time = Number.parseInt(expirationTime) * 1000;

        if (now > time) {
            localStorage.removeItem(key);
            return;
        }
    }

    if (!v) {
        return;
    }

    if (v.indexOf('obj-') === 0) {
        v = v.slice(4);
        const obj = JSON.parse(v) as T;

        // 锁定用户检测退出登录
        if (key === 'userInfo') {
            const myInfo = obj as MyInfo;
            if (myInfo.lockState === 1 || myInfo.lockState === 2) {
                localStorage.clear()
                window.location.href = 'https://www.cc98.org/logon'
                return obj;
            }
        }
        return obj
    } else if (v.indexOf('str-') === 0) {
        return v.slice(4) as T;
    }
}

export function removeLocalStorage(key: string) {
    if (key != 'all') {
        localStorage.removeItem(key);
    }
    else {
        localStorage.clear();
    }
    return;
}

export function autoClearLocalStorage() {
        // 只保留必要的缓存
        let refresh_token = getLocalStorage('refresh_token');
        let refresh_token_expirationTime = localStorage.getItem('refresh_token_expirationTime');
        let temporaryContent = getLocalStorage('temporaryContent');
        let noticeSetting = getLocalStorage('noticeSetting');
        let userInfo = localStorage.getItem('userInfo');
        let version = localStorage.getItem('version');
        
        localStorage.clear();
        console.info('localStorage cleared');
        
        localStorage.setItem('version', version);
        if(refresh_token) {
            setLocalStorage('refresh_token', refresh_token);
            localStorage.setItem('refresh_token_expirationTime', refresh_token_expirationTime);
            localStorage.setItem('userInfo', userInfo);
        }
        if(temporaryContent) setLocalStorage('temporaryContent', temporaryContent);
        if(noticeSetting) setLocalStorage('noticeSetting', noticeSetting);
}
