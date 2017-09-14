// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as Ubb from './Core';
import { BTagHandler } from './BTagHandler';
import { ImageTagHandler } from './ImageTagHandler';

/**
 * 创建一个具有所有功能的默认引擎。
 */
export function createEngine(): Ubb.UbbCodeEngine {

	const engine = new Ubb.UbbCodeEngine();

	// 在此处添加引擎所支持的所有标签处理器
	engine.tagHandlers.register(new BTagHandler());
	engine.tagHandlers.register(new ImageTagHandler());

	return engine;
}

// 重新导出核心功能
export * from './Core';