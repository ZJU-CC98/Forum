import * as React from 'react'
import * as utility from '../utility'
import * as type from '../IConfig'

// polyfill for formdata
require('formdata-polyfill')
declare var FormData
interface FormData {
    keys: () => Iterable<string>
    get: (key: string) => string
}

interface Props {
    extendTagName: string
    changeValue: (ubbSegment: type.IUbbSegment) => void
    clearShown: () => void
    extendIsShown: boolean
}

interface State {
    extendConfig: type.IUbbExtendSegmentConfig
}

export class Extends extends React.PureComponent<Props, State> {
    private form: HTMLFormElement

    constructor(props: Props) {
        super(props)
        this.state = {
            extendConfig: utility.buttonConfig.filter(item => item.tagName === props.extendTagName)[0] as type.IUbbExtendSegmentConfig
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.extendTagName) this.setState({
            extendConfig: utility.buttonConfig.filter(item => item.tagName === newProps.extendTagName)[0] as type.IUbbExtendSegmentConfig
        })
    }

    private changeValue(formData: FormData) {
        const keys = formData.keys()
        let subProperties: type.IUbbProperty[] = []
        for(let key in keys) {
            if(key !== 'content' && key !== 'mainValue') subProperties.push({ key, value: formData.get(key) })
        }
        this.props.changeValue({
            tagName: this.props.extendTagName,
            content: formData.get('content'),
            type: 'extend',
            mainProperty: formData.get('mainValue'),
            subProperties
        })
        this.form.reset()
    }

    render() {
        return (
            <div className="ubb-extend" onClick={e => e.stopPropagation()} style={{ height: this.props.extendIsShown ? '2rem' : '0rem' }} >
                {this.state.extendConfig ? <form ref={it => this.form = it} onSubmit={e => {
                    e.preventDefault()
                    this.changeValue(new FormData(e.target as HTMLFormElement))
                }} >
                    <input className="ubb-extend-main" type="text" defaultValue="" name="content" placeholder={this.state.extendConfig.contentValueInfo} />
                    {this.state.extendConfig.propertiesInfos ? this.state.extendConfig.propertiesInfos.map((item, index) => <><span>|</span><input 
                        type="text" 
                        defaultValue=""
                        name={item.key || 'mainValue'}
                        placeholder={item.title}
                        key={item.key + index}
                        className="ubb-extend-sub"
                    /></>) : null }
                    {this.state.extendConfig.allowUpload ? <label style={{ pointerEvents: 'all' }} className="fa fa-upload ubb-button-icon" htmlFor="ubbFileUpload" /> : null}
                    <button className="fa fa-check" type="submit" />
                    <button className="fa fa-remove" type="reset" onClick={this.props.clearShown} />
                </form> : null}
            </div>
        )
    }
}