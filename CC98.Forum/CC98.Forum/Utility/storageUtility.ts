import { history } from '../Store';
//与缓存相关的函数
export function setStorage(key, value) {
    let v = value;
    if (typeof v == 'object') {
        v = JSON.stringify(v);
        v = `obj-${v}`;
    } else {
        v = `str-${v}`;
    }
    sessionStorage.setItem(key, v);
}

export function getStorage(key) {
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

export function removeStorage(key) {
    if (key != 'all') {
        sessionStorage.removeItem(key);
    }
    else {
        sessionStorage.clear();
    }
    return;
}

export function setLocalStorage(key, value, expireIn = 0) {
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

export function getLocalStorage(key) {
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
        const obj = JSON.parse(v);
        console.log('===')
        console.log(typeof obj)
        // 锁定用户检测退出登录
        if (key === 'userInfo') {
            if (obj.lockState === 1 || obj.lockState === 2) {
                localStorage.clear()
                window.location.href = 'https://www.cc98.org/logon'
                return obj
            }
        }
        return obj
    } else if (v.indexOf('str-') === 0) {
        return v.slice(4);
    }
}

export function removeLocalStorage(key) {
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
