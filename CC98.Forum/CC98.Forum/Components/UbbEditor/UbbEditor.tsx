// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import Props from '../../Props/UbbEditorProps';
import State from '../../States/UbbEditorState';
import Option from './Option';
import { UbbContainer } from '../UbbContainer';
import LazyImage from './LazyImage';
import Message from './Message';
import Emoji from './Emoji';

/**
 * UBB编辑器组件
 */
export class UbbEditor extends React.Component<Props, State> {
    /**
    * 对textarea的引用
    */
    content: HTMLTextAreaElement;
    /**
    * 对input的引用
    */
    input: HTMLInputElement;
    /**
     * Ubb编辑器的历史堆栈
     */
    valueStack: string[] = ['']
    /**
     * Ubb编辑器的redo堆栈
     */
    redoStack: string[] = []
    /**
     * UBB编辑器的选项
     */
    option: Option;
    /**
     * 对上传文件input的引用
     */
    uploadInput: HTMLInputElement;
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
            isPreviewing: false,
            value: '',
            info: '',
            scrollTop: 0
        };
        //创建一个默认选项，用props中的选项覆盖之
        this.option = { ...new Option(), ...props.option };
        this.clearAllShown = this.clearAllShown.bind(this);
        this.handleExtendValueChange = this.handleExtendValueChange.bind(this);
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
        this.handleTextareaBlur = this.handleTextareaBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleEmojiButtonClick = this.handleEmojiButtonClick.bind(this);
        this.changeEmojiType = this.changeEmojiType.bind(this);
    }

    //处理需要额外信息的按钮点击后的函数
    handleExtendButtonClick(tagName: string) {
        this.setState((prevState) => ({
            extendTagName: prevState.extendTagName !== tagName ? tagName : '',
            emojiIsShown: false
        }));
    }

    //处理需要额外信息的按钮确认后的函数
    handleExtendValueChange(value: string) {
        this.setState({
            extendValue: value
        });
    }

    //处理textarea内容改变后的函数
    handleTextareaChange(value: string) {
        //将输入内容压入历史堆栈
        this.valueStack.push(value);
        //更新父组件中的状态
        this.props.update(value);
        //更新state中的状态
        this.setState({ value });
    }

    //处理textarea失去焦点后的函数
    handleTextareaBlur(selectionStart: number, selectionEnd: number) {
        //记住用户离开后选择的范围
        this.setState({
            selectionStart,
            selectionEnd
        });
    }

    //处理上传文件的函数
    async handleUpload(files: FileList) {
        try{
            let { extendTagName = 'img' } = this.state;
            const url = `/file`;
            const myHeaders = await Utility.formAuthorizeHeader();
            let formdata = new FormData();
            for(let i = 0; i < files.length; i++){
                //除图片外判断文件大小，大于默认不上传
                if(extendTagName !== 'img' && files[i].size > this.option.uploadFileMaxSize){
                    throw new Error('文件过大');
                } else if(extendTagName === 'img' && !files[i].type.match('image')){
                    throw new Error('请选择图片文件');
                }
                formdata.append('files', files[i]);
            }
            formdata.append('contentType', "multipart/form-data");
            let res = await Utility.cc98Fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formdata
            });
            let data: string[] = await res.json();
            if (res.status === 200) {
                //根据type选择不同的tag
                data.map((item, index) => {
                    //图片与音频上传直接使用相应标签
                    //文件上传先根据扩展名判断，没有结果则根据mimetype判断
                    let tagName: string;
                    switch(extendTagName) {
                        case 'img': 
                        case 'audio': tagName = extendTagName; break;
                        default: tagName = this.getTagNameByName(files[index].name.toLocaleLowerCase()) || this.getTagNameByType(files[index].type);
                    }
                    this.handleButtonClick(tagName, item);
                });
                //清空filelist
                this.uploadInput.value = '';
            }else {
                throw new Error(`上传文件失败`);
            }
        }catch(e){
            this.setState({
                info: e.message
            });
            this.uploadInput.value = '';
            //显示信息2.5s后清除
            setTimeout(()=>this.setState({
                info: ''
            }), 2500);
        }
    }

    /**
     * 根据扩展名判断文件类型
     * @param fileName 文件名
     */
    getTagNameByName(fileName: string) {
        let names = fileName.split('.');
        //没有扩展名
        if(names.length === 1) return null;
        //最后一项为扩展名
        let extendName = names.pop();
        //根据不同扩展名返回不同tag
        if(this.option.videoExtendNames.indexOf(extendName) !== -1) return 'video';
        if(this.option.audioExtendNames.indexOf(extendName) !== -1) return 'audio';
        if(this.option.imageExtendNames.indexOf(extendName) !== -1) return 'img';
        return null;
    }

    /**
     * 根据mimetype判断文件类型
     * @param type 文件的type
     */
    getTagNameByType(type: string) {
        try{
            switch(type.match(/\w+/)[0]) {
                case "image": return 'img';
                case "video": return 'video';
                case "audio": return 'audio';
                default: return 'upload';
            }
        }catch(e) {
            return 'upload';
        }
    }

    //处理撤销操作的函数
    handleUndo() {
        this.setState((prevState) => {
            //如果用户未输入内容则不能撤销
            if (this.valueStack.length === 1) {
                return { value: '' }
            }
            //从历史堆栈弹出当前内容
            let prevValue = this.valueStack.pop();
            //把当前内容压入重做堆栈
            this.redoStack.push(prevValue);
            //直接获取历史堆栈最后一条内容，不弹出
            prevValue = this.valueStack[this.valueStack.length - 1];
            //更新父组件与state中的value
            this.props.update(prevValue);
            return { value: prevValue };
        });
    }

    //处理重做操作的函数
    handleRedo() {
        this.setState((prevState) => {
            //从重做堆栈中弹出最后一项
            let prevValue = this.redoStack.pop();
            //如果有内容
            if (prevValue) {
                //压入历史堆栈
                this.valueStack.push(prevValue);
                //更新父组件与state中的value
                this.props.update(prevValue);
                return { value: prevValue };
            }
        });
    }

    /**
     * 处理插入内容的核心函数，除表情外都在此实现
     * @param name UBB标签名
     * @param value UBB标签的可选属性
     */
    handleButtonClick(name: string, value = '') {
        //判断当前tag是否需要替换掉用户选中的内容
        const shouldReplaceSelection = this.option.shouldReplaceSelection.indexOf(name) !== -1;
        //判断当前tag是否包含默认的内容，一般只对url标签有效
        const hasDefaultSelection = this.option.hasDefaultSelection.indexOf(name) !== -1;
        //判断插入后不需要选中的tag
        const shouldNotSelected = this.option.shouldNotSelected.indexOf(name) !== -1;
        //插入文本后是否换行
        const shouldEnter = this.option.shouldEnter.indexOf(name) !== -1;
        this.setState((prevState: State) => {
            //分别获取用户选中的内容，选中部分之前的内容，选中部分之后的内容
            let before = this.state.value.slice(0, prevState.selectionStart),
                selected = this.state.value.slice(prevState.selectionStart, prevState.selectionEnd),
                after = this.state.value.slice(prevState.selectionEnd, this.state.value.length);
            //根据不同选项替换用户选中的部分
            if (shouldReplaceSelection) {
                selected = `[${name}]${value}[/${name}]`;
            } else if (hasDefaultSelection) {
                selected = `[${name}${value ? `=${value}` : ''}]${selected || value}[/${name}]`;
            } else {
                selected = `[${name}${value ? `=${value}` : ''}]${selected}[/${name}]`;
            }
            if(shouldEnter){
                selected += '\n';
            }
            //更新父组件中的状态
            this.props.update(before + selected + after);
            //将内容压入历史堆栈
            this.valueStack.push(before + selected + after);
            //更新state中的状态
            //不需要默认选中的tag返回selectionStart和selectionEnd相同
            return {
                selectionStart: shouldNotSelected ? before.length + selected.length : before.length, 
                selectionEnd: before.length + selected.length,
                clicked: true,
                value: before + selected + after
            };
        });

    }

    //处理插入表情的函数，大部分同上
    handleEmojiButtonClick(emojiUbb: string) {
        this.setState((prevState) => {
            let before = this.state.value.slice(0, prevState.selectionStart),
                selected = emojiUbb,
                after = this.state.value.slice(prevState.selectionEnd, this.state.value.length);
            this.props.update(before + selected + after);
            this.valueStack.push(before + selected + after);
            return {
                selectionStart: before.length + selected.length,
                selectionEnd: before.length + selected.length,
                clicked: true,
                value: before + selected + after
            };
        });
    }

    //取消表情和扩展内容的显示
    clearAllShown() {
        this.setState({
            emojiIsShown: false,
            extendTagName: '',
            extendValue: ''
        });
    }

    //改变当前显示的表情类型
    changeEmojiType(emojiType: 'em' | 'ac' | 'mj' | 'tb'){
        this.setState({
            emojiType
        });
    }

    //处理引用的内容更新
    componentWillReceiveProps(nextProps: Props) {
        //如果传入的内容和历史堆栈中的最后一项（当前内容）不相符
        //从props修改内容会触发（引用）
        if (this.valueStack[this.valueStack.length - 1] !== nextProps.value) {
            //将内容压入堆栈
            this.valueStack.push(nextProps.value);
            //输入过内容后清空重做堆栈
            this.redoStack = [];
            //更新state中的value
            this.setState({
                value: nextProps.value,
                //根据需求光标移至文本末尾
                selectionStart: nextProps.value.length,
                selectionEnd: nextProps.value.length,
                clicked: true
            });
        }
    }

    //处理用户点击后自动选中内容
    componentDidUpdate() {
        //如果用户点击了按钮，且不在预览状态
        if (this.state.clicked && !this.state.isPreviewing) {
            //将焦点聚焦到textarea
            this.content.focus();
            //选中替换掉的部分
            this.content.setSelectionRange(this.state.selectionStart, this.state.selectionEnd);
            //滚动条滚动到原来的位置
            this.content.scrollTop = this.state.scrollTop;
            //重置state中的状态
            this.setState({
                clicked: false
            });
        }
    }

    componentDidMount() {
        //在用户点击空白部分时隐藏扩展与表情
        window.addEventListener('click', this.clearAllShown);
        //处理spectrum（取色板）
        ($("#color") as any).spectrum({
            //默认颜色
            color: "#000",
            change: (color) => {
                //点击后调用处理函数
                this.handleButtonClick('color', color.toHexString());
                //重置颜色
                ($("#color") as any).spectrum('set', '#000000');
            },
            //显示选项
            showPalette: true,
            //选项中的颜色
            palette: [
                ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"],
                ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"]
            ],
            //替换掉默认的类名，便于写css
            replacerClassName: 'ubb-color-picker',
            //点击后隐藏
            hideAfterPaletteSelect: true
        });
    }

    componentWillUnmount() {
        //组件卸载时移除掉事件监听
        window.removeEventListener('click', this.clearAllShown);
    }

    render() {
        const { height, textSize, submit } = this.option;

        let acceptType: string;
        switch(this.state.extendTagName) {
            case 'img': acceptType = 'image/*'; break;
            case 'audio': acceptType = 'audio/*'; break;
            default: acceptType = '*';
        }
        
        return (
            <div className="ubb-editor" style={{ maxHeight: `${height + 6.125}rem` }}>
                {/*消息组件*/}
                <Message message={this.state.info} />
                {/*按钮组件 设置maxWidth在预览状态下收起按钮*/}
                <div className="editor-buttons">
                    <div style={{ height: '2rem', display: 'flex', transitionDuration: '.5s', overflow: 'hidden', maxWidth: this.state.isPreviewing ? '0rem' : '50rem' }}>
                        <div className="editor-buttons-styles">
                            <button className="fa-bold" type="button" title="加粗" onClick={() => { this.handleButtonClick('b'); }}></button>
                            <button className="fa-italic" type="button" title="斜体" onClick={() => { this.handleButtonClick('i'); }}></button>
                            <button className="fa-underline" type="button" title="下划线" onClick={() => { this.handleButtonClick('u'); }}></button>
                            <button className="fa-strikethrough" type="button" title="删除线" onClick={() => { this.handleButtonClick('del'); }}></button>
                            <button className="fa-align-left" type="button" title="左对齐" onClick={() => { this.handleButtonClick('align', 'left'); }}></button>
                            <button className="fa-align-center" type="button" title="居中" onClick={() => { this.handleButtonClick('align', 'center'); }}></button>
                            <button className="fa-align-right" type="button" title="右对齐" onClick={() => { this.handleButtonClick('align', 'right'); }}></button>
                            <button className="fa-eye-slash" type="button" title="回复后可见" onClick={() => { this.handleButtonClick('replyview'); }}></button>
                        </div>
                        <div className="editor-buttons-selects">
                            <p className="fa-text-height"></p>
                            <select
                                onChange={(e) => { this.handleButtonClick('size', e.target.value); (e.target.value as any) = 0; /*处理完select后重置为默认值*/ }}
                                onClick={() => { this.clearAllShown(); }}
                                value={0}
                            >
                                {textSize.map((value, index) => (<option key={index} value={index} disabled={index === 0}>{value}</option>))}
                            </select>
                            <p className="fa-eyedropper"></p>
                            {/*取色器，由spectrum实现*/}
                            <input id="color" />
                        </div>
                        <div className="editor-buttons-extends">
                            <button
                                className="fa-smile-o"
                                type="button"
                                title="插入表情"
                                onClick={(e) => {
                                    e.stopPropagation(); //阻止事件冒泡，防止被window上的清空显示函数捕获到，以下同理
                                    this.setState((prev) => ({
                                        emojiIsShown: !prev.emojiIsShown,
                                        extendTagName: '',
                                        extendValue: ''
                                    }));
                                }}
                            ></button>
                            <button className="fa-link" type="button" title="插入url" onClick={(e) => { e.stopPropagation(); this.handleExtendButtonClick('url'); }}></button>
                            <button className="fa-picture-o" type="button" title="插入图片" onClick={(e) => { e.stopPropagation(); this.handleExtendButtonClick('img'); }}></button>
                            <button className="fa-film" type="button" title="插入视频" onClick={(e) => { e.stopPropagation(); this.handleExtendButtonClick('video'); }}></button>
                            <button className="fa-music" type="button" title="插入音频" onClick={(e) => { e.stopPropagation(); this.handleExtendButtonClick('audio'); }}></button>
                            <label className="fa-file" htmlFor="upload" title="上传文件" onClick={(e) => { e.stopPropagation(); this.handleExtendButtonClick('upload'); return false }} ></label>
                        </div>
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                    <button className="fa-undo" type="button" title="撤销" onClick={() => { this.handleUndo(); }}></button>
                    <button className="fa-repeat" type="button" title="重做" onClick={() => { this.handleRedo(); }}></button>
                    <button type="button" title="切换预览" onClick={() => { this.setState((prev) => ({ isPreviewing: !prev.isPreviewing, clicked: true })); }} className="fa-window-maximize"></button>
                </div>
                {/*扩展内容，点击扩展按钮后显示*/}
                <div className="ubb-extend" style={{ height: this.state.extendTagName && this.state.extendTagName !== 'upload' ? '2rem' : '0rem' }}>
                    <input
                        type="text"
                        placeholder="在此输入地址"
                        value={this.state.extendValue}
                        onChange={(e) => { this.handleExtendValueChange(e.target.value); }}
                        onClick={(e) => { e.stopPropagation(); }}
                        ref={(it) => { this.input = it; /*取得对input的引用，方便focus*/ }}
                    />
                    {/*仅针对img与audio标签显示上传本地图片*/}
                    {this.state.extendTagName === 'img' || this.state.extendTagName === 'audio' ? <label onClick={(e) => { e.stopPropagation(); }} className="fa-upload" htmlFor="upload" title="上传本地文件"></label> : null}
                    <button className="fa-check" type="button" onClick={(e) => { e.stopPropagation(); this.handleButtonClick(this.state.extendTagName, this.state.extendValue) }}></button>
                    <button className="fa-remove" type="button" onClick={() => { this.setState({ clicked: true }); }}></button>
                    {this.state.extendTagName === 'img' ? <p style={{ color: 'gray', fontSize: '0.75rem', flexGrow: 1, textAlign: 'center' }}>也可以直接将图片文件拖曳到下面的文本区进行上传</p> : null}
                    {/*上传文件用，默认隐藏，img标签仅接受图片文件，上传完后value设为""可清空filelist*/}
                    <input
                        type="file"
                        id="upload"
                        accept={acceptType}
                        style={{ display: 'none' }}
                        onClick={ e =>  e.stopPropagation() }
                        onChange={ e =>  this.handleUpload(e.target.files) }
                        ref={ it=>this.uploadInput = it }
                        multiple
                    />
                </div>
                {/*编辑器，核心部分*/}
                <div className="ubb-content">
                    {!this.state.isPreviewing ? ( //非展示状态显示textarea
                        <textarea
                            value={ this.state.value }
                            onChange={ e => this.handleTextareaChange(e.target.value) }
                            onInput={ e => this.redoStack = [] /*用户输入内容后清空重做堆栈*/ }
                            onFocus={() => {
                                this.clearAllShown(); //点击后隐藏扩展与标签
                            }}
                            onBlur={e => {
                                let target: any = e.target;
                                //textarea失去焦点时记录用户选中内容
                                this.handleTextareaBlur(target.selectionStart, target.selectionEnd);
                            }}
                            onDrop={e => {
                                e.preventDefault();
                                this.handleUpload(e.dataTransfer.files);
                            }}
                            onScroll={e => {
                                //记录滚动条位置
                                this.setState({scrollTop: (e.target as any).scrollTop});
                            }}
                            onKeyDown={e => {
                                if (e.ctrlKey && e.key === 'z') {
                                    //Ctrl+Z撤销
                                    e.preventDefault();
                                    this.handleUndo();
                                } else if (e.ctrlKey && e.key === 'y') {
                                    //Ctrl+Y重做
                                    e.preventDefault();
                                    this.handleRedo();
                                } else if (e.ctrlKey && e.key === 'Enter') {
                                    //Crtl+Enter提交内容（如果option里有submit的话
                                    e.preventDefault();
                                    if (submit) {
                                        submit();
                                    }
                                }
                            }}
                            ref={textarea => {
                                //取得对textarea的引用，方便调用选中与聚焦的方法
                                this.content = textarea;
                            }}
                            style={{ height: this.state.extendTagName && this.state.extendTagName !== 'upload' ? `${height}rem` : `${height + 2}rem` }}
                            spellCheck={false}
                        ></textarea>) : //展示状态中显示UbbContainer
                        (<div className="ubb-editor-preview" style={{ height: `${height + 2}rem` }}><UbbContainer code={this.props.value} /></div>)}
                </div>
                {/*表情组件*/}
                <Emoji 
                    handleEmojiButtonClick={this.handleEmojiButtonClick} 
                    height={this.props.option.height} 
                    emojiIsShown={this.state.emojiIsShown} 
                    emojiType={this.state.emojiType}
                    changeEmojiType={this.changeEmojiType}
                />
            </div>
        );
    }
}
