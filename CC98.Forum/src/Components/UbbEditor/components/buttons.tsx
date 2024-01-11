import * as React from 'react'
import { buttonConfig } from '../utility'
import * as ConfigType from '../IConfig'
import * as utility from '../utility'

interface Props {
    changeValue: (ubbSegment: ConfigType.IUbbSegment) => void
    changeExtendName: (extendName: string) => void
    undo?: () => void
    redo?: () => void
    triggerIsPreviewing: () => void
    isPreviewing: boolean
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
            <div className="ubb-buttons" onClick={e => e.stopPropagation()} >
                {buttonConfig.map(item => {
                    if(this.props.isPreviewing) return null
                    const { type, tagName, tagIcon, tagDescription, title } = item
                    switch(item.type) {
                        case 'text': return <button 
                            type="button" 
                            className={`fa ${tagIcon} ubb-button`} 
                            title={title}
                            key={tagName + tagIcon} 
                            onClick={() => this.props.changeValue({ type, tagName, mainProperty: item.mainValue })}
                        >{tagDescription}</button>
                        case 'fontSize': return <div key={tagName + tagIcon} className="ubb-button ubb-button-fontSize" >
                            <div className={`fa ${tagIcon} ubb-button-icon`}></div>
                            <select
                                value="0"
                                onChange={e => {
                                    this.props.changeValue({ type, tagName, mainProperty: e.target.value })
                                    e.target.value = '0'
                                }}
                            >{item.fontSize.map(item => <option key={item} value={item.toString()} disabled={item === 0}>{item}</option>)}</select>
                        </div>
                        case 'color': return <div className="ubb-button ubb-button-color" key={tagName + tagIcon} >
                            <div className={`fa ${tagIcon} ubb-button-icon`}></div>
                            <input id="color" />
                        </div>
                        case 'extend': return <button
                            type="button"
                            title={title}
                            key={tagName + tagIcon} 
                            className={`fa ${tagIcon} ubb-button`} 
                            onClick={() => this.props.changeExtendName(tagName)}
                        >{tagDescription}</button>
                        case 'upload': return <label
                            key={tagName + tagIcon} 
                            htmlFor="ubbFileUpload"
                            title={title}
                            className={`fa ${tagIcon} ubb-button ubb-button-icon`} 
                            style={{ pointerEvents: 'all' }}
                        ></label>
                        case 'emoji': return <button
                            type="button"
                            title={title}
                            key={tagName + tagIcon} 
                            className={`fa ${tagIcon} ubb-button`} 
                            onClick={() => this.props.changeExtendName(tagName)}
                        ></button>
                    }
                })}
                <div style={{ flexGrow: 1 }} ></div>
                {this.props.isPreviewing ? null : <><button className="fa fa-undo ubb-button" type="button" title="撤销" onClick={this.props.undo}></button>
                <button className="fa fa-repeat ubb-button" type="button" title="重做" onClick={this.props.redo}></button></>}
                <button className="fa fa-window-maximize ubb-button" type="button" title="切换预览" onClick={this.props.triggerIsPreviewing} ></button>
            </div>
        )
    }
}