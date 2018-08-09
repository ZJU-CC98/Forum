import * as ConfigType from './IConfig'
import * as Utility from '../../Utility'
export const buttonConfig = require('./buttonConfig.json') as (
    ConfigType.IUbbTextSegmentConfig | 
    ConfigType.IUbbExtendSegmentConfig |
    ConfigType.IUbbTextSizeSegmentConfig |
    ConfigType.IUbbColorSegmentConfig |
    ConfigType.IUbbUploadSegmentConfig |
    ConfigType.IUbbEmojiSegmentConfig
)[]

export const config = require('./config.json') as ConfigType.IConfig

interface UbbEditorStateInfo {
    value: string
    selectionStart: number
    selectionEnd: number
}

export function getNewState(state: UbbEditorStateInfo, ubbSegment: ConfigType.IUbbSegment): UbbEditorStateInfo {
    let { value, selectionStart, selectionEnd } = state
    const { tagName, mainProperty, subProperties, content } = ubbSegment
    let newValue = value.slice(0, selectionStart)
    const valueLeft = value.slice(selectionEnd, value.length)
    const select = value.slice(selectionStart, selectionEnd)

    // 生成插入的内容
    let insertCode = `[${tagName}`
    if(ubbSegment.type === 'emoji') { // 对表情的特殊处理
        insertCode += `${mainProperty}]`
    } else {
        if(mainProperty) insertCode += `=${mainProperty}`
        if(subProperties) { } // TODO
        if(content) {
            insertCode += `]${content}[/${tagName}]`
        } else {
            insertCode += `]${select}[/${tagName}]`
        }
    }

    if(config.shouldNotSelect.indexOf(tagName) !== -1) {
        insertCode += '\n'
        selectionStart = selectionStart + insertCode.length
        selectionEnd = selectionStart
    } else {
        selectionEnd = selectionStart + insertCode.length
    }

    newValue += insertCode
    newValue += valueLeft

    return {
        value: newValue,
        selectionStart,
        selectionEnd
    }
}

export function createColorPicker(handler: (color) => void) {
    ($("#color") as any).spectrum({
        //默认颜色
        color: "#000",
        change: (color) => {
            //点击后调用处理函数
            handler(color);
            //重置颜色
            ($("#color") as any).spectrum('set', '#000000')
        },
        //显示选项
        showPalette: true,
        //选项中的颜色
        palette: [
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"],
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"]
        ],
        //替换掉默认的类名，便于写css
        replacerClassName: 'ubb-color-picker',
        //点击后隐藏
        hideAfterPaletteSelect: true
    })
}

export async function uploadFiles(files: File[], shouldCompassImage?: boolean) {
    if(!files.length) throw new Error('未找到文件，请尝试点击按钮上传')
    const url = !shouldCompassImage ? '/file?compressImage=false' : '/file';
    const myHeaders = await Utility.formAuthorizeHeader()
    let formdata = new FormData()
    formdata.append('contentType', "multipart/form-data")
    files.map(item => formdata.append('files', item, item.name))
    let res = await Utility.cc98Fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: formdata
    })
    let data: string[] = await res.json();
    if (res.ok) {
        return data
    } else {
        throw new Error('上传失败')
    }
}

export function getTagName(file: File) {
    try {
        switch(true) {
            case file.type.indexOf('image') !== -1: return 'img'
            case file.type.indexOf('video') !== -1: return 'video'
            case file.type.indexOf('video') !== -1: return 'audio'
        }

        const fileExtendName = file.name.match(/\.(\w+)$/)[1]

        switch(true) {
            case config.fileExtendedNames.audio.indexOf(fileExtendName) !== -1: return 'audio'
            case config.fileExtendedNames.video.indexOf(fileExtendName) !== -1: return 'video'
            case config.fileExtendedNames.image.indexOf(fileExtendName) !== -1: return 'img'
            default: throw new Error
        }
    } catch(e) {
        return 'upload'
    }
}