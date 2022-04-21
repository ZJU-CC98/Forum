declare module '@cc98/api' {
  type NONE = 0
  type LIKE = 1
  type DISLIKE = 2

  export type ILikeState = NONE | LIKE | DISLIKE

  export interface ILike {
    /**
     * 踩数量
     */
    dislikeCount: number
    /**
     * 赞数量
     */
    likeCount: number
    /**
     * 赞/踩状态
     */
    likeState: ILikeState
  }
}
