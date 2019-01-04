declare module '@cc98/api' {
  export interface IBoard {
    /**
     * 版面id
     */
    id: number
    /**
     * 版面名称
     */
    name: string
    /**
     * 版面名称
     */
    description: string
    /**
     * 发帖总数
     */
    topicCount: number
    /**
     * 回复总数
     */
    postCount: number
    /**
     * 今日回复总数
     */
    todayCount: number
    /**
     * 版主
     */
    boardMasters: string[]
    /**
     * 是否关注
     */
    isUserCustomBoard?: boolean
    /**
     * 是否仅内网可见
     */
    internalState: number
    /**
     * 是否已锁定
     */
    isLock: boolean
    /**
     * 父版面id
     */
    parentId: number
    /**
     * 是否匿名
     */
    anonymousState: number
    /**
     * 是否能进入
     */
    canEntry: boolean
    /**
     * 是否能投票
     */
    canVote: boolean
  }
}
