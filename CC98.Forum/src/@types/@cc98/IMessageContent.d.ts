declare module '@cc98/api' {
  export interface IMessageContent {
    id: number
    /**
     * 发送方 ID
     */
    senderId: number
    /**
     * 接收方 ID
     */
    receiverId: number
    /**
     * 发信时间
     */
    time: string
    /**
     * 是否已读
     */
    isRead: boolean
    /**
     * 发信内容
     */
    content: string
  }
}
