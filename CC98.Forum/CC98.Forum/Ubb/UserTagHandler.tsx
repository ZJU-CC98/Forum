// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
/**
 * 处理 [user] 标签的处理器。
 */
export class UserTagHandler extends Ubb.TextTagHandler {

	get tagName(): string { return 'user' };

	execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        const userName = content;
        const style = {
            cursor: 'pointer'
        };

        return <a href={`/user/name${encodeURI(userName)}`} style={style}>{userName}</a>;
	}
}