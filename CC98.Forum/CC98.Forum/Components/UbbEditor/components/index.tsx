import * as React from 'react'
import * as utility from '../utility'
import * as ConfigType from '../IConfig'

// components
import { CustomTextArea } from './customtextarea'
import { Buttons } from './buttons'
import { Extends } from './extends'
import { Message } from './message'

interface Props {
    value: string
    onChange: (newValue: string) => void
}

interface State {
    value: string
    selectionStart: number
    selectionEnd: number
    extendTagName: string
    message: string
}

export class NewUbbEditor extends React.PureComponent<null, State> {
    constructor(props) {
        super(props)
        this.state = { 
            value: '',
            selectionStart: 0,
            selectionEnd: 0,
            extendTagName: '',
            message: ''
        }

        this.onChange = this.onChange.bind(this)
        this.changeValue = this.changeValue.bind(this)
        this.changeExtend = this.changeExtend.bind(this)
        this.message = this.message.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    private customTextArea: CustomTextArea

    onChange = (value: string) => {
        this.setState({ value })
    }

    private changeExtend(extendTagName: string) {
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
    }

    private selectTextArea() {
        this.customTextArea.textarea.focus()
        this.customTextArea.textarea.setSelectionRange(this.state.selectionStart, this.state.selectionEnd)
    }

    private async handleUpload(a: FileList, shouldCompassImage?: boolean) {
        let files = Array.from(a)
        try {
            if(this.state.extendTagName !== 'img' && 
                files.some(item => (
                    item.type.indexOf('image') === -1) &&   // 不是图片文件
                    item.size > 10485760                    // 并且大小超过限制
                )) {
                throw new Error('文件过大')
            }

            let results = await utility.uploadFiles(a, shouldCompassImage)
            results.map((item, index) => this.changeValue({
                type: 'extend',
                tagName: utility.getTagName(files[index]),
                content: item
            }))
        } catch(e) {
            this.message(e.message)
        }
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

    render() {
        return (
            <div>
                <Buttons 
                    changeValue={this.changeValue} 
                    changeExtendName={this.changeExtend} 
                    undo={this.customTextArea && this.customTextArea.undo}
                    redo={this.customTextArea && this.customTextArea.redo}
                />
                {this.state.extendTagName ? (
                    <Extends
                        extendTagName={this.state.extendTagName}
                        changeValue={this.changeValue}
                    />
                ) : null}
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
                <Message message={this.state.message} />
                <input style={{ display: 'none' }} type="file" id="ubbFileUpload" multiple />
            </div>
        )
    }
}
