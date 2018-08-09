export type UbbSegmentType = 'text' | 'extend' | 'fontSize' | 'color' | 'emoji' | 'upload'
export type emojiType = 'em' | 'ac' | 'mj' | 'tb' | 'hide'

export interface IUbbProperty {
    key: string
    value: string
}

export interface IUbbSegment {
    type: UbbSegmentType
    tagName: string
    content?: string
    mainProperty?: string
    subProperties?: IUbbProperty[]
}

interface PropertiesInfoConfig {
    /**
     * 留空表示是mainValue
     */
    key: string
    title: string
}

export interface IUbbSegmentConfig {
    type: UbbSegmentType
    tagName: string
    /**
     * 按钮使用的图标 fontawesome类名
     */
    tagIcon: string
    /**
     * 没有指定图标时显示的内容
     */
    tagDescription?: string
    /**
     * 鼠标悬浮显示的提示信息
     */
    title: string
    /**
     * 指定一个固定的mainValue
     */
    mainValue?: string
}

export interface IUbbTextSegmentConfig extends IUbbSegmentConfig {
    type: 'text'
}

export interface IUbbExtendSegmentConfig extends IUbbSegmentConfig {
    type: 'extend'
    /**
     * 额外输入的信息的提示
     */
    propertiesInfos?: PropertiesInfoConfig[]
    /**
     * 标签中插入内容的提示
     */
    contentValueInfo: string
    allowUpload: boolean
}

export interface IUbbTextSizeSegmentConfig extends IUbbSegmentConfig {
    type: 'fontSize'
    fontSize: number[]
}

export interface IUbbColorSegmentConfig extends IUbbSegmentConfig {
    type: 'color'
}

export interface IUbbUploadSegmentConfig extends IUbbSegmentConfig {
    type: 'upload'
}

export interface IUbbEmojiSegmentConfig extends IUbbSegmentConfig {
    type: 'emoji'

}

export interface IConfig {
    fileExtendedNames: {
        video: string[]
        audio: string[]
        image: string[]
    }
}

export interface IConfigInProps {
    height?: number;
    submit?: () => void;
}