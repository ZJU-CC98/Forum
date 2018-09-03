import * as React from 'react'
import * as utility from '../utility'
import * as ConfigType from '../IConfig'

// components
import { CustomTextArea } from './customtextarea'
import { Buttons } from './buttons'
import { Extends } from './extends'
import { Message } from './message'
import Emoji from './emoji'
import { UbbContainer } from '../../UbbContainer'

interface Props {
    value: string
    update: (value: string) => void
    option?: ConfigType.IConfigInProps
}

interface State {
    value: string
    selectionStart: number
    selectionEnd: number
    extendTagName: string
    message: string
    emojiType: ConfigType.emojiType
    isPreviewing: boolean
    shouldCompassImage: boolean
}

export class UbbEditor extends React.PureComponent<Props, State> {
    constructor(props) {
        super(props)
        this.state = { 
            value: '',
            selectionStart: 0,
            selectionEnd: 0,
            extendTagName: '',
            message: '',
            emojiType: 'hide',
            isPreviewing: false,
            shouldCompassImage: true,
        }

        this.onChange = this.onChange.bind(this)
        this.changeValue = this.changeValue.bind(this)
        this.changeExtend = this.changeExtend.bind(this)
        this.message = this.message.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.changeEmojiType = this.changeEmojiType.bind(this)
        this.clearExtendAndEmoji = this.clearExtendAndEmoji.bind(this)
        this.triggerIsPreviewing = this.triggerIsPreviewing.bind(this)
        this.changeShouldCompassImage = this.changeShouldCompassImage.bind(this)
    }

    private customTextArea: CustomTextArea

    onChange = (value: string) => {
        this.setState({ value })
        this.props.update(value)
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
        this.props.update(newState.value)
        this.clearExtendAndEmoji()
    }

    triggerIsPreviewing() {
        this.setState(prevState => ({ isPreviewing: !prevState.isPreviewing }))
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

            let results = await utility.uploadFiles(files, shouldCompassImage)
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

    private changeShouldCompassImage(shouldCompassImage: boolean) {
        this.setState({
            shouldCompassImage
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

    componentWillUnmount() {
        window.removeEventListener('click', this.clearExtendAndEmoji)
    }

    componentWillReceiveProps(newProps: Props) {
        if(this.state.value !== newProps.value) this.setState({
            value: newProps.value
        })
    }

    render() {
        return (
            <div className="ubb-editor" style={{ height: `${this.props.option.height || 20}rem` }} >
                <Buttons 
                    changeValue={this.changeValue} 
                    changeExtendName={this.changeExtend} 
                    undo={this.customTextArea && this.customTextArea.undo}
                    redo={this.customTextArea && this.customTextArea.redo}
                    triggerIsPreviewing={this.triggerIsPreviewing}
                    isPreviewing={this.state.isPreviewing}
                />
                <Extends
                    extendTagName={this.state.extendTagName}
                    changeValue={this.changeValue}
                    clearShown={this.clearExtendAndEmoji}
                    extendIsShown={this.state.extendTagName && this.state.extendTagName !== 'emoji'}
                    shouldCompassImage={this.state.shouldCompassImage}
                    changeShouldCompassImage={this.changeShouldCompassImage}
                />
                {this.state.isPreviewing ? <div className="ubb-preview"><UbbContainer code={this.state.value} /></div> : <CustomTextArea 
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
                    onPaste={e => {
                        const kinds = Array.from(e.clipboardData.items).map(item => item.kind)
                        const files = e.clipboardData.files;
                        if(kinds.some(kind => kind === 'file')) {
                            e.preventDefault()
                            this.customTextArea.blur()
                            this.handleUpload(files, this.state.shouldCompassImage)
                        }
                    }}
                    onKeyDown={e => {
                        if(e.ctrlKey && e.key === 'Enter' && this.props.option && this.props.option.submit) {
                            this.props.option.submit()
                        }
                    }}
                />}
                <Message 
                    message={this.state.message} 
                />
                <input 
                    style={{ display: 'none' }} 
                    type="file" 
                    id="ubbFileUpload" 
                    multiple 
                    onChange={async e => {
                        let filelist = e.target.files
                        await this.handleUpload(filelist, this.state.shouldCompassImage)
                        e.target.value = ''
                    }}
                />
                <Emoji 
                    changeValue={this.changeValue}
                    emojiType={this.state.emojiType} 
                    changeEmojiType={this.changeEmojiType}
                    emojiIsShown={this.state.extendTagName === 'emoji'}
                    height={this.props.option && this.props.option.height && this.props.option.height - 2}
                />
            </div>
        )
    }
}
