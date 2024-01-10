import { FocusTopic } from "./FocusTopic";

/**
 * 表示推荐主题帖
 */
export class RecommendedTopic {
    /**
     * 主题帖信息
     */
    topic: FocusTopic;
    /**
     * 推荐语（一般为内容摘要）
     */
    content: string;
}