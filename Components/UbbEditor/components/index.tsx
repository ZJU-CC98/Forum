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

// storage for default emoji
import { setLocalStorage, getLocalStorage, searchUsersByName } from '../../../Utility'

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

    /** @ 自动补全面板是否展开 */
    atActive: boolean
    /** 当前 @ 后的关键词 */
    atQuery: string
    /** 用户候选列表 */
    atSuggestions: any[]
    /** 键盘高亮的候选下标 */
    atIndex: number
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
            atActive: false,
            atQuery: '',
            atSuggestions: [],
            atIndex: 0,
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
    /** @ 候选搜索的防抖定时器 */
    private atTimer: any = null
    /** textarea 失焦延迟收起面板的定时器 */
    private atBlurTimer: any = null

    onChange = (value: string) => {
        console.log("进入onchange")
        this.setState({ value })
        this.props.update(value)
        this.detectAtQuery(value)
    }

    /**
     * 检测光标之前的 @关键词，命中时弹出用户候选。
     * 触发与插入逻辑与小程序版「自动@」一致；插入文本与 Utility.atHanderler 的解析格式相同。
     */
    detectAtQuery = (value: string) => {
        const textarea = this.customTextArea && this.customTextArea.textarea
        if (!textarea) return
        const caret = textarea.selectionStart
        const before = value.slice(0, caret)
        const match = /@([^@\s\[\]]{0,20})$/.exec(before)
        if (!match || match[1].length === 0) {
            this.closeAtPanel()
            return
        }
        const keyword = match[1]
        this.setState({ atActive: true, atQuery: keyword, atIndex: 0, atSuggestions: [] })
        if (this.atTimer) clearTimeout(this.atTimer)
        this.atTimer = setTimeout(() => this.fetchAtSuggestions(keyword), 300)
    }

    fetchAtSuggestions = async (keyword: string) => {
        try {
            const res = await searchUsersByName(keyword, 0, 10)
            const list = Array.isArray(res && res.data) ? res.data : []
            //仅当面板仍展开且关键词未变时才展示结果
            if (this.state.atActive && this.state.atQuery === keyword) {
                this.setState({ atSuggestions: list })
            }
        } catch (e) {
            if (this.state.atActive && this.state.atQuery === keyword) {
                this.setState({ atSuggestions: [] })
            }
        }
    }

    /** 选中候选用户：把光标前的「@关键词」整体替换为 UBB 用户链接 */
    pickAtUser = (user: any) => {
        if (!user) return
        this.clearAtTimers()
        const textarea = this.customTextArea && this.customTextArea.textarea
        const value = this.state.value
        const caret = textarea ? textarea.selectionStart : value.length
        const before = value.slice(0, caret)
        const match = /@([^@\s\[\]]{0,20})$/.exec(before)
        if (!match) {
            this.closeAtPanel()
            return
        }
        const ubb = `[url="/user/name/${user.name}"]@${user.name} [/url]`
        const newValue = value.slice(0, caret - match[0].length) + ubb + value.slice(caret)
        const newCaret = caret - match[0].length + ubb.length
        this.closeAtPanel()
        this.setState({ value: newValue, selectionStart: newCaret, selectionEnd: newCaret }, this.selectTextArea)
        this.props.update(newValue)
    }

    closeAtPanel = () => {
        if (this.state.atActive) {
            this.setState({ atActive: false, atQuery: '', atSuggestions: [], atIndex: 0 })
        }
    }

    clearAtTimers = () => {
        if (this.atTimer) {
            clearTimeout(this.atTimer)
            this.atTimer = null
        }
        if (this.atBlurTimer) {
            clearTimeout(this.atBlurTimer)
            this.atBlurTimer = null
        }
    }

    private changeExtend(extendTagName: string) {
        // 首次点击表情按钮
        if (extendTagName === 'emoji' && this.state.emojiType === 'hide') {
            let defaultEmojiType: ConfigType.emojiType = 'CC98';
            if (getLocalStorage('defaultEmojiType')) {
                defaultEmojiType = getLocalStorage('defaultEmojiType')
            };
            this.setState({
                emojiType: defaultEmojiType,
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
        console.log("进入changevvalue")
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
            if (this.state.extendTagName !== 'img' &&
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
        } catch (e) {
            this.message(e.message)
        }
    }

    private changeEmojiType(em: ConfigType.emojiType) {
        this.setState({
            emojiType: em
        })
        setLocalStorage('defaultEmojiType', em, 2592000)
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
        this.clearAtTimers()
    }

    componentWillReceiveProps(newProps: Props) {
        if (this.state.value !== newProps.value) this.setState({
            value: newProps.value,
            selectionStart: newProps.value.length,
            selectionEnd: newProps.value.length,
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
                        //延迟收起 @ 面板，避免点选候选时先触发 blur 把面板提前收掉
                        if (this.atBlurTimer) clearTimeout(this.atBlurTimer)
                        this.atBlurTimer = setTimeout(() => this.closeAtPanel(), 200)
                    }}
                    onDrop={e => {
                        let files = e.dataTransfer.files
                        if (files) this.handleUpload(files)
                    }}
                    onPaste={e => {
                        if (!e.clipboardData || !e.clipboardData.items) return;
                        const kinds = Array.from(e.clipboardData.items).map(item => item.kind)
                        const files = e.clipboardData.files;
                        if (kinds.some(kind => kind === 'file')) {
                            e.preventDefault()
                            this.customTextArea.blur()
                            this.handleUpload(files, this.state.shouldCompassImage)
                        }
                    }}
                    onKeyDown={e => {
                        //面板展开时优先响应候选键位
                        if (this.state.atActive && this.state.atSuggestions.length > 0) {
                            if (e.key === 'ArrowDown') {
                                e.preventDefault()
                                this.setState({ atIndex: (this.state.atIndex + 1) % this.state.atSuggestions.length })
                                return
                            }
                            if (e.key === 'ArrowUp') {
                                e.preventDefault()
                                this.setState({ atIndex: (this.state.atIndex - 1 + this.state.atSuggestions.length) % this.state.atSuggestions.length })
                                return
                            }
                            if (e.key === 'Enter' || e.key === 'Tab') {
                                e.preventDefault()
                                this.pickAtUser(this.state.atSuggestions[this.state.atIndex])
                                return
                            }
                            if (e.key === 'Escape') {
                                e.preventDefault()
                                this.closeAtPanel()
                                return
                            }
                        }
                        if (e.ctrlKey && e.key === 'Enter' && this.props.option && this.props.option.submit) {
                            this.props.option.submit()
                        }
                    }}
                />}
                {this.state.atActive && this.state.atSuggestions.length > 0 && (
                    <div className="ubb-at-drop" onMouseDown={e => e.preventDefault()}>
                        {this.state.atSuggestions.map((u, i) => (
                            <div
                                key={u.id}
                                className={'ubb-at-item' + (i === this.state.atIndex ? ' ubb-at-item-active' : '')}
                                onMouseDown={() => this.pickAtUser(u)}
                            >
                                <img className="ubb-at-avatar" src={u.portraitUrl} alt="" />
                                <span className="ubb-at-name">{u.name}</span>
                                <span className="ubb-at-level">{u.levelTitle}</span>
                            </div>
                        ))}
                    </div>
                )}
                <Message
                    message={this.state.message}
                />
                <input
                    style={{ display: 'none' }}
                    type="file"
                    id="ubbFileUpload"
                    multiple
                    onChange={async e => {
                        const input = e.target
                        let filelist = e.target.files
                        await this.handleUpload(filelist, this.state.shouldCompassImage)
                        input.value = ''
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
