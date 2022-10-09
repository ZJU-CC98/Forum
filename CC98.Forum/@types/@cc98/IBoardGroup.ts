declare module '@cc98/api' {
  export interface IBoardGroup {
    /**
     * 版面id
     */
    id: number
    /**
     * 主管
     */
    masters: string[]
    /**
     * 版面名称
     */
    name: string
    /**
     * 排序
     */
    order: number
    /**
     * 子版面
     */
    boards: IBoard[]
  }
}
