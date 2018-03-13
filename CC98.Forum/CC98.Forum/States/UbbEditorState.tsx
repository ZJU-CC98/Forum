/**
 * UBB编辑器组件状态
 */
export default class {
    /**
    * 用户所选文字的起始位置
    */
    selectionStart: number;
    /**
    * 用户所选文字的终止位置
    */
    selectionEnd: number;
    /**
    * 用户是否是通过点击按钮离开textarea
    */
    clicked: boolean;
    /**
    * 需要额外信息的tag
    */
    extendTagName: string;
    /**
    * 额外信息的内容
    */
    extendValue: string;
    /**
     * 是否显示表情栏
     */
    emojiIsShown: boolean;
    /**
     * 表情类型
     */
    emojiType: 'em' | 'ac' | 'mj' | 'tb';
    /**
     * 是否在预览状态
     */
    isPreviewing: boolean;
    /**
     * Ubb编辑器的内容
     */
    value: string;    
    /**
     * UBB编辑器的提示信息
     */
    info: string;
    /**
     * 滚动条位置
     */
    scrollTop: number;
    /**
     * 是否压缩图片
     */
    shouldCompassImage: boolean;
}
