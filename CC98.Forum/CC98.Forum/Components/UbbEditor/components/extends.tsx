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
}

export class Extends extends React.PureComponent<Props> {
    private extendConfig: type.IUbbExtendSegmentConfig
    private form: HTMLFormElement

    constructor(props: Props) {
        super(props)
        this.initConfig(props)
    }

    componentWillReceiveProps(newProps) {
        this.initConfig(newProps)
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

    private initConfig(props: Props) {
        try {
            this.extendConfig = utility.buttonConfig.filter(item => item.tagName === props.extendTagName)[0] as type.IUbbExtendSegmentConfig
        } catch(e) {

        }
    }

    render() {
        if(this.extendConfig) {
            return (
                <div>
                    <form ref={it => this.form = it} onSubmit={e => {
                        e.preventDefault()
                        this.changeValue(new FormData(e.target as HTMLFormElement))
                    }} >
                        <input type="text" defaultValue="" name="content" placeholder={this.extendConfig.contentValueInfo} />
                        {this.extendConfig.propertiesInfos ? this.extendConfig.propertiesInfos.map((item, index) => <input 
                            type="text" 
                            defaultValue=""
                            name={item.key || 'mainValue'}
                            placeholder={item.title}
                            key={item.key + index}
                        />) : null }
                        <button className="fa fa-check" type="submit" />
                        <button className="fa fa-remove" type="reset" onClick={this.props.clearShown} />
                    </form>
                </div>
            )
        }
    }
}