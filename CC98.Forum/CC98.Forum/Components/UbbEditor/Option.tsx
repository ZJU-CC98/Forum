/**
 * UBB编辑器的选项
 */
export default class {
    /**
     * textarea的高度(以rem为单位)
     * 整个组件实际高度高2rem
     */
    height? = 32.5;
    /**
     * 打开的UBB标签
     */
    allowUbbTag?: 'all' | string[] = 'all'
    /**
     * 按下Ctrl+Enter调用的函数
     */
    submit?: Function;
    /**
     * 替换掉选中部分的ubb标签名数组
     */
    shouldReplaceSelection?: string[] = ['video', 'audio', 'img', 'upload'];
    /**
     * 选中部分为空时在tag中自动插入内容的ubb标签名数组
     */
    hasDefaultSelection?: string[] = ['url'];
    /**
     * 选中后不自动选中内容的ubb标签名数组，表情单独处理不在此列
     */
    shouldNotSelected?: string[] = ['img'];
    /**
     * 上传文件的最大限制(byte)，默认5mb
     */
    uploadFileMaxSize?: number = 5242880;
    /**
     * 支持的字号，确保第一项为0
     */
    textSize?: number[] =  [0, 1, 2, 3, 4, 5, 6, 7];
}
