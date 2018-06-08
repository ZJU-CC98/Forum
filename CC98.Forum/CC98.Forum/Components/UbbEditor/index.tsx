import * as React from 'react'
import { UbbContainer } from '../UbbContainer'
import * as Components from './components'
import * as type from './typedefinition'
import * as utility from './utility'

interface Props {
    value: string
    onChange: (newValue: string) => void
}

interface State {
    value: string
    selectionStart: number
    selectionEnd: number
    extendTagName: string
}

export class NewUbbEditor extends React.PureComponent<null, State> {
    constructor(props) {
        super(props)
        this.state = { 
            value: '',
            selectionStart: 0,
            selectionEnd: 0,
            extendTagName: ''
        }

        this.onChange = this.onChange.bind(this)
        this.changeValue = this.changeValue.bind(this)
        this.changeExtend = this.changeExtend.bind(this)
    }

    private customTextArea: Components.CustomTextArea

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

    private changeValue(ubbSegment: type.IUbbSegment): void {
        const newState = utility.getNewState(this.state, ubbSegment)
        this.setState(newState, this.selectTextArea)
    }

    private selectTextArea() {
        this.customTextArea.textarea.focus()
        this.customTextArea.textarea.setSelectionRange(this.state.selectionStart, this.state.selectionEnd)
    }

    componentDidMount() {
        // bind undo and redo for buttons
        this.forceUpdate()
    }

    render() {
        return (
            <div>
                <Components.Buttons 
                    changeValue={this.changeValue} 
                    changeExtendName={this.changeExtend} 
                    undo={this.customTextArea && this.customTextArea.undo}
                    redo={this.customTextArea && this.customTextArea.redo}
                />
                {this.state.extendTagName ? (
                    <Components.Extends
                        extendTagName={this.state.extendTagName}
                        changeValue={this.changeValue}
                    />
                ) : null}
                <Components.CustomTextArea 
                    value={this.state.value}
                    onChange={this.onChange}
                    ref={it => this.customTextArea = it} 
                    onBlur={e => {
                        const { selectionStart, selectionEnd } = e.target
                        this.setState({ selectionStart, selectionEnd })
                    }}
                />
            </div>
        )
    }
}
