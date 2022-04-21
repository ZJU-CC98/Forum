declare module '@cc98/api' {
  export interface ITopic {
    /**
     * 帖子 ID
     */
    id: number
    /**
     * 版面 ID
     */
    boardId: number
    /**
     * 标题
     */
    title: string
    /**
     * 发布时间
     * 格式: 2018-10-10T01:43:26.11+08:00
     */
    time: string
    /**
     * 发布者 ID
     */
    userId: number
    /**
     * 发布者用户名
     */
    userName: string
    /**
     * 是否匿名
     */
    isAnonymous: boolean
    /**
     * 不上十大
     */
    disableHot: boolean
    /**
     * 最后回复时间
     */
    lastPostTime: string

    state: number

    type: number
    /**
     * 回复数
     */
    replyCount: number
    /**
     * 点击数
     */
    hitCount: number

    totalVoteUserCount: number
    /**
     * 最后回复用户用户名
     */
    lastPostUser: string
    /**
     * 最后回复内容
     */
    lastPostContent: string
    topState: number
    bestState: number
    /**
     * 是否是投票
     */
    isVote: false

    isPosterOnly: false

    allowedViewerState: number
    /**
     * 赞同数
     */
    likeCount: number
    /**
     * 反对数量
     */
    dislikeCount: number

    highlightInfo: any

    tag1: number

    tag2: number

    isInternalOnly: boolean
  }
}
