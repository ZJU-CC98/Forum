// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../Utility';
/**
 * 组件状态
 */
class UbbEditorState {
    /**
    * 表示UBB编辑器的内容
    */
    value: string;
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
}

/**
 * UBB编辑器组件
 */
export class UbbEditor extends React.Component<{update: Function}, UbbEditorState> {
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
            value: '',
            selectionEnd: 0,
            selectionStart: 0,
            clicked: false,
            extendValue: '',
            extendTagName: ''
        };
        this.handleExtendValueChange = this.handleExtendValueChange.bind(this);
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
        this.handleTextareaBlur = this.handleTextareaBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
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
        this.setState({
            value: value
        });
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
            let before = prevState.value.slice(0, prevState.selectionStart),
                selected = prevState.value.slice(prevState.selectionStart, prevState.selectionEnd),
                after = prevState.value.slice(prevState.selectionEnd, prevState.value.length);
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
            return {
                value: before + selected + after,
                selectionStart: before.length,
                selectionEnd: before.length + selected.length,
                clicked: true,
                extendTagName: '',
                extendValue: ''
            };
        });
        
    }

    componentDidUpdate() {
        if (this.state.clicked) {
            this.content.focus();
            this.content.setSelectionRange(this.state.selectionStart, this.state.selectionEnd);
            this.setState({
                clicked: false
            });
        }
    }

    render() {
        const size = ['', 1, 2, 3, 4, 5, 6, 7];
        const color = ['颜色', 'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];
        const textarea = (<textarea
            onInput={() => ('')}
            value={this.state.value}
            onChange={(e) => { this.handleTextareaChange(e.target.value); }}
            onBlur={(e) => {
                let target: any = e.target;
                this.handleTextareaBlur(target.selectionStart, target.selectionEnd);
            }}
            ref={(textarea) => {
                this.content = textarea;
            }}
        ></textarea>);

        return (
            
            <div className="ubb-editor">
                <div className="editor-buttons">
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
                        <select onChange={(e) => { this.handleButtonClick('size', e.target.value); (e.target.value as any) = 0; }} value={0}>
                            {size.map((value, index) => (<option value={index} disabled={index === 0} style={{ display: index === 0 ? 'none' : '' }}>{value}</option>))}
                        </select>
                        <p className="fa-text-height"></p>
                        <select onChange={(e) => { this.handleButtonClick('color', e.target.value); (e.target.value as any) = "颜色"; }} value={"颜色"}>
                            {color.map((value, index) => (<option value={value} disabled={index === 0} style={{ backgroundColor: value, display: index === 0 ? 'none' : '' }}></option>))}
                        </select>
                    </div>
                    <div className="editor-buttons-extends">
                        <button className="fa-link" type="button" title="插入url" onClick={() => { this.handleExtendButtonClick('url'); }}></button>
                        <button className="fa-picture-o" type="button" title="插入图片" onClick={() => { this.handleExtendButtonClick('img'); }}></button>
                        <button className="fa-film" type="button" title="插入视频" onClick={() => { this.handleExtendButtonClick('video'); }}></button>
                        <button className="fa-music" type="button" title="插入音频" onClick={() => { this.handleExtendButtonClick('audio'); }}></button>
                    </div>
                </div>
                <div className="ubb-extend" style={{ height: this.state.extendTagName ? '2rem' : '0rem' }}>
                    <p>请输入地址：</p>
                    <input
                        type="text"
                        value={this.state.extendValue}
                        onChange={(e) => { this.handleExtendValueChange(e.target.value); }}
                        ref={(it) => { this.input = it; }}
                    />
                    {this.state.extendTagName === 'img' ? <label className="fa-upload" htmlFor="upload"></label> : null}
                    <button className="fa-check" type="button" onClick={() => { this.handleButtonClick(this.state.extendTagName, this.state.extendValue) }}></button>
                    <button className="fa-remove" type="button" onClick={() => { this.setState({ extendTagName: ''}); }}></button>
                    <input type="file" id="upload" accept="image/*" style={{ display: 'none' }} onChange={(e) => { this.handleUpload(e.target.files[0]); }} />
                </div>
                <div className="ubb-content">
                    {textarea}
                </div>
            </div>
        );
    }
}


