import * as React from 'react'

// @ts-ignore override interface type
interface Props extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    onChange: (value: string) => void
    value: string
}

export class CustomTextArea extends React.PureComponent<Props> {
    constructor(props) {
        super(props)
        this.undo = this.undo.bind(this)
        this.redo = this.redo.bind(this)
        this.blur = this.blur.bind(this)
        this.changeValue = this.changeValue.bind(this)
    }
    private scrollTop: number
    textarea: HTMLTextAreaElement
    private valueStack: string[] = ['']
    private redoStack: string[] = []

    undo() {
        if (this.valueStack.length === 1) {
            return 
        }
        let prevValue = this.valueStack.pop()
        this.redoStack.push(prevValue)
        prevValue = this.valueStack[this.valueStack.length - 1]
        this.props.onChange(prevValue)
    }

    redo() {
        let prevValue = this.redoStack.pop()
        if (prevValue) {
            this.valueStack.push(prevValue)
            this.props.onChange(prevValue)
        }
    }

    blur() {
        this.textarea.blur()
    }

    changeValue(value: string) {
        this.props.onChange(value)
        this.valueStack.push(value)
        this.textarea.scrollTop = this.scrollTop
    }

    componentWillReceiveProps(newProps: Props) {
        if(newProps.value !== this.valueStack[this.valueStack.length - 1]) {
            this.valueStack.push(newProps.value)
            this.redoStack = []
        }
    }

    render() {
        return (
            <textarea 
                ref={it => this.textarea = it}
                {...this.props}
                onChange={e => this.changeValue(e.target.value)}
                onScroll={e => this.scrollTop = this.textarea.scrollTop}
                onFocus={e => this.textarea.scrollTop = this.scrollTop}
                onInput={() => this.redoStack = []}
                onKeyDown={e => {
                    if(this.props.onKeyDown) this.props.onKeyDown(e)
                    if(e.key === 'z' && e.ctrlKey) this.undo()
                    if(e.key === 'y' && e.ctrlKey) this.redo()
                }}
            />
        )
    }
}