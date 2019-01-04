declare module '@cc98/api' {
  export interface ISite {
    /**
     * 全站公告
     */
    announcement: string
    /**
     * 全站管理员
     */
    anonymityAdmin: string[]
    /**
     * 是否开启生日提醒
     */
    birthdayActivityIsEnabled: boolean
    /**
     * 生日提醒奖励配置
     */
    birthdayActivitySetting: string
    /**
     * 是否维护中
     */
    isMaintaining: boolean
    /**
     *
     */
    lastBirthdayActivityDay: string
    /**
     * 最新注册用户
     */
    lastUserName: string
    /**
     * 最高在线人数
     */
    maxOnlineCount: number
    /**
     * 最高在线时间
     */
    maxOnlineDate: string
    /**
     * 最高单日发帖数
     */
    maxPostCount: number
    /**
     * 最高单日发帖时间
     */
    maxPostDate: string
    /**
     * 全站贴总数
     */
    postCount: number
    /**
     * 是否开启签到
     */
    signInEnabled: boolean
    /**
     * 签到奖励区间
     */
    signInRewards: string[]
    /**
     * 签到楼id
     */
    signInTopicId: number
    /**
     * 今日主题数
     */
    todayCount: number
    /**
     * 今日发帖数
     */
    topicCount: number
    /**
     * 用户总数
     */
    userCount: number
  }
}
