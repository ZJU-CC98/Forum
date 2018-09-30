/**
 * 配置项
 * @author AsukaSong
 * @date 2018/9/30
 */

/**
 * 是否启用indexedDb
 */
export const shouldUseIndexedDb = !!window.indexedDB && navigator.userAgent.indexOf('MSIE') === -1;