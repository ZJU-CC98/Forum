declare module '@cc98/api' {
  export interface IBoardMasterTitle {
    /**
     * 用户id
     */
    userId: number
    /**
     * 用户名
     */
    userName: string
    /**
     * 版面id
     */
    boardId: number
    /**
     * 版面名
     */
    boardName: string
    /**
     * 头衔名
     */
    title: string
    /**
     * FIXME: 不知道有什么用
     */
    boardMasterLevel: number
  }
}
