import Option from '../Components/UbbEditor/Option';

/**
 * UBB编辑器组件属性
 */
export default class {
    /**
     * value变动后调用函数，接受一个参数为变动后的value
     */
    update: (value: string) => void;
    /**
     * Ubb编辑器的内容
     */
    value: string;
    /**
     * 可选选项
     */
    option?: Option;
}