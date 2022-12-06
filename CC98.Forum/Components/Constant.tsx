/**
* 系统级别配置对象。
*/
export interface IConfig {
	/**
	 * API 调用基础路径。
	 */
	apiUrl: string;
	/**
	 * 图片上传路径。
	 */
	imageUploadUrl: string;
	/**
	 * 默认主题值。
	 */
	defaultTheme: number;
}

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

		// 加载基本配置
		const configResponse = await fetch('/static/config.json');

		if (!configResponse.ok) {
			throw new Error('系统无法读取配置文件，网站无法正常运行');
		}

		config = await configResponse.json();

		// 加载运行时配置（如果存在）
		try {
			const productionConfigResponse = await fetch('/static/config.production.json');
			const productionConfig = await productionConfigResponse.json() as IConfig;
			config = { ...config, ...productionConfig };

		} catch (e) {
			
		}
	}

}


