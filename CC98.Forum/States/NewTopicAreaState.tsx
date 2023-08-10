import { FocusTopic } from '../Props/FocusTopic';
import { UserInfo } from "./AppState";
/**
 * 表示查看新帖页面的State，这里充当数据源的容器
 */

export class NewTopicAreaState {
    data: FocusTopic[];
    from: number;
    buttonClassName: string;
    stop?: boolean;
    userInfo: UserInfo;
}