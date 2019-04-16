// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from '../Ubb/UbbCodeExtension';
/**
 * 定义 UBBContainer 组件需要使用的属性。
 */
export class UbbContainerProps {
	/**
	 * UBB 容器需要解析的 UBB 代码字符串。
	 */
	code: string;
	/**
	 * UBB 容器使用的 UBB 引擎。引擎可在多次解析时重复使用，从而实现对整个文档的跨容器状态维护（如对特定内容进行统一计数等）。
	 */
	engine?: Ubb.UbbCodeEngine;
	/**
	 * UBB 解析时使用的相关选项。
	 */
	options?: Partial<Ubb.UbbCodeOptions>;
	/**
	 * 签名档特供
	 */
	isSignature?: boolean;
}

/**
 * 提供用于解析 UBB 的核心组件。
 */
export class UbbContainer extends React.PureComponent<UbbContainerProps, {}> {

	render() {
		const { isSignature } = this.props;
		// 获取引擎对象，如果不使用引擎对象则创建一个默认的
		const engine = this.props.engine || isSignature ? Ubb.createSignatureEngine() : Ubb.createEngine();
		// 获取选项，如果不设置选项则创建一个默认的
		const options = this.props.options || new Ubb.UbbCodeOptions();
        //code为一段UBB字符串
        let { code } = this.props;

        //替换掉code中形如&#\d{5};的部分
        //let r = /&#(\d{5});/gi;
        //code = code.replace(r, (match, grp) => (String.fromCharCode(grp)));

        const ubbHtml = engine.exec(String(code), options as Ubb.UbbCodeOptions);
        
		//打开回车与空格
		const style = {
			whiteSpace: 'pre-wrap',
            width: "100%"
		} as React.CSSProperties;

		// 注意兼容性设置， HTML4 不支持 article 标签
		if (options.compatibility === Ubb.UbbCompatiblityMode.Transitional) {
			return <blockquote style={style}>{ubbHtml}</blockquote>;
		} else {
			return <article style={style}>{ubbHtml}</article>;
		}
	}

}