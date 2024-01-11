/**
 * @description 对IndexedDB的相关封装
 * @author AuskaSong
 */
export namespace IndexedDB {
    /**
     * IDBDatabase对象
     */
    export let db: IDBDatabase;

    /**
     * 版本号
     * 添加新仓库时更新
     */
    const version = 1;

    /**
     * 开始IndexedDB连接，默认在app加载时进行
     * @returns void
     */
    export async function start() {
        let req = indexedDB.open('cc98', version);
        req.onupgradeneeded = e => {
            if(!req.result.objectStoreNames.contains("userInfo")) {
                // 初始化
                let store: IDBObjectStore = req.result.createObjectStore("userInfo", { keyPath: 'userInfo.id' });
                // 为name添加索引
                store.createIndex('name','userInfo.name', { unique: true });
            }
        }
        if(db) return ;
        return new Promise<void>((resolve, reject) => {
            req.onsuccess = e => {
                // 取得IDBDatabase对象
                db = req.result;
                resolve();
            };
            req.onerror = e => reject(e);
        });
    }
}
