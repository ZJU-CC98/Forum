declare module '@cc98/api' {
  export interface IRecentMessage {
    /**
     * 用户 ID
     */
    userId: number
    /**
     * 发信时间
     */
    time: string
    /**
     * 是否已读
     */
    isRead: boolean
    /**
     * 最后一条消息
     */
    lastContent: string
  }
}
