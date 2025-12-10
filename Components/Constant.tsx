/**
 * 系统级别配置对象。
 */
export interface IConfig {
  /**
   * API 调用基础路径。
   */
  apiUrl: string;
  /**
   * OPENID 调用基础路径。
   */
  openIdUrl: string;
  /**
   * 图片上传路径。
   */
  imageUploadUrl: string;
  /**
   * 默认主题值。
   */
  defaultTheme: number;
}

declare const __APP_CONFIG__: IConfig;

/**
 * 提供服务器端全局数据。
 */
export module Constants {
  export var testEditor;

  /**
   * 应用程序全局设置。
   */
  export var config: IConfig;

  /**
   * 提供加载全局配置信息的方法。
   */
  export async function loadConfig() {
    const missingKeys = ["apiUrl", "openIdUrl", "imageUploadUrl"].filter(
      (key) => !__APP_CONFIG__[key]
    );

    if (missingKeys.length) {
      throw new Error(
        `缺少必要的配置项: ${missingKeys.join(", ")}。请检查环境变量。`
      );
    }

    config = {
      apiUrl: __APP_CONFIG__.apiUrl,
      openIdUrl: __APP_CONFIG__.openIdUrl,
      imageUploadUrl: __APP_CONFIG__.imageUploadUrl,
      defaultTheme:
        __APP_CONFIG__.defaultTheme !== undefined
          ? Number(__APP_CONFIG__.defaultTheme)
          : 4,
    };

    const configLoadEvent = new CustomEvent<IConfig>("configload", {
      detail: config,
    });

    window.dispatchEvent(configLoadEvent);
  }
}
