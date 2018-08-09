import * as React from 'react'
import * as utility from '../utility'
import * as ConfigType from '../IConfig'

// components
import { CustomTextArea } from './customtextarea'
import { Buttons } from './buttons'
import { Extends } from './extends'
import { Message } from './message'
import Emoji from './emoji';

interface Props {
    value: string
    onChange: (newValue: string) => void
    option?: ConfigType.IConfigInProps
}

interface State {
    value: string
    selectionStart: number
    selectionEnd: number
    extendTagName: string
    message: string
    emojiType: ConfigType.emojiType
}

export class NewUbbEditor extends React.PureComponent<null, State> {
    constructor(props) {
        super(props)
        this.state = { 
            value: '',
            selectionStart: 0,
            selectionEnd: 0,
            extendTagName: '',
            message: '',
            emojiType: 'hide'
        }

        this.onChange = this.onChange.bind(this)
        this.changeValue = this.changeValue.bind(this)
        this.changeExtend = this.changeExtend.bind(this)
        this.message = this.message.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.changeEmojiType = this.changeEmojiType.bind(this)
        this.clearExtendAndEmoji = this.clearExtendAndEmoji.bind(this)
    }

    private customTextArea: CustomTextArea

    onChange = (value: string) => {
        this.setState({ value })
    }

    private changeExtend(extendTagName: string) {
        // 首次点击表情按钮
        if(extendTagName === 'emoji' && this.state.emojiType === 'hide') {
            this.setState({
                emojiType: 'ac'
            })
        }
        // 点击相同按钮时隐藏
        this.setState((prevState: State) => extendTagName === prevState.extendTagName ? {
            extendTagName: ''
        } : {
            extendTagName
        })
    }

    private changeValue(ubbSegment: ConfigType.IUbbSegment): void {
        const newState = utility.getNewState(this.state, ubbSegment)
        this.setState(newState, this.selectTextArea)
        this.clearExtendAndEmoji()
    }

    private selectTextArea() {
        this.customTextArea.textarea.focus()
        this.customTextArea.textarea.setSelectionRange(this.state.selectionStart, this.state.selectionEnd)
    }

    private async handleUpload(filelist: FileList, shouldCompassImage?: boolean) {
        let files = Array.from(filelist)
        try {
            if(this.state.extendTagName !== 'img' && 
                files.some(item => (
                    item.type.indexOf('image') === -1) &&   // 不是图片文件
                    item.size > 10485760                    // 并且大小超过限制
                )) {
                throw new Error('文件过大')
            }

            let results = await utility.uploadFiles(filelist, shouldCompassImage)
            results.map((item, index) => this.changeValue({
                type: 'extend',
                tagName: utility.getTagName(files[index]),
                content: item
            }))
        } catch(e) {
            this.message(e.message)
        }
    }

    private changeEmojiType(em: ConfigType.emojiType) {
        this.setState({
            emojiType: em
        })
    }

    message(message: string) {
        this.setState({
            message
        }, function () {
            setTimeout(() => {
                this.setState({ message: '' })
            }, 2000)
        })
    }

    clearExtendAndEmoji() {
        this.setState({
            extendTagName: ''
        })
    }

    componentDidMount() {
        // bind redo and undo for Buttons
        this.forceUpdate()

        window.addEventListener('click', this.clearExtendAndEmoji)
    }

    // componentWillReceiveProps(newProps: Props) {
    //     this.setState({
    //         value: newProps.value
    //     })
    // }

    render() {
        return (
            <div className="ubb-editor" >
                <Buttons 
                    changeValue={this.changeValue} 
                    changeExtendName={this.changeExtend} 
                    undo={this.customTextArea && this.customTextArea.undo}
                    redo={this.customTextArea && this.customTextArea.redo}
                />
                <Extends
                    extendTagName={this.state.extendTagName}
                    changeValue={this.changeValue}
                    clearShown={this.clearExtendAndEmoji}
                    extendIsShown={this.state.extendTagName && this.state.extendTagName !== 'emoji'}
                />
                <CustomTextArea 
                    value={this.state.value}
                    onChange={this.onChange}
                    ref={it => this.customTextArea = it} 
                    onBlur={e => {
                        const { selectionStart, selectionEnd } = e.target
                        this.setState({ selectionStart, selectionEnd })
                    }}
                    onDrop={e => {
                        let files = e.dataTransfer.files
                        if(files) this.handleUpload(files)
                    }}
                />
                <Message 
                    message={this.state.message} 
                />
                <input 
                    style={{ display: 'none' }} 
                    type="file" 
                    id="ubbFileUpload" 
                    multiple 
                    onChange={e => {
                        let filelist = e.target.files
                        this.handleUpload(filelist)
                        e.target.value = ''
                    }}
                />
                <Emoji 
                    changeValue={this.changeValue}
                    emojiType={this.state.emojiType} 
                    changeEmojiType={this.changeEmojiType}
                    emojiIsShown={this.state.extendTagName === 'emoji'}
                />
            </div>
        )
    }
}
