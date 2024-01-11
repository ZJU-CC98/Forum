declare module '@cc98/api' {
  export interface IRecommendationReading {
    /**
     * 标题
     */
    title: string
    /**
     * 内容
     */
    content: string
    /**
     * 帖子链接
     */
    url: string
    /**
     * 图标链接
     */
    imageUrl: string

    id: number

    type: number

    enable: boolean

    time: string

    expiredTime: string
  }
}
