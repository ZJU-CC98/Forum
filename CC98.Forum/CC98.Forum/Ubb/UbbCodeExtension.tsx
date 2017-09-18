// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as Ubb from './Core';
import { BTagHandler } from './BTagHandler';
import { ImageTagHandler } from './ImageTagHandler';
import { ITagHandler } from './ITagHandler';
import { SizeTagHandler } from './SizeTagHandler';
import {
    QuoteTagHandler,
    QuotexTagHandler
} from './QuoteTagHandler';
import { ColorTagHandler } from './ColorTagHandler';
import { UrlTagHandler as URLTagHandler } from './URLTagHandler';
import { UTagHandler } from './UTagHandler';
import { DelTagHandler } from './DelTagHandler';
import { MP3TagHandler } from './MP3TagHandler';
import { CursorTagHandler } from './CursorTagHandler';
import { EnglishTagHandler } from './EnglishTagHandler';
import { UserTagHandler } from './UserTagHandler';
import { CodeTagHandler } from './CodeTagHandler';

/**
 * 创建一个具有所有功能的默认引擎。
 */
export function createEngine(): Ubb.UbbCodeEngine {

	const engine = new Ubb.UbbCodeEngine();

	// 在此处添加引擎所支持的所有标签处理器
	engine.tagHandlers.register(new BTagHandler());
    engine.tagHandlers.register(new ImageTagHandler());
    engine.tagHandlers.register(new ITagHandler());
    engine.tagHandlers.register(new SizeTagHandler());
    engine.tagHandlers.register(new QuoteTagHandler());
    engine.tagHandlers.register(new QuotexTagHandler());
    engine.tagHandlers.register(new ColorTagHandler());
    engine.tagHandlers.register(new URLTagHandler());
    engine.tagHandlers.register(new UTagHandler());
    engine.tagHandlers.register(new DelTagHandler());
    engine.tagHandlers.register(new MP3TagHandler());
    engine.tagHandlers.register(new CursorTagHandler());
    engine.tagHandlers.register(new EnglishTagHandler());
    engine.tagHandlers.register(new UserTagHandler());
    engine.tagHandlers.register(new CodeTagHandler());

	return engine;
}

// 重新导出核心功能
export * from './Core';