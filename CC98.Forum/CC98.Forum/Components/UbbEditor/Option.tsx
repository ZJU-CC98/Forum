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
    submit?: () => void;
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
    shouldNotSelected?: string[] = ['img', 'video', 'audio', 'upload'];
    /**
     * 上传文件的最大限制(byte)，默认10mb
     */
    uploadFileMaxSize?: number = 10485760;
    /**
     * 支持的字号，确保第一项为0
     */
    textSize?: number[] =  [0, 1, 2, 3, 4, 5, 6, 7];
    /**
     * 插入文本后是否换行
     */
    shouldEnter?: string[] = ['img', 'video', 'audio', 'upload'];
    /**
     * 所处理的视频后缀
     */
    videoExtendNames?: string[] = [];
    /**
     * 所处理的音频后缀
     */
    audioExtendNames?: string[] = ['wav', 'mp3', 'aac', 'ogg', 'm4a'];
    /**
     * 所处理的图片后缀
     */
    imageExtendNames?: string[] = [];
}
