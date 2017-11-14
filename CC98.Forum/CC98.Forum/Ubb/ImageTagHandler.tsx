// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export class ImageTagHandler extends Ubb.TextTagHandler {

	get supportedTagNames(): string { return 'img' };

	execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

		const imageUri = content;
		const title = tagData.value('title');

		// 不允许显示图像
		if (!context.options.allowImage) {
			return content;
		}

		const imageTag = <img src={imageUri} alt={title} />;

		// HTML5 模式下，使用 figure 表示插图
		if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
			return <figure>
				{imageTag}
				<figcaption>{title}</figcaption>
			</figure>;
		} else {
			return imageTag;
		}
	}
}