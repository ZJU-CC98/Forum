// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as Ubb from './Core';
import { BTagHandler } from './BTagHandler';
import { ImageTagHandler } from './ImageTagHandler';
import { ITagHandler } from './ITagHandler';
import { SizeTagHandler } from './SizeTagHandler';
import { QuoteTagHandler } from './QuoteTagHandler';
import { ColorTagHandler } from './ColorTagHandler';
import { UrlTagHandler } from './URLTagHandler';
import { UTagHandler } from './UTagHandler';
import { DelTagHandler } from './DelTagHandler';
import { MP3TagHandler } from './MP3TagHandler';
import { CursorTagHandler } from './CursorTagHandler';
import { EnglishTagHandler } from './EnglishTagHandler';
import { UserTagHandler } from './UserTagHandler';
import { CodeTagHandler } from './CodeTagHandler';
import { UnresolvedTagHandler } from './UnresolvedTagHandler';
import { FontTagHandler } from './FontTagHandler';
import { AlignTagHandler } from './AlignTagHandler';
import { UploadTagHandler } from './UploadTagHandler';
import { LeftTagHandler } from './LeftTagHandler';
import { CenterTagHandler } from './CenterTagHandler';
import { RightTagHandler } from './RightTagHandler';

/**
 * 创建一个具有所有功能的默认引擎。
 */
export function createEngine(): Ubb.UbbCodeEngine {

	const engine = new Ubb.UbbCodeEngine();

	// 在此处添加引擎所支持的所有标签处理器
	engine.tagHandlers.register(BTagHandler);
	engine.tagHandlers.register(ImageTagHandler);
	engine.tagHandlers.register(ITagHandler);
	engine.tagHandlers.register(SizeTagHandler);
	engine.tagHandlers.register(QuoteTagHandler);
	engine.tagHandlers.register(ColorTagHandler);
	engine.tagHandlers.register(UrlTagHandler);
	engine.tagHandlers.register(UTagHandler);
	engine.tagHandlers.register(DelTagHandler);
	engine.tagHandlers.register(MP3TagHandler);
	engine.tagHandlers.register(CursorTagHandler);
	engine.tagHandlers.register(EnglishTagHandler);
	engine.tagHandlers.register(UserTagHandler);
    engine.tagHandlers.register(CodeTagHandler);
    engine.tagHandlers.register(FontTagHandler);
    engine.tagHandlers.register(AlignTagHandler);
    engine.tagHandlers.register(UploadTagHandler);
    engine.tagHandlers.register(LeftTagHandler);
    engine.tagHandlers.register(CenterTagHandler);
    engine.tagHandlers.register(RightTagHandler);


	// 以下是未命名标签处理程序，注意未命名标签处理程序的命中和注册顺序有关
	engine.tagHandlers.register(UnresolvedTagHandler);

	return engine;
}

// 重新导出核心功能
export * from './Core';