declare module '@cc98/api' {
  export interface IBasicTopic {
    /**
     * 帖子id
     */
    id: number
    /**
     * 版面id
     */
    boardId: number
    /**
     * 是否内网可见
     */
    isInternalOnly: boolean
    /**
     * 是否投票贴
     */
    isVote: boolean
    /**
     * 帖子状态
     */
    status: number
    /**
     * 帖子类型
     */
    type: number
  }
}
