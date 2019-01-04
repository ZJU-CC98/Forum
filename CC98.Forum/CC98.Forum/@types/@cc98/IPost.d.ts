declare module '@cc98/api' {
  export interface IPost {
    allowedViewers: any

    awardInfo: any
    /**
     * 风评
     */
    awards: IAward[]
    /**
     * 帖子内容
     */
    content: string
    /**
     * 内容类型
     * UBB 0
     * markdown 1
     */
    contentType: 0 | 1
    /**
     * 楼层数
     */
    floor: number
    /**
     * post ID
     */
    id: number
    /**
     * IP
     */
    ip: string

    isAllowedOnly: boolean
    /**
     * 是否匿名
     */
    isAnonymous: boolean

    isBest: boolean
    /**
     * 是否被删除
     */
    isDeleted: boolean
    /**
     * 是否是楼主（LZ）
     */
    isLZ: boolean
    /**
     * 最后更新作者
     */
    lastUpdateAuthor: any
    /**
     * 最后更新时间
     */
    lastUpdateTime: any
    /**
     * 赞数量
     */
    likeCount: number
    /**
     * 踩数量
     */
    dislikeCount: number
    /**
     * 赞/踩状态
     */
    likeState: ILikeState
    /**
     * 总楼层数
     */
    length: number

    parentId: number

    state: number
    /**
     * 回复时间
     */
    time: string
    /**
     * 帖子标题
     */
    title: string
    /**
     * 帖子的 ID
     */
    topicId: number
    /**
     * 版面 ID
     */
    boardId: number
    /**
     * 用户 ID
     */
    userId: number
    /**
     * 用户名
     */
    userName: string
  }
}
