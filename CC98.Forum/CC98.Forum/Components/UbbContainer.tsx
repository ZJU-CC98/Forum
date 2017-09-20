// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from '../Ubb/UbbCodeExtension';

export class UbbContainerProps {
	code: string;
	engine?: Ubb.UbbCodeEngine;
	options?: Ubb.UbbCodeOptions;
}

export class UbbContainer extends React.Component<UbbContainerProps, {}> {

	render() {

		// 获取引擎对象，如果不使用引擎对象则创建一个默认的
		const engine = this.props.engine || Ubb.createEngine();
		// 获取选项，如果不设置选项则创建一个默认的
		const options = this.props.options || new Ubb.UbbCodeOptions();

		const ubbHtml = engine.exec(this.props.code, options);

		//打开回车与空格
		const style = {
			whiteSpace: 'pre-line'

		};

		// 注意兼容性设置， HTML4 不支持 article 标签
		if (options.compatibility === Ubb.UbbCompatiblityMode.Transitional) {
			return <blockquote style={style}>{ubbHtml}</blockquote>;
		} else {
			return <article style={style}>{ubbHtml}</article>;
		}
	}

}