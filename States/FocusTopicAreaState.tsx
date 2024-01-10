import { FocusTopic } from '../Props/FocusTopic';
/**
 * 表示我关注的版面列表区域的State，这里充当数据源的容器
 */
export class FocusTopicAreaState {
    data: FocusTopic[];
    from: number;
    //buttonClassName: string;
    stop?: boolean;
}