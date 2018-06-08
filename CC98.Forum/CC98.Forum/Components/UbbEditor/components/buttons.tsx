import * as React from 'react'
import { config } from '../utility'
import * as type from '../typedefinition'
import * as utility from '../utility'

interface Props {
    changeValue: (ubbSegment: type.IUbbSegment) => void
    changeExtendName: (extendName: string) => void
    undo?: () => void
    redo?: () => void
}

export class Buttons extends React.PureComponent<Props> {
    componentDidMount() {
        utility.createColorPicker(color => this.props.changeValue({
            type: 'color',
            tagName: 'color',
            mainProperty: color.toHexString()
        }))
    }

    render() {
        return (
            <div>
                {config.map(item => {
                    const { type, tagName, tagIcon, tagDescription } = item
                    switch(item.type) {
                        case 'text': return <button 
                            type="button" 
                            className={`fa ${tagIcon}`} 
                            key={tagName + tagIcon} 
                            onClick={() => this.props.changeValue({ type, tagName, mainProperty: item.mainValue })}
                        >{tagDescription}</button>
                        case 'fontSize': return <div key={tagName + tagIcon} >
                            <div className={`fa ${tagIcon}`}></div>
                            <select
                                value="0"
                                onChange={e => {
                                    this.props.changeValue({ type, tagName, mainProperty: e.target.value })
                                    e.target.value = '0'
                                }}
                            >{item.fontSize.map(item => <option key={item} value={item.toString()} disabled={item === 0}>{item}</option>)}</select>
                        </div>
                        case 'color': return <div key={tagName + tagIcon} >
                            <div className={`fa ${tagIcon}`}></div>
                            <input id="color" />
                        </div>
                        case 'extend': return <button
                                type="button"
                                key={tagName + tagIcon} 
                                className={`fa ${tagIcon}`} 
                                onClick={() => this.props.changeExtendName(tagName)}
                        >{tagDescription}</button>
                    }
                })}
            </div>
        )
    }
}