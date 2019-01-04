declare module '@cc98/api' {
  export interface IConfig {
    /**
     * 学术贴
     */
    academics: IBasicTopic[]
    /**
     * 公告
     */
    announcement: string
    /**
     * 感性
     */
    emotion: IBasicTopic[]
    /**
     * 交易
     */
    fleaMarket: IBasicTopic[]
    /**
     * 十大
     */
    hotTopic: IBasicTopic[]
    lastUpdateTime: string
    lastUpdateUser: string
    /**
     * 在线用户数
     */
    onlineUserCount: number
    /**
     * 兼职
     */
    partTimeJob: IBasicTopic[]
    /**
     * 总帖数
     */
    postCount: number
    /**
     * 推荐功能
     */
    recommendationFunction: Array
    /**
     * 推荐阅读
     */
    recommendationReading: IRecommendationReading[]
    /**
     * 校园活动
     */
    schoolEvent: IBasicTopic[]
    /**
     * 校园新闻
     */
    schoolNews: IBasicTopic[]
    /**
     * 学习天地
     */
    study: IBasicTopic[]
    /**
     * 今日贴数
     */
    todayCount: number
    /**
     * 总主题
     */
    topicCount: number
    /**
     * 总用户
     */
    userCount: number
  }
}
