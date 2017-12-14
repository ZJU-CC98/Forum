// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../Utility';
import { UbbContainer } from './UbbContainer';
/**
 * 组件属性
 */
class UbbEditorProps {
    /**
     * value变动后调用函数，接受一个参数为变动后的value
     */
    update: Function;
    /**
     * Ubb编辑器的内容
     */
    value: string;
    /**
     * textarea的高度(rem)
     */
    height?: number;
}
/**
 * 组件状态
 */
class UbbEditorState {
    /**
    * 用户所选文字的起始位置
    */
    selectionStart: number;
    /**
    * 用户所选文字的终止位置
    */
    selectionEnd: number;
    /**
    * 用户是否是通过点击按钮离开textarea
    */
    clicked: boolean;
    /**
    * 需要额外信息的tag
    */
    extendTagName: string;
    /**
    * 额外信息的内容
    */
    extendValue: string;
    /**
     * 是否显示表情栏
     */
    emojiIsShown: boolean;
    /**
     * 表情类型
     */
    emojiType: 'em' | 'ac' | 'majiang';
    /**
     * 是否在预览状态
     */
    isPreviewing: boolean;
}

/**
 * UBB编辑器组件
 */
export class UbbEditor extends React.Component<UbbEditorProps, UbbEditorState> {
    /**
    * 对textarea的引用
    */
    content: HTMLTextAreaElement;
    /**
    * 对input的引用
    */
    input: HTMLInputElement;

    constructor(props) {
        super(props);
        this.state = {
            selectionEnd: 0,
            selectionStart: 0,
            clicked: false,
            extendValue: '',
            extendTagName: '',
            emojiType: 'ac',
            emojiIsShown: false,
            isPreviewing: false
        };
        this.handleExtendValueChange = this.handleExtendValueChange.bind(this);
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
        this.handleTextareaBlur = this.handleTextareaBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleEmojiButtonClick = this.handleEmojiButtonClick.bind(this);
    }

    handleExtendButtonClick(tagName: string) {
        this.setState((prevState)=>({
            extendTagName: prevState.extendTagName !== tagName ? tagName : ''
        }));
        this.input.focus();
    }

    handleExtendValueChange(value: string) {
        this.setState({
            extendValue: value
        });
    }

    handleTextareaChange(value: string) {
        this.props.update(value);
    }

    handleTextareaBlur(start: number, end: number) {
        this.setState({
            selectionEnd: end,
            selectionStart: start
        });
    }

    async handleUpload(file: File) {
        let res = await Utility.uploadFile(file);
        this.handleButtonClick('img', `http://apitest.niconi.cc/${res.content}`);
    }

    handleButtonClick(name: string, value = '') {
        const shouldReplaceSelection = ['video', 'audio', 'img'].indexOf(name) !== -1;
        const hasDefaultSelection = ['url'].indexOf(name) !== -1;

        this.setState((prevState: UbbEditorState) => {
            let before = this.props.value.slice(0, prevState.selectionStart),
                selected = this.props.value.slice(prevState.selectionStart, prevState.selectionEnd),
                after = this.props.value.slice(prevState.selectionEnd, this.props.value.length);
            if (shouldReplaceSelection) {
                before = `${before}[${name}]`;
                selected = value;
                after = `[/${name}]${after}`;
            } else if (hasDefaultSelection) {
                before = `${before}[${name}${value ? `=${value}` : ''}]`;
                selected = selected || value;
                after = `[/${name}]${after}`;
            } else {
                before = `${before}[${name}${value ? `=${value}` : ''}]`;
                after = `[/${name}]${after}`;
            }
            this.props.update(before + selected + after);
            return {
                selectionStart: before.length,
                selectionEnd: before.length + selected.length,
                clicked: true
            };
        });
        
    }

    handleEmojiButtonClick(index: string) {
        this.setState((prevState) => {
            let before = this.props.value.slice(0, prevState.selectionStart),
                selected = `[${this.state.emojiType}${index}]`,
                after = this.props.value.slice(prevState.selectionEnd, this.props.value.length);
            this.props.update(before + selected + after);
            return {
                selectionStart: before.length,
                selectionEnd: before.length + selected.length,
                clicked: true
            };
        });
    }

    componentDidUpdate() {
        if (this.state.clicked && !this.state.isPreviewing) {
            this.content.focus();
            this.content.setSelectionRange(this.state.selectionStart, this.state.selectionEnd);
            this.setState({
                clicked: false
            });
        }
    }

    render() {
        const height = this.props.height || 32.5;
        const size = ['', 1, 2, 3, 4, 5, 6, 7];
        const color = ['颜色', 'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];
        const emoji = {
            'em': new Array(92).fill(0)
                .map((item, index) => {
                    if (index < 10) {
                        return `0${index}`;
                    } else if ((index < 43) || (70 < index && index< 92)) {
                        return `${index}`;
                    }
                })
                .map((item) => (
                    item ? (<img
                        src={`http://www.cc98.org/emot/emot${item}.gif`}
                        onClick={() => { this.handleEmojiButtonClick(item) }}
                    ></img>) : null
                )),
            'ac': new Array(149).fill(0)
                .map((item, index) => {
                    if (index < 9) { return `0${index + 1}`; }
                    else if (index < 54) { return `${index + 1}`; }
                    else if (index < 94) { return `${index + 947}`; }
                    else { return `${index + 1907}`; }
                }).map((item) => (<img
                    src={`/images/ac/${item}.png`}
                    onClick={() => { this.handleEmojiButtonClick(item) }}
                ></img>))
        };

        return (
            <div className="ubb-editor" style={{maxHeight: `${height + 6.875}rem`}}>
                <div className="editor-buttons">
                    <div style={{ height: '2rem', display: 'flex', transitionDuration: '.5s', width: this.state.isPreviewing ? '0rem' : '40rem' }}>
                        <div className="editor-buttons-styles">
                            <button className="fa-bold" type="button" title="加粗" onClick={() => { this.handleButtonClick('b'); }}></button>
                            <button className="fa-italic" type="button" title="斜体" onClick={() => { this.handleButtonClick('i'); }}></button>
                            <button className="fa-underline" type="button" title="下划线" onClick={() => { this.handleButtonClick('u'); }}></button>
                            <button className="fa-align-left" type="button" title="左对齐" onClick={() => { this.handleButtonClick('align', 'left'); }}></button>
                            <button className="fa-align-center" type="button" title="居中" onClick={() => { this.handleButtonClick('align', 'center'); }}></button>
                            <button className="fa-align-right" type="button" title="右对齐" onClick={() => { this.handleButtonClick('align', 'right'); }}></button>
                        </div>
                        <div className="editor-buttons-selects">
                            <p className="fa-text-height"></p>
                            <select
                                onChange={(e) => { this.handleButtonClick('size', e.target.value); (e.target.value as any) = 0; }}
                                onClick={() => { this.setState({ extendTagName: '', extendValue: '', emojiIsShown: false}); }}
                                value={0}
                            >
                                {size.map((value, index) => (<option value={index} disabled={index === 0} style={{ display: index === 0 ? 'none' : '' }}>{value}</option>))}
                            </select>
                            <p className="fa-eyedropper"></p>
                            <select
                                onChange={(e) => { this.handleButtonClick('color', e.target.value); (e.target.value as any) = "颜色"; }}
                                onClick={() => { this.setState({ extendTagName: '', extendValue: '', emojiIsShown: false}); }}
                                value={"颜色"}
                            >
                                {color.map((value, index) => (<option value={value} disabled={index === 0} style={{ backgroundColor: value, display: index === 0 ? 'none' : '' }}></option>))}
                            </select>
                        </div>
                        <div className="editor-buttons-extends">
                            <button
                                className="fa-smile-o"
                                type="button"
                                title="插入表情"
                                onClick={() => {
                                this.setState((prev) => ({
                                    emojiIsShown: !prev.emojiIsShown,
                                    extendTagName: '',
                                    extendValue: ''
                                    }));
                                }}
                            ></button>
                            <button className="fa-link" type="button" title="插入url" onClick={() => { this.handleExtendButtonClick('url'); }}></button>
                            <button className="fa-picture-o" type="button" title="插入图片" onClick={() => { this.handleExtendButtonClick('img'); }}></button>
                            <button className="fa-film" type="button" title="插入视频" onClick={() => { this.handleExtendButtonClick('video'); }}></button>
                            <button className="fa-music" type="button" title="插入音频" onClick={() => { this.handleExtendButtonClick('audio'); }}></button>
                        </div>
                    </div>
                    <div style={{flexGrow: 1}}></div>
                    <button type="button" title="切换预览" onClick={() => { this.setState((prev) => ({ isPreviewing: !prev.isPreviewing, clicked: true, extendTagName: '', extendValue: '', emojiIsShown: false})); }} className="fa-window-maximize"></button>
                </div>
                <div className="ubb-extend" style={{ height: this.state.extendTagName ? '2rem' : '0rem' }}>
                    <input
                        type="text"
                        placeholder="在此输入地址"
                        value={this.state.extendValue}
                        onChange={(e) => { this.handleExtendValueChange(e.target.value); }}
                        ref={(it) => { this.input = it; }}
                    />
                    {this.state.extendTagName === 'img' ? <label className="fa-upload" htmlFor="upload"></label> : null}
                    <button className="fa-check" type="button" onClick={() => { this.handleButtonClick(this.state.extendTagName, this.state.extendValue) }}></button>
                    <button className="fa-remove" type="button" onClick={() => { this.setState({ extendTagName: '', clicked: true}); }}></button>
                    <input type="file" id="upload" accept="image/*" style={{ display: 'none' }} onChange={(e) => { this.handleUpload(e.target.files[0]); }} />
                </div>
                <div className="ubb-content">
                    {!this.state.isPreviewing ? (
                        <textarea
                            value={this.props.value}
                            onChange={(e) => { this.handleTextareaChange(e.target.value); }}
                            onFocus={() => {
                                this.setState({ extendTagName: '', extendValue: '', emojiIsShown: false });
                            }}
                            onBlur={(e) => {
                                let target: any = e.target;
                                this.handleTextareaBlur(target.selectionStart, target.selectionEnd);
                            }}
                            ref={(textarea) => {
                                this.content = textarea;
                            }}
                            style={{ height: this.state.extendTagName ? `${height}rem` : `${height + 2}rem` }}
                            spellCheck={false}
                        ></textarea>) : (<div className="ubb-editor-preview"><UbbContainer code={this.props.value} /></div>)}
                </div>
                <div className="ubb-emoji" style={this.state.emojiIsShown ? { height: '22rem', borderWidth: '1px', top: `-${height + 4 }rem` } : { height: '0rem', top: `-${height + 4}rem` }}>
                    <div className="ubb-emoji-buttons">
                        <button type="button" className={this.state.emojiType === 'ac' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} onClick={() => { this.setState({ emojiType: 'ac' }); }}>AC娘</button>
                        <button type="button" className={this.state.emojiType === 'majiang' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} onClick={() => { this.setState({ emojiType: 'majiang' }); }}>麻将脸</button>
                        <button type="button" className={this.state.emojiType === 'em' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} onClick={() => { this.setState({ emojiType: 'em' }); }}>经典</button>
                    </div>
                    <div className={`ubb-emoji-content ubb-emoji-content-${this.state.emojiType}`}>
                        {emoji[this.state.emojiType]}
                    </div>
                </div>
            </div>
        );
    }
}


